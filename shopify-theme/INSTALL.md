# Thème AURÉLIA — Installation Shopify

Thème Shopify Online Store 2.0 prêt à l'emploi pour Aurélia Paris — boutique de masques LED de luminothérapie premium.

## 1. Créer le zip à uploader

Depuis ce dossier `shopify-theme/`, lancez :

```bash
cd shopify-theme
zip -r ../aurelia-theme.zip assets config layout locales sections snippets templates
```

> **Important** : le zip doit contenir les dossiers (`assets/`, `config/`, etc.) à sa racine — **pas** un dossier `shopify-theme/` à la racine. Sinon Shopify refusera l'upload.

## 2. Uploader dans Shopify

1. Admin Shopify → **Boutique en ligne** → **Thèmes**
2. En bas → **Ajouter un thème** → **Télécharger le fichier zip**
3. Sélectionnez `aurelia-theme.zip`
4. Une fois importé, cliquez sur **Personnaliser** pour ajuster les couleurs/contenus
5. **Publier** quand prêt

## 3. Avant de publier — créer le contenu Shopify

Dans l'admin Shopify, créez :

### Produits
- **AURÉLIA Signature** — prix 279,00 €, comparé 349,00 €, tag `best-seller`
- **AURÉLIA Lumière Pro** — prix 379,00 €, comparé 449,00 €, tag `new`
- **AURÉLIA Regard** — prix 129,00 €, comparé 179,00 €
- **AURÉLIA Décolleté** — prix 199,00 €, comparé 269,00 €

Pour chaque produit, ajoutez 3-5 images carrées (1200×1200 minimum).

### Collection
- **La gamme** (handle: `la-gamme`) — incluez les 4 produits ci-dessus

### Menus de navigation (Boutique en ligne → Navigation)
- **Menu principal** (`main-menu`) : La gamme, Le rituel, La science, FAQ
- Menus footer : Boutique / Maison / Aide

### Pages
- À propos, Livraison & retours, CGV, Mentions légales, Politique de confidentialité

## 4. Configurer le thème (Personnaliser)

- **Logo & favicon** : uploader le logo, définir le sous-titre
- **Couleurs** : ajustables (ivoire, bordeaux, or…)
- **Réseaux sociaux** : ajouter les URLs Instagram/TikTok/Pinterest
- **Page d'accueil** : connecter le bloc "Produit vedette" à AURÉLIA Signature, le bloc "Collection en vedette" à `la-gamme`, et les 4 produits du comparateur dans la section "Comparator"

## 5. Activer le paiement

Admin Shopify → **Paramètres** → **Paiements** → activer Shopify Payments (ou Stripe/PayPal). Une fois activé, le bouton "Procéder au paiement" du panier mène au checkout Shopify natif.

## Structure du thème

```
assets/
  theme.css     → tous les styles (variables CSS branchées sur les settings)
  theme.js      → cart drawer, AJAX cart, FAQ, variant picker
config/
  settings_schema.json   → personnalisation (couleurs, logo, social)
  settings_data.json
layout/
  theme.liquid           → layout global
locales/
  fr.default.json
sections/
  announcement-bar.liquid
  header.liquid / footer.liquid
  header-group.json / footer-group.json
  hero.liquid
  promise-strip.liquid
  featured-product-hero.liquid
  featured-collection.liquid
  ritual.liquid / science.liquid
  testimonials.liquid / faq.liquid / newsletter.liquid
  main-product.liquid / main-collection.liquid / main-cart.liquid / main-page.liquid
snippets/
  cart-drawer.liquid     → tiroir panier global
  product-card.liquid    → carte produit réutilisable
  icon.liquid            → bibliothèque d'icônes SVG
  meta-tags.liquid       → OpenGraph
templates/
  index.json             → page d'accueil (toutes les sections)
  product.json
  collection.json
  cart.json
  page.json
  404.liquid / search.liquid
```

## Personnaliser sans toucher au code

Toutes les sections sont éditables depuis **Boutique en ligne → Thèmes → Personnaliser**.
Vous pouvez réordonner, ajouter, retirer des sections (hero, témoignages, FAQ…) à la souris.
