#!/usr/bin/env python3
"""
AURÉLIA — Installation Shopify complète, autonome.

Ce script fait *TOUT* ce qui est faisable via l'Admin API :
  1. Upload + publication du thème
  2. Import des 5 produits (4 masques + 1 bundle)
  3. Création de la collection "La Gamme"
  4. Création des 14 pages (avec template_suffix pour brancher le thème)
  5. Création du blog "Journal" + publication des 13 articles SEO
  6. Création des 2 codes promo (WELCOME10, RITUEL15)
  7. Rapport final avec toutes les URLs

Le script télécharge automatiquement le thème, le CSV produits et le
markdown blog depuis le repo GitHub si ces fichiers ne sont pas locaux.

USAGE
-----

    pip install requests
    export SHOPIFY_STORE=3aff1g-y4
    export SHOPIFY_TOKEN=atkn_xxxxxxx
    python install_shopify.py

PowerShell Windows :
    $env:SHOPIFY_STORE="3aff1g-y4"
    $env:SHOPIFY_TOKEN="atkn_xxx"
    python install_shopify.py

Options :
    --skip-theme       N'upload pas le thème (s'il est déjà uploadé)
    --skip-products    N'importe pas les produits
    --skip-pages       Ne crée pas les pages
    --skip-blog        Ne crée pas le blog ni les articles
    --skip-discounts   Ne crée pas les codes promo
    --dry-run          Affiche ce qui serait fait sans rien créer
"""

import argparse
import base64
import csv
import io
import os
import re
import sys
import time
import zipfile
from pathlib import Path

try:
    import requests
except ImportError:
    print("[X] Le module 'requests' n'est pas installé.")
    print("    Lance d'abord : pip install requests")
    sys.exit(1)


# ─────────────────────────────────────────────────────────────────────────────
# CONFIGURATION
# ─────────────────────────────────────────────────────────────────────────────

STORE = os.environ.get("SHOPIFY_STORE", "").strip().replace(".myshopify.com", "")
TOKEN = os.environ.get("SHOPIFY_TOKEN", "").strip()
API_VERSION = "2024-10"

REPO_RAW = "https://raw.githubusercontent.com/martinbouvet2000-tech/Citation/main"
REPO_ZIP_URL = f"{REPO_RAW}/aurelia-theme.zip"
REPO_CSV_URL = f"{REPO_RAW}/shopify-theme/products.csv"
REPO_BLOG_URL = f"{REPO_RAW}/shopify-theme/BLOG-CONTENT.md"

SCRIPT_DIR = Path(__file__).parent.resolve()
TEMP_DIR = SCRIPT_DIR / "_aurelia_temp"
TEMP_DIR.mkdir(exist_ok=True)


# ─────────────────────────────────────────────────────────────────────────────
# Couleurs / logs
# ─────────────────────────────────────────────────────────────────────────────

class C:
    R = "\033[0m"
    B = "\033[1m"
    G = "\033[32m"
    Y = "\033[33m"
    RED = "\033[31m"
    CYAN = "\033[36m"
    GREY = "\033[90m"


def step(label):
    print(f"\n{C.B}{C.CYAN}▶ {label}{C.R}")


def ok(msg):
    print(f"   {C.G}✓{C.R} {msg}")


def warn(msg):
    print(f"   {C.Y}⚠{C.R} {msg}")


def fail(msg, response=None):
    print(f"   {C.RED}✗{C.R} {msg}")
    if response is not None:
        try:
            body = response.json()
            print(f"     {C.GREY}HTTP {response.status_code} : {body}{C.R}")
        except Exception:
            print(f"     {C.GREY}HTTP {response.status_code} : {response.text[:300]}{C.R}")


# ─────────────────────────────────────────────────────────────────────────────
# API helpers
# ─────────────────────────────────────────────────────────────────────────────

BASE = None
HEADERS = None


def init_api():
    global BASE, HEADERS
    if not STORE or not TOKEN:
        print(f"{C.RED}[X] Variables manquantes.{C.R}")
        print("    Définis SHOPIFY_STORE (ex: 3aff1g-y4) et SHOPIFY_TOKEN.")
        sys.exit(1)
    BASE = f"https://{STORE}.myshopify.com/admin/api/{API_VERSION}"
    HEADERS = {"X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json"}


def api(method, path, payload=None, retries=4, raw=False):
    """Appel API avec retry exponentiel sur 429 et 5xx."""
    url = f"{BASE}/{path.lstrip('/')}"
    last = None
    for attempt in range(retries):
        try:
            r = requests.request(method, url, headers=HEADERS,
                                 json=payload, timeout=60)
        except requests.exceptions.RequestException as e:
            if attempt == retries - 1:
                raise
            time.sleep(2 ** attempt)
            continue
        last = r
        if r.status_code == 429 or 500 <= r.status_code < 600:
            wait = 2 ** attempt
            warn(f"Code {r.status_code}, retry dans {wait}s...")
            time.sleep(wait)
            continue
        # Throttle natif Shopify (très simple)
        time.sleep(0.5)
        return r
    return last


def existing(resource_path, key):
    """Liste toutes les ressources existantes par leur 'key' (handle, code…)."""
    items = []
    page_info = None
    while True:
        url = f"{BASE}/{resource_path}?limit=250"
        if page_info:
            url += f"&page_info={page_info}"
        r = requests.get(url, headers=HEADERS, timeout=60)
        if r.status_code != 200:
            return {}
        data = r.json()
        for arr in data.values():
            if isinstance(arr, list):
                items.extend(arr)
                break
        link = r.headers.get("Link", "")
        m = re.search(r'<[^>]*page_info=([^>&]+)[^>]*>;\s*rel="next"', link)
        if not m:
            break
        page_info = m.group(1)
    return {it.get(key): it for it in items if it.get(key)}


# ─────────────────────────────────────────────────────────────────────────────
# Téléchargement assets
# ─────────────────────────────────────────────────────────────────────────────

def download_to(url, dest):
    print(f"   ⬇ {url}")
    r = requests.get(url, timeout=120)
    if r.status_code != 200:
        raise RuntimeError(f"Téléchargement échoué ({r.status_code}) : {url}")
    dest.write_bytes(r.content)
    return dest


def ensure_assets():
    step("Récupération des artefacts (thème, CSV, blog)")

    theme_zip = SCRIPT_DIR / "aurelia-theme.zip"
    if not theme_zip.exists():
        theme_zip = TEMP_DIR / "aurelia-theme.zip"
        if not theme_zip.exists():
            download_to(REPO_ZIP_URL, theme_zip)

    csv_file = SCRIPT_DIR / "products.csv"
    for candidate in [SCRIPT_DIR / "products.csv",
                      SCRIPT_DIR / "shopify-theme" / "products.csv"]:
        if candidate.exists():
            csv_file = candidate
            break
    else:
        csv_file = TEMP_DIR / "products.csv"
        if not csv_file.exists():
            download_to(REPO_CSV_URL, csv_file)

    blog_file = TEMP_DIR / "BLOG-CONTENT.md"
    for candidate in [SCRIPT_DIR / "BLOG-CONTENT.md",
                      SCRIPT_DIR / "shopify-theme" / "BLOG-CONTENT.md"]:
        if candidate.exists():
            blog_file = candidate
            break
    else:
        if not blog_file.exists():
            download_to(REPO_BLOG_URL, blog_file)

    ok(f"Thème : {theme_zip}")
    ok(f"CSV produits : {csv_file}")
    ok(f"Blog markdown : {blog_file}")
    return theme_zip, csv_file, blog_file


# ─────────────────────────────────────────────────────────────────────────────
# 0. Test connexion
# ─────────────────────────────────────────────────────────────────────────────

def test_connection():
    step("Test connexion Shopify")
    r = api("GET", "shop.json")
    if r is None or r.status_code != 200:
        fail("Connexion impossible", r)
        return None
    shop = r.json()["shop"]
    ok(f"Boutique : {C.B}{shop['name']}{C.R} ({shop['myshopify_domain']})")
    ok(f"Plan : {shop.get('plan_name', 'inconnu')}")
    ok(f"Devise : {shop.get('currency', 'inconnu')}")
    return shop


# ─────────────────────────────────────────────────────────────────────────────
# 1. Upload thème
# ─────────────────────────────────────────────────────────────────────────────

BINARY_EXT = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".woff",
              ".woff2", ".ttf", ".otf", ".pdf", ".mp4", ".webm"}


def upload_theme(theme_zip):
    step("Upload du thème Shopify")

    # Vérifier si un thème "Aurélia v5" existe déjà
    existing_themes = api("GET", "themes.json").json().get("themes", [])
    aur_themes = [t for t in existing_themes if "Aurélia" in t.get("name", "")
                  or "Aurelia" in t.get("name", "")]
    theme_id = None
    if aur_themes:
        theme_id = aur_themes[0]["id"]
        warn(f"Thème '{aur_themes[0]['name']}' existe déjà (id {theme_id}) — assets seront mis à jour")
    else:
        r = api("POST", "themes.json",
                {"theme": {"name": "Aurélia v5", "role": "unpublished"}})
        if r.status_code not in (200, 201):
            fail("Création du thème", r)
            return None
        theme_id = r.json()["theme"]["id"]
        ok(f"Thème créé (id {theme_id})")

    # Upload des assets
    with zipfile.ZipFile(theme_zip, "r") as zf:
        names = [n for n in zf.namelist() if not n.endswith("/")]
        total = len(names)
        uploaded = 0
        failed = 0
        for i, name in enumerate(names, 1):
            ext = Path(name).suffix.lower()
            data = zf.read(name)
            if ext in BINARY_EXT:
                payload = {"asset": {"key": name,
                                     "attachment": base64.b64encode(data).decode()}}
            else:
                try:
                    payload = {"asset": {"key": name, "value": data.decode("utf-8")}}
                except UnicodeDecodeError:
                    payload = {"asset": {"key": name,
                                         "attachment": base64.b64encode(data).decode()}}
            r = api("PUT", f"themes/{theme_id}/assets.json", payload)
            if r.status_code in (200, 201):
                uploaded += 1
                if i % 10 == 0 or i == total:
                    print(f"   {C.GREY}{i}/{total} assets uploadés{C.R}")
            else:
                failed += 1
                fail(f"Upload {name}", r)

    ok(f"{uploaded}/{total} assets uploadés ({failed} échecs)")

    # Publier le thème
    r = api("PUT", f"themes/{theme_id}.json",
            {"theme": {"id": theme_id, "role": "main"}})
    if r.status_code == 200:
        ok("Thème publié comme thème principal")
    else:
        fail("Publication du thème", r)

    return theme_id


# ─────────────────────────────────────────────────────────────────────────────
# 2. Import produits
# ─────────────────────────────────────────────────────────────────────────────

BUNDLE_PRODUCT = {
    "title": "Le Rituel Complet — Bundle 4 dispositifs Aurélia",
    "handle": "le-rituel-complet",
    "body_html": """<p><strong>Le rituel intégral, du contour des yeux au décolleté.</strong> Quatre dispositifs Aurélia rassemblés en un seul kit, pour une routine de luminothérapie complète, sérieuse, sur la durée.</p>
<h3>Ce qui est inclus</h3>
<ul>
  <li><strong>AURÉLIA Signature</strong> — masque visage best-seller, 3 longueurs d'onde + cryo regard</li>
  <li><strong>AURÉLIA Lumière Pro</strong> — anti-âge intensif, 7 longueurs d'onde</li>
  <li><strong>AURÉLIA Regard</strong> — soin contour des yeux, cernes & poches</li>
  <li><strong>AURÉLIA Décolleté</strong> — soin cou & décolleté</li>
</ul>
<h3>Avantages du bundle</h3>
<ul>
  <li><strong>92 € d'économie</strong> par rapport à l'achat séparé</li>
  <li>Livraison express offerte</li>
  <li>Housse de rangement en lin ivoire</li>
  <li>Accès à 2 sessions diagnostic visio avec un dermato partenaire</li>
</ul>
<p><small><em>Garantie 2 ans sur tous les dispositifs. CE médical classe IIa.</em></small></p>""",
    "vendor": "Aurélia",
    "product_type": "Bundle luminothérapie",
    "tags": "bundle, gamme, rituel, premium",
    "status": "active",
    "variants": [{
        "price": "515.00",
        "compare_at_price": "607.00",
        "sku": "AUR-BDL-001",
        "weight": 2100,
        "weight_unit": "g",
        "inventory_management": "shopify",
        "inventory_policy": "deny",
        "requires_shipping": True,
        "taxable": True,
    }],
}


def import_products_from_csv(csv_path):
    step("Import des produits")
    existing_products = existing("products.json", "handle")

    products = []
    with open(csv_path, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            products.append(row)

    created = 0
    skipped = 0
    for row in products:
        handle = row["Handle"]
        if handle in existing_products:
            warn(f"{handle} existe déjà (skip)")
            skipped += 1
            continue
        payload = {"product": {
            "title": row["Title"],
            "handle": handle,
            "body_html": row["Body (HTML)"],
            "vendor": row.get("Vendor", "Aurélia"),
            "product_type": row.get("Type", ""),
            "tags": row.get("Tags", ""),
            "status": "active",
            "variants": [{
                "option1": row.get("Option1 Value", "Default"),
                "price": row.get("Variant Price", "0.00"),
                "compare_at_price": row.get("Variant Compare At Price") or None,
                "sku": row.get("Variant SKU", ""),
                "weight": int(row.get("Variant Grams") or 0),
                "weight_unit": "g",
                "inventory_management": "shopify",
                "inventory_policy": "deny",
                "requires_shipping": True,
                "taxable": True,
            }],
            "options": [{"name": row.get("Option1 Name", "Coloris")}],
        }}
        if row.get("SEO Title"):
            payload["product"]["metafields_global_title_tag"] = row["SEO Title"]
        if row.get("SEO Description"):
            payload["product"]["metafields_global_description_tag"] = row["SEO Description"]

        r = api("POST", "products.json", payload)
        if r.status_code in (200, 201):
            ok(f"{handle}")
            created += 1
            # Stock initial
            product = r.json()["product"]
            for variant in product["variants"]:
                inv_id = variant["inventory_item_id"]
                qty = int(row.get("Variant Inventory Qty") or 50)
                set_inventory(inv_id, qty)
        else:
            fail(handle, r)

    # Bundle
    if "le-rituel-complet" not in existing_products:
        r = api("POST", "products.json", {"product": BUNDLE_PRODUCT})
        if r.status_code in (200, 201):
            ok("le-rituel-complet (bundle)")
            created += 1
            for variant in r.json()["product"]["variants"]:
                set_inventory(variant["inventory_item_id"], 20)
        else:
            fail("le-rituel-complet", r)
    else:
        warn("le-rituel-complet existe déjà (skip)")

    print(f"   → {created} créés, {skipped} déjà présents")


def set_inventory(inventory_item_id, qty):
    """Active l'inventaire dans la première location de la boutique."""
    locations = api("GET", "locations.json").json().get("locations", [])
    if not locations:
        return
    location_id = locations[0]["id"]
    # Activer pour cette location
    api("POST", "inventory_levels/connect.json",
        {"location_id": location_id, "inventory_item_id": inventory_item_id})
    # Set quantity
    api("POST", "inventory_levels/set.json",
        {"location_id": location_id, "inventory_item_id": inventory_item_id,
         "available": qty})


# ─────────────────────────────────────────────────────────────────────────────
# 3. Collection
# ─────────────────────────────────────────────────────────────────────────────

GAMME_HANDLES = ["aurelia-signature", "aurelia-lumiere-pro",
                 "aurelia-regard", "aurelia-decollete"]


def create_collection():
    step("Création de la collection 'La Gamme'")

    existing_cols = existing("custom_collections.json", "handle")
    if "la-gamme" in existing_cols:
        collection_id = existing_cols["la-gamme"]["id"]
        warn(f"Collection 'la-gamme' existe déjà (id {collection_id})")
    else:
        r = api("POST", "custom_collections.json", {"custom_collection": {
            "title": "La Gamme",
            "handle": "la-gamme",
            "body_html": "Quatre dispositifs pour un rituel complet, du contour des yeux au décolleté.",
            "published": True,
            "sort_order": "manual",
        }})
        if r.status_code not in (200, 201):
            fail("Création collection", r)
            return
        collection_id = r.json()["custom_collection"]["id"]
        ok(f"Collection créée (id {collection_id})")

    # Attacher les 4 produits
    products_by_handle = existing("products.json", "handle")
    attached = 0
    for handle in GAMME_HANDLES:
        if handle not in products_by_handle:
            warn(f"Produit {handle} introuvable — non attaché")
            continue
        prod_id = products_by_handle[handle]["id"]
        r = api("POST", "collects.json",
                {"collect": {"product_id": prod_id, "collection_id": collection_id}})
        if r.status_code in (200, 201):
            ok(f"{handle} attaché")
            attached += 1
        elif r.status_code == 422 and "already" in r.text.lower():
            warn(f"{handle} déjà attaché")
        else:
            fail(f"Attache {handle}", r)
    print(f"   → {attached} produits attachés à La Gamme")


# ─────────────────────────────────────────────────────────────────────────────
# 4. Pages
# ─────────────────────────────────────────────────────────────────────────────

PAGES = [
    ("À propos", "a-propos", "a-propos"),
    ("Conditions générales de vente", "cgv", "cgv"),
    ("Mentions légales", "mentions-legales", "mentions-legales"),
    ("Livraison & retours", "livraison-retours", "livraison-retours"),
    ("Politique de confidentialité", "confidentialite", "confidentialite"),
    ("FAQ", "faq", "faq"),
    ("Guide d'utilisation", "guide-utilisation", "guide-utilisation"),
    ("Le Cercle Aurélia — Programme fidélité", "programme-fidelite", "programme-fidelite"),
    ("Devenir ambassadrice", "devenir-ambassadrice", "devenir-ambassadrice"),
    ("Le Rituel Complet", "le-rituel-complet", "le-rituel-complet"),
    ("Trouvez votre Aurélia", "diagnostic", "diagnostic"),
    ("Mes favoris", "favoris", "favoris"),
    ("Pour les professionnels", "professionnels", "professionnels"),
    ("Lexique skincare", "lexique", "lexique"),
]


def create_pages():
    step(f"Création des {len(PAGES)} pages")
    existing_pages = existing("pages.json", "handle")
    created = 0
    skipped = 0
    for title, handle, suffix in PAGES:
        if handle in existing_pages:
            warn(f"{handle} existe déjà")
            skipped += 1
            continue
        payload = {"page": {
            "title": title,
            "handle": handle,
            "body_html": "",
            "template_suffix": suffix,
            "published": True,
        }}
        r = api("POST", "pages.json", payload)
        if r.status_code in (200, 201):
            ok(f"{handle}")
            created += 1
        else:
            fail(handle, r)
    print(f"   → {created} créées, {skipped} déjà présentes")


# ─────────────────────────────────────────────────────────────────────────────
# 5. Blog + articles
# ─────────────────────────────────────────────────────────────────────────────

def parse_blog_content(text):
    articles = []
    # Découpe par "## Article N" (avec ou sans titre derrière)
    parts = re.split(r'^## Article \d+\s*(?:[—-]\s*(.+?))?$', text, flags=re.MULTILINE)
    # parts[0] = preamble, puis alternance (titre_inline, body)
    for i in range(1, len(parts), 2):
        inline_title = (parts[i] or "").strip()
        body = parts[i + 1] if i + 1 < len(parts) else ""

        # Le titre se trouve soit après le ## (inline_title) soit dans **Titre (SEO)**
        title_m = re.search(r'\*\*Titre[^*]*\*\*\s*:\s*(.+)', body)
        title = title_m.group(1).strip() if title_m else inline_title

        handle_m = re.search(r'\*\*Handle\*\*\s*:\s*`?([a-z0-9-]+)`?', body)
        meta_m = re.search(r'\*\*Méta description\*\*\s*:\s*(.+)', body)
        tags_m = re.search(r'\*\*Tags\*\*\s*:\s*(.+)', body)
        html_m = re.search(r'```html\s*\n(.+?)\n```', body, re.DOTALL)

        if not handle_m or not html_m or not title:
            continue
        articles.append({
            "title": title,
            "handle": handle_m.group(1),
            "meta": meta_m.group(1).strip() if meta_m else "",
            "tags": tags_m.group(1).strip() if tags_m else "",
            "html": html_m.group(1).strip(),
        })
    return articles


def create_blog_and_articles(blog_file):
    step("Création du blog 'Journal' + articles")

    blogs = api("GET", "blogs.json").json().get("blogs", [])
    blog_id = next((b["id"] for b in blogs if b["handle"] == "journal"), None)
    if blog_id:
        warn(f"Blog 'journal' existe déjà (id {blog_id})")
    else:
        r = api("POST", "blogs.json",
                {"blog": {"title": "Journal", "handle": "journal"}})
        if r.status_code not in (200, 201):
            fail("Création du blog", r)
            return
        blog_id = r.json()["blog"]["id"]
        ok(f"Blog 'journal' créé (id {blog_id})")

    text = Path(blog_file).read_text(encoding="utf-8")
    articles = parse_blog_content(text)
    print(f"   → {len(articles)} articles parsés depuis BLOG-CONTENT.md")

    existing_arts = api("GET", f"blogs/{blog_id}/articles.json?limit=250").json().get("articles", [])
    existing_handles = {a["handle"] for a in existing_arts}

    created = 0
    skipped = 0
    for art in articles:
        if art["handle"] in existing_handles:
            warn(f"{art['handle']} existe déjà")
            skipped += 1
            continue
        payload = {"article": {
            "title": art["title"],
            "handle": art["handle"],
            "body_html": art["html"],
            "tags": art["tags"],
            "summary_html": art["meta"],
            "published": True,
            "author": "Aurélia Marchand",
        }}
        r = api("POST", f"blogs/{blog_id}/articles.json", payload)
        if r.status_code in (200, 201):
            ok(f"{art['handle']}")
            created += 1
        else:
            fail(art["handle"], r)
    print(f"   → {created} publiés, {skipped} déjà présents")


# ─────────────────────────────────────────────────────────────────────────────
# 6. Codes promo
# ─────────────────────────────────────────────────────────────────────────────

def create_price_rule(title, code, value, target_selection="all",
                      entitled_product_ids=None):
    # Vérifier si existe déjà
    rules = api("GET", "price_rules.json?limit=250").json().get("price_rules", [])
    for rule in rules:
        codes = api("GET", f"price_rules/{rule['id']}/discount_codes.json").json().get("discount_codes", [])
        if any(c["code"] == code for c in codes):
            warn(f"Code {code} existe déjà")
            return rule["id"]

    payload = {"price_rule": {
        "title": title,
        "target_type": "line_item",
        "target_selection": target_selection,
        "allocation_method": "across",
        "value_type": "percentage",
        "value": str(value),
        "customer_selection": "all",
        "starts_at": "2024-01-01T00:00:00Z",
    }}
    if entitled_product_ids:
        payload["price_rule"]["entitled_product_ids"] = entitled_product_ids

    r = api("POST", "price_rules.json", payload)
    if r.status_code not in (200, 201):
        fail(f"Règle {code}", r)
        return None
    rule_id = r.json()["price_rule"]["id"]
    r2 = api("POST", f"price_rules/{rule_id}/discount_codes.json",
             {"discount_code": {"code": code}})
    if r2.status_code in (200, 201):
        ok(f"Code {code} créé ({value}%)")
    else:
        fail(f"Code {code}", r2)
    return rule_id


def create_discount_codes():
    step("Création des codes promo")
    create_price_rule("WELCOME10 — Bienvenue Aurélia", "WELCOME10", "-10.0")

    products_by_handle = existing("products.json", "handle")
    bundle = products_by_handle.get("le-rituel-complet")
    if bundle:
        create_price_rule("RITUEL15 — Bundle", "RITUEL15", "-15.0",
                          target_selection="entitled",
                          entitled_product_ids=[bundle["id"]])
    else:
        warn("Bundle le-rituel-complet introuvable — RITUEL15 ignoré")


# ─────────────────────────────────────────────────────────────────────────────
# Rapport final
# ─────────────────────────────────────────────────────────────────────────────

def print_report():
    print()
    print(f"{C.B}{C.G}╔══════════════════════════════════════════════════════════╗{C.R}")
    print(f"{C.B}{C.G}║  🌟  AURÉLIA — Installation terminée                     ║{C.R}")
    print(f"{C.B}{C.G}╚══════════════════════════════════════════════════════════╝{C.R}")

    storefront = f"https://{STORE}.myshopify.com"
    admin = f"https://admin.shopify.com/store/{STORE}"

    print(f"\n{C.B}🌐 Front public{C.R}    : {storefront}")
    print(f"{C.B}🛠  Admin{C.R}           : {admin}")
    print(f"\n{C.B}🛍 Produits{C.R}        : {admin}/products")
    print(f"{C.B}📦 Collection{C.R}      : {storefront}/collections/la-gamme")
    print(f"{C.B}📰 Blog Journal{C.R}    : {storefront}/blogs/journal")

    print(f"\n{C.B}📄 Pages publiées{C.R}")
    for _, handle, _ in PAGES:
        print(f"   {storefront}/pages/{handle}")

    print(f"\n{C.B}🎟  Codes promo{C.R}    : WELCOME10 (-10% tout) · RITUEL15 (-15% bundle)")

    print(f"\n{C.Y}{C.B}⚠ Actions manuelles restantes (non automatisables via API){C.R}\n")
    print(f"  1. {C.B}Paiements{C.R} — activer Shopify Payments + PayPal")
    print(f"     {admin}/settings/payments")
    print(f"  2. {C.B}Livraison{C.R} — créer zones France (gratuit ≥150€, sinon 4.90€)")
    print(f"     {admin}/settings/shipping")
    print(f"  3. {C.B}Emails transactionnels{C.R} — coller les 5 templates Liquid")
    print(f"     {admin}/settings/email_settings")
    print(f"  4. {C.B}Photos produit{C.R} — générer via Nano Banana 2 (16 prompts dans PHOTO-PROMPTS.md)")
    print(f"     {admin}/products")
    print(f"  5. {C.B}Retirer mot de passe boutique{C.R} (mise en ligne publique)")
    print(f"     {admin}/online_store/preferences")
    print(f"  6. {C.B}Politiques boutique{C.R} — pointer vers les pages CGV/RGPD/livraison créées")
    print(f"     {admin}/settings/policies")

    print(f"\n{C.RED}{C.B}🔐 SÉCURITÉ{C.R}")
    print(f"   Pense à révoquer le token API quand tu as fini :")
    print(f"   https://dev.shopify.com/dashboard → Aurelia Setup → Paramètres → Faire pivoter\n")


# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="AURÉLIA — Install Shopify")
    parser.add_argument("--skip-theme", action="store_true")
    parser.add_argument("--skip-products", action="store_true")
    parser.add_argument("--skip-collection", action="store_true")
    parser.add_argument("--skip-pages", action="store_true")
    parser.add_argument("--skip-blog", action="store_true")
    parser.add_argument("--skip-discounts", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    print(f"{C.B}{C.CYAN}")
    print("╔══════════════════════════════════════════════════════════╗")
    print("║  AURÉLIA Paris — Installation automatique Shopify        ║")
    print("╚══════════════════════════════════════════════════════════╝")
    print(f"{C.R}")
    print(f"Boutique cible : {STORE}.myshopify.com")
    print(f"API version    : {API_VERSION}")

    init_api()
    if args.dry_run:
        print(f"\n{C.Y}[DRY RUN] Aucune action ne sera exécutée{C.R}")
        return

    shop = test_connection()
    if not shop:
        print(f"\n{C.RED}Vérifie SHOPIFY_TOKEN et SHOPIFY_STORE.{C.R}")
        sys.exit(1)

    theme_zip, csv_file, blog_file = ensure_assets()

    if not args.skip_theme:
        upload_theme(theme_zip)
    if not args.skip_products:
        import_products_from_csv(csv_file)
    if not args.skip_collection:
        create_collection()
    if not args.skip_pages:
        create_pages()
    if not args.skip_blog:
        create_blog_and_articles(blog_file)
    if not args.skip_discounts:
        create_discount_codes()

    print_report()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print(f"\n{C.Y}⏹ Interrompu par l'utilisateur{C.R}")
        sys.exit(130)
    except Exception as e:
        print(f"\n{C.RED}✗ Erreur inattendue : {e}{C.R}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
