# Runbook de déploiement Shopify

Procédure pas à pas pour déployer la boutique AURÉLIA depuis le repo.
Comprend deux versions : **automatique** (avec token Admin API) et
**manuelle** (clics dans l'admin).

## Pré-requis

- Boutique Shopify créée (`3aff1g-y4.myshopify.com` ou ton store)
- Accès admin (login propriétaire)
- Repo cloné en local : `git clone https://github.com/martinbouvet2000-tech/Citation.git`
- Branche : `git checkout claude/cryoglow-ecommerce-shop-mFjYb`

## Phase A — Récupérer le token Admin API

1. Admin Shopify → **Paramètres** (engrenage en bas à gauche)
2. **Applications et canaux de vente**
3. **Développer des applications** (en haut à droite)
   - Si bouton invisible : cliquer d'abord **Autoriser le développement
     d'applications personnalisées** (confirmer 2 fois)
4. **Créer une application** → Nom : `Aurelia Setup` → créer
5. Onglet **Configuration** → "Champs d'application d'accès à l'API
   Admin" → **Configurer**
6. Cocher les 12 scopes (Ctrl+F) :
   - `read_themes`, `write_themes`
   - `read_products`, `write_products`
   - `read_content`, `write_content`
   - `read_price_rules`, `write_price_rules`
   - `read_discounts`, `write_discounts`
   - `read_files`, `write_files`
7. **Enregistrer**
8. En haut : **Installer l'application** → confirmer
9. Onglet **Identifiants d'API** → **Révéler le jeton une seule fois**
10. Copier `shpat_xxxxx...`

```bash
export SHOPIFY_TOKEN="shpat_xxxxx"
export SHOPIFY_STORE="3aff1g-y4"
export API_VERSION="2024-10"
```

## Phase B — Tester la connexion

```bash
curl -s "https://${SHOPIFY_STORE}.myshopify.com/admin/api/${API_VERSION}/shop.json" \
  -H "X-Shopify-Access-Token: ${SHOPIFY_TOKEN}" | jq .shop.name
# Doit afficher le nom de ta boutique. Si 401 → token invalide.
```

## Phase C — Upload du thème (auto)

```bash
# 1. Créer un thème "unpublished"
THEME_RESPONSE=$(curl -s -X POST \
  "https://${SHOPIFY_STORE}.myshopify.com/admin/api/${API_VERSION}/themes.json" \
  -H "X-Shopify-Access-Token: ${SHOPIFY_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"theme": {"name": "Aurélia v5", "role": "unpublished"}}')
THEME_ID=$(echo $THEME_RESPONSE | jq -r .theme.id)
echo "Thème créé : $THEME_ID"

# 2. Dézipper et uploader chaque asset
unzip -d /tmp/aurelia-theme aurelia-theme.zip

# Boucler sur tous les fichiers et faire PUT /assets.json
# (script Python plus pratique — voir ci-dessous)
```

### Script Python complet d'upload thème

```python
import os, base64, json, requests, glob, time

STORE = os.environ["SHOPIFY_STORE"]
TOKEN = os.environ["SHOPIFY_TOKEN"]
VERSION = os.environ.get("API_VERSION", "2024-10")
THEME_DIR = "/tmp/aurelia-theme"
BASE = f"https://{STORE}.myshopify.com/admin/api/{VERSION}"
HEAD = {"X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json"}

# Créer thème
r = requests.post(f"{BASE}/themes.json", headers=HEAD,
    json={"theme": {"name": "Aurélia v5", "role": "unpublished"}})
theme_id = r.json()["theme"]["id"]
print(f"Theme {theme_id} créé")

# Extensions binaires : encoder en base64 dans "attachment"
BINARY_EXT = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico"}

for path in glob.glob(f"{THEME_DIR}/**/*", recursive=True):
    if not os.path.isfile(path):
        continue
    key = os.path.relpath(path, THEME_DIR)
    ext = os.path.splitext(path)[1].lower()
    with open(path, "rb") as f:
        data = f.read()
    if ext in BINARY_EXT:
        asset = {"key": key, "attachment": base64.b64encode(data).decode()}
    else:
        asset = {"key": key, "value": data.decode("utf-8")}
    r = requests.put(f"{BASE}/themes/{theme_id}/assets.json",
        headers=HEAD, json={"asset": asset})
    if r.status_code == 429:
        time.sleep(2)
        r = requests.put(f"{BASE}/themes/{theme_id}/assets.json",
            headers=HEAD, json={"asset": asset})
    print(f"  {key}: {r.status_code}")
    time.sleep(0.3)  # rate limit prudent (Shopify : 2 req/s)

# Publier
r = requests.put(f"{BASE}/themes/{theme_id}.json", headers=HEAD,
    json={"theme": {"id": theme_id, "role": "main"}})
print(f"Publication : {r.status_code}")
```

## Phase D — Import des produits

**Méthode CSV (rapide)** :

1. Admin Shopify → **Produits** → bouton **Importer** (en haut)
2. Sélectionner `shopify-theme/products.csv`
3. Cocher "Remplacer tous les produits actuels" si tu repars de zéro
4. Importer
5. Vérifier que les 5 produits sont créés avec les bons prix

**Méthode API** : voir POST `/products.json` dans la doc Shopify, plus
verbeux mais scriptable. Le CSV reste recommandé.

## Phase E — Collection

```bash
curl -X POST "https://${SHOPIFY_STORE}.myshopify.com/admin/api/${API_VERSION}/custom_collections.json" \
  -H "X-Shopify-Access-Token: ${SHOPIFY_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "custom_collection": {
      "title": "La Gamme",
      "handle": "la-gamme",
      "body_html": "Quatre dispositifs pour un rituel complet, du contour des yeux au décolleté.",
      "published": true
    }
  }'
```

Puis y attacher les 4 produits avec POST `/collects.json` :
```bash
for handle in aurelia-signature aurelia-lumiere-pro aurelia-regard aurelia-decollete; do
  PROD_ID=$(curl -s "https://${SHOPIFY_STORE}.myshopify.com/admin/api/${API_VERSION}/products.json?handle=${handle}" \
    -H "X-Shopify-Access-Token: ${SHOPIFY_TOKEN}" | jq -r .products[0].id)
  curl -X POST "https://${SHOPIFY_STORE}.myshopify.com/admin/api/${API_VERSION}/collects.json" \
    -H "X-Shopify-Access-Token: ${SHOPIFY_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "{\"collect\": {\"product_id\": $PROD_ID, \"collection_id\": COLLECTION_ID}}"
done
```

## Phase F — Création des 14 pages

Script Python pour automatiser :

```python
import requests, os

STORE = os.environ["SHOPIFY_STORE"]
TOKEN = os.environ["SHOPIFY_TOKEN"]
VERSION = os.environ.get("API_VERSION", "2024-10")
BASE = f"https://{STORE}.myshopify.com/admin/api/{VERSION}"
HEAD = {"X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json"}

PAGES = [
    ("À propos", "a-propos"),
    ("Conditions générales de vente", "cgv"),
    ("Mentions légales", "mentions-legales"),
    ("Livraison & retours", "livraison-retours"),
    ("Politique de confidentialité", "confidentialite"),
    ("FAQ", "faq"),
    ("Guide d'utilisation", "guide-utilisation"),
    ("Programme fidélité — Le Cercle Aurélia", "programme-fidelite"),
    ("Devenir ambassadrice", "devenir-ambassadrice"),
    ("Le Rituel Complet", "le-rituel-complet"),
    ("Trouvez votre Aurélia", "diagnostic"),
    ("Mes favoris", "favoris"),
    ("Pour les professionnels", "professionnels"),
    ("Lexique skincare", "lexique"),
]

for title, handle in PAGES:
    payload = {"page": {
        "title": title,
        "handle": handle,
        "body_html": "",
        "template_suffix": handle,
        "published": True
    }}
    r = requests.post(f"{BASE}/pages.json", headers=HEAD, json=payload)
    print(f"{handle}: {r.status_code}")
```

⚠️ Le `template_suffix` doit correspondre au nom du fichier
`templates/page.{suffix}.liquid` sans le préfixe `page.` et sans
l'extension `.liquid`.

## Phase G — Blog "Journal" + 13 articles

```python
import requests, os, re

# Créer le blog
r = requests.post(f"{BASE}/blogs.json", headers=HEAD,
    json={"blog": {"title": "Journal", "handle": "journal"}})
blog_id = r.json()["blog"]["id"]

# Parser BLOG-CONTENT.md (le format est documenté)
with open("shopify-theme/BLOG-CONTENT.md") as f:
    content = f.read()

# Découpage par "## Article N"
articles = re.split(r'^## Article \d+', content, flags=re.MULTILINE)[1:]

for article_text in articles:
    title = re.search(r'^ — (.+)$', article_text, re.MULTILINE).group(1)
    handle = re.search(r'\*\*Handle\*\* : `(.+?)`', article_text).group(1)
    meta = re.search(r'\*\*Méta description\*\* : (.+)', article_text).group(1)
    tags = re.search(r'\*\*Tags\*\* : (.+)', article_text).group(1)
    body = re.search(r'```html\n(.+?)\n```', article_text, re.DOTALL).group(1)

    payload = {"article": {
        "title": title.strip(),
        "handle": handle,
        "body_html": body,
        "tags": tags,
        "published": True,
        "summary_html": meta
    }}
    r = requests.post(f"{BASE}/blogs/{blog_id}/articles.json",
        headers=HEAD, json=payload)
    print(f"{handle}: {r.status_code}")
```

## Phase H — Codes promo

```python
# WELCOME10
rule_payload = {"price_rule": {
    "title": "WELCOME10 — Bienvenue Aurélia",
    "target_type": "line_item",
    "target_selection": "all",
    "allocation_method": "across",
    "value_type": "percentage",
    "value": "-10.0",
    "customer_selection": "all",
    "starts_at": "2024-01-01T00:00:00Z",
    "prerequisite_subtotal_range": {"greater_than_or_equal_to": "0.00"}
}}
r = requests.post(f"{BASE}/price_rules.json", headers=HEAD, json=rule_payload)
rule_id = r.json()["price_rule"]["id"]
requests.post(f"{BASE}/price_rules/{rule_id}/discount_codes.json",
    headers=HEAD, json={"discount_code": {"code": "WELCOME10"}})

# RITUEL15 (sur le bundle uniquement)
PROD_BUNDLE_ID = ...  # GET product par handle le-rituel-complet
rule_payload = {"price_rule": {
    "title": "RITUEL15 — Bundle",
    "target_type": "line_item",
    "target_selection": "entitled",
    "allocation_method": "across",
    "value_type": "percentage",
    "value": "-15.0",
    "customer_selection": "all",
    "starts_at": "2024-01-01T00:00:00Z",
    "entitled_product_ids": [PROD_BUNDLE_ID]
}}
# puis attacher le code
```

## Phase I — Templates emails (MANUEL)

Admin → **Paramètres → Notifications → Notifications par e-mail**.

Pour chaque notification :
1. Trouver la notification correspondante (Confirmation de commande,
   Confirmation d'expédition, Confirmation de livraison, Panier abandonné)
2. Cliquer dessus → bouton **Modifier le code**
3. Effacer tout le code HTML par défaut
4. Coller le contenu de `shopify-theme/email-templates/[nom].liquid`
5. **Enregistrer**
6. Cliquer **Aperçu** pour vérifier le rendu
7. Optionnel : **Envoyer un e-mail de test** à ton adresse perso

Pour `welcome_newsletter.liquid` : à brancher dans un outil newsletter
(Klaviyo, Omnisend) car Shopify n'a pas de notification "bienvenue"
native — il faut une app pour ça.

## Phase J — Configurations manuelles restantes

### Paiements
**Paramètres → Paiements**
- Activer Shopify Payments (CB, Apple Pay, Google Pay)
- Ajouter PayPal Express
- Optionnel : Klarna (3×), Alma (3×/4×) pour le panier moyen 200-500 €

### Livraison
**Paramètres → Expédition et livraison**
- Zone : France métropolitaine
  - Livraison standard 4.90 € (gratuite ≥ 150 €)
  - Livraison express 9.90 € (J+1 ouvré, gratuite ≥ 300 €)
- Zone : Union Européenne (DE, BE, NL, ES, IT) — 12.90 € flat
- Zone : Reste du monde — à définir au cas par cas

### Politiques de la boutique
**Paramètres → Politiques de la boutique**
- Importer le HTML depuis les pages CGV/retours/confidentialité
  déjà créées (utiliser le bouton "Insérer un modèle Shopify" comme
  base, puis remplacer par notre contenu)

### Domaine
**Paramètres → Domaines**
- Si tu as `aurelia.paris` ou autre → connecter
- Activer HTTPS (auto via Shopify)
- Définir le domaine principal

### Comptes clients
**Paramètres → Comptes clients**
- Recommandé : "Les comptes sont facultatifs"
- Activer le passwordless login (magic link)

## Phase K — Vérifications finales

Tester depuis un mode incognito de Chrome (pour ne pas avoir le cache admin) :

- [ ] Homepage charge sans erreur, hero affiche les 4 produits
- [ ] Navigation header fonctionne
- [ ] Comparateur 4 produits visible
- [ ] Section science, ritual, témoignages OK
- [ ] FAQ accordéon s'ouvre/ferme
- [ ] Newsletter footer accepte un email
- [ ] Page produit Signature charge, ajout au panier marche
- [ ] Tiroir panier s'ouvre, progress bar livraison 150 € fonctionne
- [ ] Quiz /pages/diagnostic démarre et donne une recommandation
- [ ] Page /pages/lexique scrolle bien
- [ ] Page /pages/professionnels formulaire OK
- [ ] Page /pages/favoris vide initialement, ajout depuis carte produit OK
- [ ] Cookie banner s'affiche en premier visite, refus possible
- [ ] Article blog charge, lecture fluide
- [ ] Code WELCOME10 appliqué au checkout : -10 %
- [ ] Email de confirmation reçu après commande test

## Phase L — Lancement

- [ ] Mot de passe boutique retiré (Paramètres → Préférences → Mot de passe)
- [ ] Désindexer les pages non publiables retirées du robots.txt
- [ ] Soumettre sitemap.xml à Google Search Console
- [ ] Brancher Google Analytics 4 (conditionnellement, via event
  `aurelia:consent`)
- [ ] Brancher Meta Pixel (idem)
- [ ] Premier test d'achat avec carte personnelle (5 € de remise pour
  ne pas perdre d'argent sur les frais Shopify, puis remboursement)

## Notes de sécurité

- Le token API ne doit JAMAIS être commité dans GitHub
- Vérifier que `.gitignore` couvre `.env`, `*.token`, `credentials.json`
- Après l'install, désinstaller l'app "Aurelia Setup" pour révoquer le
  token (Paramètres → Applications → Aurelia Setup → Désinstaller)
- Activer la 2FA sur le compte Shopify proprio
- Pour les tokens long-terme, créer une **autre** custom app dédiée
  avec scopes minimaux (read-only + write spécifique au besoin)
