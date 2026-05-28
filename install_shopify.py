#!/usr/bin/env python3
"""
AURÉLIA — Installation automatique Shopify

Ce script crée :
- Les 14 pages de la boutique (avec template_suffix)
- Le blog "Journal" + 13 articles SEO (parsés depuis BLOG-CONTENT.md)
- Les 2 codes promo : WELCOME10 et RITUEL15

Pré-requis manuels (avant ce script) :
1. Uploader aurelia-theme.zip via Boutique en ligne → Thèmes → Ajouter un thème
2. Publier le thème (Action → Publier)
3. Importer products.csv via Produits → Importer
4. (Optionnel) Créer la collection "La Gamme" et y rattacher les 4 produits

Usage :
    pip install requests
    export SHOPIFY_STORE=3aff1g-y4
    export SHOPIFY_TOKEN=atkn_xxxxxxx
    python install_shopify.py

Ou en une ligne (Windows PowerShell) :
    $env:SHOPIFY_STORE="3aff1g-y4"; $env:SHOPIFY_TOKEN="atkn_xxx"; python install_shopify.py
"""

import os
import re
import sys
import time
import json
from pathlib import Path

try:
    import requests
except ImportError:
    print("❌ Le module 'requests' n'est pas installé. Lance : pip install requests")
    sys.exit(1)

# ─────────────────────────────────────────────────────────────
# Config
# ─────────────────────────────────────────────────────────────
STORE = os.environ.get("SHOPIFY_STORE", "").strip()
TOKEN = os.environ.get("SHOPIFY_TOKEN", "").strip()
API_VERSION = "2024-10"

if not STORE or not TOKEN:
    print("❌ Variables manquantes. Définis SHOPIFY_STORE et SHOPIFY_TOKEN.")
    print("   Exemple : export SHOPIFY_STORE=3aff1g-y4")
    print("             export SHOPIFY_TOKEN=atkn_xxx")
    sys.exit(1)

BASE = f"https://{STORE}.myshopify.com/admin/api/{API_VERSION}"
HEADERS = {"X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json"}

# Chemin vers BLOG-CONTENT.md (à côté du script ou dans shopify-theme/)
SCRIPT_DIR = Path(__file__).parent.resolve()
BLOG_FILE = None
for candidate in [
    SCRIPT_DIR / "shopify-theme" / "BLOG-CONTENT.md",
    SCRIPT_DIR / "BLOG-CONTENT.md",
    SCRIPT_DIR.parent / "shopify-theme" / "BLOG-CONTENT.md",
]:
    if candidate.exists():
        BLOG_FILE = candidate
        break

if not BLOG_FILE:
    print("⚠️  BLOG-CONTENT.md introuvable — les articles ne seront pas créés.")
    print("    Place ce script à côté du dossier shopify-theme/")


# ─────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────
def api(method, path, payload=None, retries=3):
    """Appel API avec retry sur 429 (rate limit)."""
    url = f"{BASE}/{path.lstrip('/')}"
    for attempt in range(retries):
        r = requests.request(method, url, headers=HEADERS, json=payload, timeout=30)
        if r.status_code == 429:
            wait = 2 ** attempt
            print(f"   ⏳ Rate limit, attente {wait}s...")
            time.sleep(wait)
            continue
        return r
    return r


def ok(label):
    print(f"   ✓ {label}")


def warn(label):
    print(f"   ⚠ {label}")


def fail(label, response=None):
    print(f"   ✗ {label}")
    if response is not None:
        try:
            print(f"     → {response.status_code} : {response.json()}")
        except Exception:
            print(f"     → {response.status_code} : {response.text[:200]}")


# ─────────────────────────────────────────────────────────────
# 0. Test connexion
# ─────────────────────────────────────────────────────────────
def test_connection():
    print("\n🔌 Test connexion Shopify...")
    r = api("GET", "shop.json")
    if r.status_code == 200:
        shop = r.json()["shop"]
        ok(f"Connecté à : {shop['name']} ({shop['myshopify_domain']})")
        return True
    fail("Connexion échouée", r)
    return False


# ─────────────────────────────────────────────────────────────
# 1. Pages (14)
# ─────────────────────────────────────────────────────────────
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
    print(f"\n📄 Création des {len(PAGES)} pages...")
    created = 0
    for title, handle, suffix in PAGES:
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
        elif r.status_code == 422 and "already" in r.text.lower():
            warn(f"{handle} (existe déjà)")
        else:
            fail(handle, r)
        time.sleep(0.4)
    print(f"   → {created}/{len(PAGES)} pages créées")


# ─────────────────────────────────────────────────────────────
# 2. Blog "Journal" + 13 articles
# ─────────────────────────────────────────────────────────────
def parse_blog_content(text):
    """Extrait les articles du fichier BLOG-CONTENT.md."""
    articles = []
    # Découpe par "## Article N — Titre"
    parts = re.split(r'^## Article \d+\s*[—-]\s*(.+?)$', text, flags=re.MULTILINE)
    # parts[0] = preamble, puis alternance titre/contenu
    for i in range(1, len(parts), 2):
        title = parts[i].strip()
        body = parts[i + 1] if i + 1 < len(parts) else ""

        handle_m = re.search(r'\*\*Handle\*\*\s*:\s*`?([a-z0-9-]+)`?', body)
        meta_m = re.search(r'\*\*Méta description\*\*\s*:\s*(.+)', body)
        tags_m = re.search(r'\*\*Tags\*\*\s*:\s*(.+)', body)
        html_m = re.search(r'```html\s*\n(.+?)\n```', body, re.DOTALL)

        if not handle_m or not html_m:
            continue

        articles.append({
            "title": title,
            "handle": handle_m.group(1),
            "meta": meta_m.group(1).strip() if meta_m else "",
            "tags": tags_m.group(1).strip() if tags_m else "",
            "html": html_m.group(1).strip(),
        })
    return articles


def create_blog_and_articles():
    print("\n📰 Création du blog 'Journal' + articles...")

    # Vérifier si blog existe déjà
    r = api("GET", "blogs.json")
    blog_id = None
    if r.status_code == 200:
        for b in r.json().get("blogs", []):
            if b["handle"] == "journal":
                blog_id = b["id"]
                warn(f"Blog 'journal' existe déjà (id {blog_id})")
                break

    if not blog_id:
        r = api("POST", "blogs.json", {"blog": {"title": "Journal", "handle": "journal"}})
        if r.status_code in (200, 201):
            blog_id = r.json()["blog"]["id"]
            ok(f"Blog 'journal' créé (id {blog_id})")
        else:
            fail("Création du blog", r)
            return

    if not BLOG_FILE:
        warn("BLOG-CONTENT.md introuvable, articles non créés")
        return

    text = BLOG_FILE.read_text(encoding="utf-8")
    articles = parse_blog_content(text)
    print(f"   → {len(articles)} articles parsés depuis BLOG-CONTENT.md")

    created = 0
    for art in articles:
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
        elif r.status_code == 422 and "already" in r.text.lower():
            warn(f"{art['handle']} (existe déjà)")
        else:
            fail(art["handle"], r)
        time.sleep(0.4)
    print(f"   → {created}/{len(articles)} articles publiés")


# ─────────────────────────────────────────────────────────────
# 3. Codes promo
# ─────────────────────────────────────────────────────────────
def create_price_rule(title, code, value, target_selection="all", entitled_product_ids=None):
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
    r2 = api("POST", f"price_rules/{rule_id}/discount_codes.json", {"discount_code": {"code": code}})
    if r2.status_code in (200, 201):
        ok(f"Code {code} créé (-{abs(int(float(value)))}%)")
    else:
        fail(f"Code {code}", r2)
    return rule_id


def create_discount_codes():
    print("\n🎟  Création des codes promo...")

    # WELCOME10 — tous produits
    create_price_rule("WELCOME10 — Bienvenue Aurélia", "WELCOME10", "-10.0")

    # RITUEL15 — bundle uniquement
    r = api("GET", "products.json?handle=le-rituel-complet")
    if r.status_code == 200 and r.json().get("products"):
        bundle_id = r.json()["products"][0]["id"]
        create_price_rule("RITUEL15 — Bundle", "RITUEL15", "-15.0",
                          target_selection="entitled", entitled_product_ids=[bundle_id])
    else:
        warn("Bundle 'le-rituel-complet' introuvable — code RITUEL15 ignoré")
        warn("Importe d'abord products.csv via Admin → Produits → Importer")


# ─────────────────────────────────────────────────────────────
# 4. Rapport final
# ─────────────────────────────────────────────────────────────
def print_report():
    print("\n" + "═" * 60)
    print("📊 RAPPORT")
    print("═" * 60)
    print(f"\n🌐 Boutique : https://{STORE}.myshopify.com")
    print(f"🛠  Admin    : https://admin.shopify.com/store/{STORE}")

    print("\n📄 Pages créées :")
    for title, handle, _ in PAGES:
        print(f"   https://{STORE}.myshopify.com/pages/{handle}")

    print("\n📰 Blog : https://{}.myshopify.com/blogs/journal".format(STORE))

    print("\n📋 Actions manuelles restantes :")
    print("   1. Upload thème : Boutique en ligne → Thèmes → Ajouter (zip)")
    print("   2. Import produits : Produits → Importer → products.csv")
    print("   3. Créer collection 'La Gamme' (handle: la-gamme)")
    print("   4. Coller 5 emails : Paramètres → Notifications")
    print("   5. Configurer paiements + livraison")
    print("   6. Générer photos produit (PHOTO-PROMPTS.md)")

    print("\n🔐 SÉCURITÉ : pense à révoquer le token quand tu as fini.")
    print("   Dev Dashboard → Aurelia Setup → Paramètres → Faire pivoter\n")


# ─────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("╔" + "═" * 58 + "╗")
    print("║  AURÉLIA — Installation automatique Shopify              ║")
    print("╚" + "═" * 58 + "╝")
    print(f"\nBoutique cible : {STORE}.myshopify.com")
    print(f"API version    : {API_VERSION}")

    if not test_connection():
        print("\n❌ Vérifie que SHOPIFY_TOKEN et SHOPIFY_STORE sont corrects.")
        sys.exit(1)

    create_pages()
    create_blog_and_articles()
    create_discount_codes()
    print_report()
