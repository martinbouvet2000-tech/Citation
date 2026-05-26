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

### Produits — import en 30 secondes via CSV

Un fichier `products.csv` est livré à la racine du thème. Il contient les 4 produits Aurélia avec titres, descriptions HTML complètes, prix, prix barrés (anchor pricing), SKU, poids, tags, méta SEO, et metadata Google Shopping pré-remplis.

1. Admin Shopify → **Produits** → **Importer** → uploader `products.csv`
2. Cocher "Remplacer les produits avec un handle existant"
3. Valider l'aperçu → Importer
4. Aller dans chaque produit → ajouter 3-5 images (1200×1200 min) — utilisez `PHOTO-PROMPTS.md` pour générer les visuels via Nano Banana 2

Si tu préfères créer les produits à la main, le fichier `PRODUCT-CONTENT.md` contient le même contenu formaté pour copier-coller champ par champ.

### Collection
- **La gamme** (handle: `la-gamme`) — incluez les 4 produits ci-dessus

### Menus de navigation (Boutique en ligne → Navigation)
- **Menu principal** (`main-menu`) : La gamme, Le rituel, La science, FAQ
- Menus footer : Boutique / Maison / Aide

### Pages

Crée 5 pages avec les **handles exacts** suivants (Admin → Boutique en ligne → Pages → Ajouter une page) :

| Titre de la page | Handle (URL) | Suffixe template |
|---|---|---|
| À propos | `a-propos` | `page.a-propos` |
| CGV | `cgv` | `page.cgv` |
| Mentions légales | `mentions-legales` | `page.mentions-legales` |
| Livraison & retours | `livraison-retours` | `page.livraison-retours` |
| Politique de confidentialité | `confidentialite` | `page.confidentialite` |

Pour chaque page, dans l'admin Shopify : **Modèle de thème → sélectionne le bon suffixe**. Le contenu HTML est intégré au template, le champ "Contenu" Shopify peut rester vide.

> ⚠ **Important** : les 4 pages légales contiennent des placeholders `[NOM DE LA SOCIÉTÉ]`, `[SIRET]`, `[ADRESSE]`, etc. Une bannière jaune les signale en mode preview. Édite directement les fichiers `templates/page.*.liquid` pour les remplacer avant publication, **OU** crée les pages avec ton contenu HTML direct (champ Contenu) si tu préfères ne pas toucher au code.

### Articles de blog (SEO)

3 articles SEO sont rédigés dans `BLOG-CONTENT.md` (longue traîne, 800-1200 mots chacun, sources scientifiques incluses) :
- "Masque LED visage : comment ça marche vraiment ?"
- "Combien de temps pour voir les résultats d'un masque LED ?"
- "Lumière rouge, bleue, ambrée, infrarouge : longueurs d'onde LED"

Admin → **Boutique en ligne → Articles de blog → Gérer les blogs** → créer "Le Journal" (handle `journal`) → publier les 3 articles.

## 4. Configurer le thème (Personnaliser)

- **Logo & favicon** : trois SVG par défaut sont déjà inclus dans `assets/` :
  - Wordmark `AURÉLIA` rendu dynamiquement dans le header (via `snippets/logo-svg.liquid`) — utilise `Cormorant Garamond` et reprend le texte de `Nom de la boutique`
  - `favicon.svg` (monogramme A doré dans un cercle) — utilisé automatiquement si aucun favicon PNG n'est uploadé
  - `logo-stamp.svg` (estampille AURÉLIA Paris) — affiché en haut de la page À propos
  - Pour remplacer par tes propres assets : Personnaliser → Paramètres du thème → Image du logo / Favicon
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

## Fichiers livrés (à la racine de `shopify-theme/`)

| Fichier | Usage |
|---|---|
| `aurelia-theme.zip` (à la racine du repo) | À uploader dans Shopify (Thèmes → Ajouter un thème) |
| `products.csv` | Import direct des 4 produits (Produits → Importer) |
| `PRODUCT-CONTENT.md` | Mêmes 4 produits en format copy-paste manuel (titre, description HTML, FAQ, SEO) |
| `PHOTO-PROMPTS.md` | 16 prompts Nano Banana 2 pour générer les photos produit (4 par produit) |
| `BLOG-CONTENT.md` | 3 articles SEO prêts à publier (1 600 / 720 / 480 recherches/mois ciblées) |
| `INSTALL.md` | Ce document |

## Checklist de mise en ligne

- [ ] Importer `aurelia-theme.zip` dans Shopify
- [ ] Importer `products.csv` (Produits → Importer)
- [ ] Créer la collection `la-gamme` et y ajouter les 4 produits
- [ ] Créer les 5 pages avec les bons handles + suffixes template
- [ ] Remplir les placeholders `[NOM SOCIÉTÉ]` etc. dans les 4 pages légales
- [ ] Créer le blog `journal` + publier les 3 articles SEO
- [ ] Générer les photos produit via Nano Banana 2 (`PHOTO-PROMPTS.md`)
- [ ] Configurer les 2 menus de navigation (header + footer)
- [ ] Connecter les URLs réseaux sociaux (Personnaliser → Réseaux sociaux)
- [ ] Activer Shopify Payments
- [ ] Tester un achat de bout en bout en mode bac à sable
- [ ] Retirer la bannière "À compléter" des pages légales (supprimer `{% render 'legal-warning' %}` dans les 4 templates)
- [ ] Publier le thème
