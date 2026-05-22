# Brief de passation — pour nouvelle session Claude

> Colle ce document **intégralement** dans une nouvelle session Claude qui
> a accès à ton navigateur (Computer Use, browser-use MCP, ou Claude Code
> en local sur ton PC). C'est un brief autonome : il contient tout le
> contexte nécessaire pour terminer l'installation Shopify sans aide.

---

## MISSION

Tu vas piloter le navigateur Chrome de l'utilisateur pour installer
intégralement une boutique Shopify e-commerce à partir d'un repo GitHub.

## CONTEXTE MARQUE

**AURÉLIA Paris** — boutique e-commerce française de masques LED de
luminothérapie premium. Fondée par Aurélia Marchand (ex-consultante
beauté Estée Lauder), Paris 2024. Positionnement : luxe accessible,
éditorial parisien, voix élégante et honnête.

Palette : ivoire `#FAF6F1` / crème `#F5EDE4` / or `#C9A96E` / bordeaux
`#6B2336` / ink `#1A1410`.
Typographie : Cormorant Garamond (serif titres) + Inter (sans).

## ACCÈS

- **URL boutique Shopify** : `3aff1g-y4.myshopify.com`
- **Admin URL** : `https://admin.shopify.com/store/3aff1g-y4`
- **Langue admin** : Français
- **Plan** : Development store (créé via Shopify Partners)

L'utilisateur est déjà loggé dans Chrome ou peut se logger.

## SOURCE DU CONTENU

- **Repo GitHub** : `martinbouvet2000-tech/Citation`
- **Branche de travail** : `claude/cryoglow-ecommerce-shop-mFjYb`
- **Branche de passation** : `vault/aurelia-handoff` (contient ce brief)

Fichiers clés à lire dans le repo (tout est en français) :
- `aurelia-theme.zip` — thème Shopify (75 fichiers, 154 Ko) à uploader
- `shopify-theme/PRODUCT-CONTENT.md` — 4 fiches produit complètes
- `shopify-theme/BLOG-CONTENT.md` — 13 articles SEO complets
- `shopify-theme/products.csv` — import direct produits Shopify
- `shopify-theme/PHOTO-PROMPTS.md` — 16 prompts visuels (Nano Banana 2)
- `shopify-theme/INSTALL.md` — runbook d'installation général
- `shopify-theme/templates/page.*.liquid` — 14 templates de pages
- `shopify-theme/email-templates/*.liquid` — 5 emails transactionnels
- `shopify-theme/email-templates/README.md` — où coller chaque email
- `vault/SHOPIFY-RUNBOOK.md` — procédure détaillée pas à pas

## APPROCHE RECOMMANDÉE

Pour limiter les clics manuels et fiabiliser, faire dans cet ordre :

1. **Créer une custom app dans l'admin boutique pour obtenir un token
   Admin API** (5 min de browser) — voir étape 1
2. **Une fois le token en main, faire 90 % du reste via Admin API REST**
   (curl ou Python requests) — 10× plus rapide et fiable que piloter Chrome
3. **Seules les actions non-API restent en browser** : templates emails
   dans Notifications, paiements, livraison

## ÉTAPE 1 — Récupérer le token Admin API (browser)

Naviguer vers `https://admin.shopify.com/store/3aff1g-y4`.

1. Clic sur **Paramètres** (engrenage en bas à gauche)
2. **Applications et canaux de vente**
3. Bouton **Développer des applications** (en haut à droite)
   - Si écran "Autoriser le développement d'applications personnalisées",
     cliquer + confirmer 2 fois
4. **Créer une application** → Nom : `Aurelia Setup`
5. Onglet **Configuration** → "Champs d'application d'accès à l'API
   Admin" → **Configurer**
6. Cocher les 12 scopes (Ctrl+F dans la page) :
   - `read_themes`, `write_themes`
   - `read_products`, `write_products`
   - `read_content`, `write_content`
   - `read_price_rules`, `write_price_rules`
   - `read_discounts`, `write_discounts`
   - `read_files`, `write_files`
7. **Enregistrer**
8. **Installer l'application** → confirmer
9. Onglet **Identifiants d'API** → **Jeton d'accès API Admin** →
   **Révéler le jeton une seule fois** → COPIER `shpat_xxx...`

⚠️ Le token ne s'affichera plus jamais. Stocker en variable d'env :
```bash
export SHOPIFY_TOKEN="shpat_xxx"
export SHOPIFY_STORE="3aff1g-y4"
```

## ÉTAPE 2 — Upload + activation du thème (API)

```bash
# 1. Créer un thème "unpublished"
curl -X POST "https://${SHOPIFY_STORE}.myshopify.com/admin/api/2024-10/themes.json" \
  -H "X-Shopify-Access-Token: ${SHOPIFY_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"theme": {"name": "Aurélia v5", "role": "unpublished"}}'
# Récupérer theme_id dans la réponse

# 2. Dézipper aurelia-theme.zip et uploader chaque asset
# PUT /admin/api/2024-10/themes/{theme_id}/assets.json
# Texte : {"asset": {"key": "templates/index.json", "value": "..."}}
# Binaire : {"asset": {"key": "assets/favicon.svg", "attachment": "<base64>"}}

# 3. Publier le thème
curl -X PUT "https://${SHOPIFY_STORE}.myshopify.com/admin/api/2024-10/themes/{theme_id}.json" \
  -H "X-Shopify-Access-Token: ${SHOPIFY_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"theme": {"id": THEME_ID, "role": "main"}}'
```

## ÉTAPE 3 — Créer les 4 produits

**Méthode simple : import du CSV** `shopify-theme/products.csv`
→ Admin → Produits → bouton "Importer" → upload du CSV.

**Sinon via API** : POST `/admin/api/2024-10/products.json` pour chacun.

Catalogue :

| Produit | Handle | Prix | Compare-at |
|---|---|---|---|
| AURÉLIA Signature | `aurelia-signature` | 279 € | 349 € |
| AURÉLIA Lumière Pro | `aurelia-lumiere-pro` | 379 € | 449 € |
| AURÉLIA Regard | `aurelia-regard` | 129 € | 179 € |
| AURÉLIA Décolleté | `aurelia-decollete` | 199 € | 269 € |
| Le Rituel Complet (bundle) | `le-rituel-complet` | 515 € | 607 € |

Contenu détaillé dans `shopify-theme/PRODUCT-CONTENT.md`.

Tags suggérés : `gamme`, `bestseller` (Signature), `pro` (Lumière Pro),
`regard`, `corps` (Décolleté), `bundle` (Rituel Complet).

## ÉTAPE 4 — Collection

POST `/admin/api/2024-10/custom_collections.json`

- Titre : `La Gamme`
- Handle : `la-gamme`
- Description : "Quatre dispositifs pour un rituel complet, du contour
  des yeux au décolleté."
- Type : Manuelle
- Y rattacher les 4 produits (pas le bundle)

## ÉTAPE 5 — Créer les 14 pages

Pour chaque page, POST `/admin/api/2024-10/pages.json` avec le bon
`template_suffix`. Le thème injecte le contenu automatiquement.

```json
{
  "page": {
    "title": "Conditions générales de vente",
    "handle": "cgv",
    "body_html": "",
    "template_suffix": "cgv",
    "published": true
  }
}
```

Liste exhaustive :

| Titre | Handle | template_suffix |
|---|---|---|
| À propos | `a-propos` | `a-propos` |
| Conditions générales de vente | `cgv` | `cgv` |
| Mentions légales | `mentions-legales` | `mentions-legales` |
| Livraison & retours | `livraison-retours` | `livraison-retours` |
| Politique de confidentialité | `confidentialite` | `confidentialite` |
| FAQ | `faq` | `faq` |
| Guide d'utilisation | `guide-utilisation` | `guide-utilisation` |
| Programme fidélité — Le Cercle Aurélia | `programme-fidelite` | `programme-fidelite` |
| Devenir ambassadrice | `devenir-ambassadrice` | `devenir-ambassadrice` |
| Le Rituel Complet | `le-rituel-complet` | `le-rituel-complet` |
| Trouvez votre Aurélia (diagnostic) | `diagnostic` | `diagnostic` |
| Mes favoris | `favoris` | `favoris` |
| Pour les professionnels | `professionnels` | `professionnels` |
| Lexique skincare | `lexique` | `lexique` |

## ÉTAPE 6 — Blog "Journal" + 13 articles

```bash
# Créer le blog
curl -X POST "...admin/api/2024-10/blogs.json" \
  -d '{"blog": {"title": "Journal", "handle": "journal"}}'
```

Puis pour chaque article : POST `/admin/api/2024-10/blogs/{blog_id}/articles.json`.

Le contenu (titre, handle, méta, tags, HTML complet) est dans
`shopify-theme/BLOG-CONTENT.md`. Parser ce fichier markdown pour extraire
les 13 blocs et créer un article Shopify par bloc.

Handles attendus :
1. `comment-fonctionne-masque-led`
2. `combien-de-temps-pour-resultats-masque-led`
3. `longueurs-onde-led-guide-complet`
4. `masque-led-grossesse-allaitement`
5. `masque-led-matin-ou-soir`
6. `masque-led-vs-cabinet-esthetique`
7. `photo-therapie-acne-hormonale-adulte`
8. `masque-led-homme`
9. `entretenir-masque-led-longevite`
10. `5-erreurs-routine-led`
11. `rosacee-photo-therapie-led`
12. `types-cernes-traitement-led`
13. `glow-nuptial-90-jours`

## ÉTAPE 7 — Codes promo

Pour chaque code, 2 appels API :

1. POST `/admin/api/2024-10/price_rules.json` → la règle
2. POST `/admin/api/2024-10/price_rules/{id}/discount_codes.json` → le code

| Code | Type | Valeur | Conditions |
|---|---|---|---|
| `WELCOME10` | Percentage | -10 % | Première commande, min 0 €, illimité |
| `RITUEL15` | Percentage | -15 % | Sur produit `le-rituel-complet` uniquement |

## ÉTAPE 8 — Templates emails (MANUEL, pas d'API)

Admin → **Paramètres → Notifications → Notifications par e-mail**.

Pour chacun des 5 emails, copier le contenu HTML depuis le fichier
`shopify-theme/email-templates/*.liquid` et le coller dans le champ
"Code HTML" de la notification Shopify correspondante :

| Fichier source | Notification Shopify |
|---|---|
| `order_confirmation.liquid` | Confirmation de commande |
| `shipping_confirmation.liquid` | Confirmation d'expédition |
| `order_delivered.liquid` | Confirmation de livraison |
| `abandoned_checkout.liquid` | Panier abandonné |
| `welcome_newsletter.liquid` | (à brancher via app newsletter type Klaviyo) |

Détail dans `shopify-theme/email-templates/README.md`.

## ÉTAPE 9 — Configurations manuelles restantes

Actions non automatisables via API :
- **Paramètres → Paiements** : activer Shopify Payments, brancher PayPal
- **Paramètres → Expédition et livraison** :
  - Zone France
  - Livraison standard gratuite ≥ 150 €, sinon 4.90 €
  - Livraison express 9.90 €
- **Paramètres → Politiques de la boutique** : générer/coller depuis
  les pages CGV/retours/confidentialité déjà créées
- **Paramètres → Domaine** : si domaine custom, connecter et HTTPS
- **Photos produits** : 16 prompts dans `PHOTO-PROMPTS.md` à passer
  dans Nano Banana 2 ou Midjourney, puis upload manuel sur chaque
  fiche produit

## VOIX DE MARQUE (à respecter en tout)

- Français élégant, éditorial parisien luxe discret
- Vouvoiement systématique (jamais de tutoiement)
- Jamais "PROFITEZ !" "ENFIN UN PRODUIT" "DÉPÊCHEZ-VOUS" — voix calme
- Aucune mention de marques tierces : pas de Shark, CryoGlow, iQLED,
  InstaChill, ni nom de revendeur tiers
- Sources scientifiques citées quand pertinent (PubMed, SFD, Cochrane)
- Pas d'emojis dans le contenu publié

## RAPPORT ATTENDU À LA FIN

Produire un compte-rendu utilisateur avec :
- URL publique de la boutique (front)
- URL de chaque page créée (14 liens)
- URL du blog + 13 articles
- Confirmation codes promo (`WELCOME10` et `RITUEL15`)
- Liste des actions manuelles restantes avec liens directs vers les
  écrans d'admin concernés

## NOTES DE ROBUSTESSE

- Toujours vérifier `response.status_code` après chaque appel API
- Si 429 (rate limit), attendre 2 s et retry (max 3 fois)
- Si 422 (validation error), logger le détail et continuer le reste
- Ne JAMAIS pousser le token API dans GitHub (vérifier `.gitignore`)
- Le token est révocable côté admin → désinstaller l'app après l'install
- API version recommandée : `2024-10` (stable au moment de l'écriture)

## ARTEFACTS CRITIQUES À RÉCUPÉRER

```bash
git clone https://github.com/martinbouvet2000-tech/Citation.git
cd Citation
git checkout claude/cryoglow-ecommerce-shop-mFjYb

# Tout ce dont tu as besoin est là :
ls -la aurelia-theme.zip shopify-theme/
```
