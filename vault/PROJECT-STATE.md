# État du projet AURÉLIA — instantané

> Mise à jour : sprint 5 terminé. Tout est dans la branche
> `claude/cryoglow-ecommerce-shop-mFjYb` côté GitHub.

## Vue d'ensemble

Boutique e-commerce Shopify complète pour la marque **AURÉLIA Paris**,
vendant 4 masques LED de luminothérapie + 1 bundle. Le repo contient :

- Un thème Shopify Online Store 2.0 complet (75 fichiers, 154 Ko)
- 4 fiches produit rédigées
- 13 articles SEO publiables
- 14 templates de pages (légal + éditorial + B2B)
- 5 emails transactionnels prêts
- Tous les outils d'import (CSV produits, prompts photo)

## Ce qui est FAIT (dans le repo)

### Identité de marque
- ✅ Nom + storytelling fondatrice (Aurélia Marchand, ex-Estée Lauder)
- ✅ Charte couleurs et typographique
- ✅ Wordmark SVG, favicon, estampille maison

### Thème Shopify
- ✅ 19 sections (hero, header, footer, science, ritual, comparateur,
  témoignages, FAQ, presse, newsletter, promo-countdown, etc.)
- ✅ 15 snippets (cart-drawer avec upsell, popup exit-intent, breadcrumbs,
  JSON-LD, Google Shopping, wishlist-button, cookie-banner, back-in-stock,
  diagnostic-results, etc.)
- ✅ 16 templates de pages (dont 14 pages dédiées)
- ✅ Sections JSON pour homepage, product, collection, cart
- ✅ CSS+JS thématisés (theme.css, theme.js, diagnostic.css/js, wishlist.js)

### Pages rédigées (14)
- ✅ À propos (manifesto + équipe)
- ✅ CGV
- ✅ Mentions légales
- ✅ Livraison & retours
- ✅ Politique de confidentialité RGPD
- ✅ FAQ (30 questions × 5 catégories accordéon)
- ✅ Guide d'utilisation (timeline 8 semaines)
- ✅ Programme fidélité — Le Cercle Aurélia (3 paliers)
- ✅ Devenir ambassadrice (formulaire candidature)
- ✅ Le Rituel Complet (bundle landing)
- ✅ Trouvez votre Aurélia (quiz diagnostic 7 questions)
- ✅ Mes favoris (wishlist localStorage)
- ✅ Pour les professionnels (B2B/instituts/derma)
- ✅ Lexique skincare (36 termes)

### Catalogue produits (5)
- ✅ AURÉLIA Signature — 279 €
- ✅ AURÉLIA Lumière Pro — 379 €
- ✅ AURÉLIA Regard — 129 €
- ✅ AURÉLIA Décolleté — 199 €
- ✅ Bundle Le Rituel Complet — 515 €
- ✅ Fichier `products.csv` prêt à importer
- ✅ Fiches produit détaillées dans `PRODUCT-CONTENT.md`

### Blog (13 articles SEO)
1. Comment fonctionne un masque LED (1 600 r/mois)
2. Combien de temps pour les résultats (720 r/mois)
3. Longueurs d'onde LED guide complet (3 680 r/mois)
4. Masque LED grossesse/allaitement (350 r/mois)
5. Matin ou soir (670 r/mois)
6. LED vs cabinet esthétique (420 r/mois)
7. Acné hormonale adulte (1 200 r/mois)
8. Masque LED pour homme (380 r/mois)
9. Entretenir son masque LED (280 r/mois)
10. 5 erreurs routine LED (520 r/mois)
11. Rosacée et photothérapie LED (880 r/mois)
12. Types de cernes — pigmentaires/vasculaires/creux (4 400 r/mois)
13. Glow nuptial 90 jours (1 100 r/mois)

Total volume SEO cumulé : ~16 200 recherches/mois.

### Emails transactionnels (5)
- ✅ order_confirmation.liquid
- ✅ shipping_confirmation.liquid
- ✅ order_delivered.liquid
- ✅ abandoned_checkout.liquid
- ✅ welcome_newsletter.liquid (avec code WELCOME10)

### Features de conversion
- ✅ Popup exit-intent newsletter (mouseleave, 15 s armement)
- ✅ Sticky add-to-cart mobile
- ✅ Image zoom desktop (hover loupe)
- ✅ Stock badge "Plus que X"
- ✅ Compte à rebours promo configurable
- ✅ Upsell dans tiroir panier
- ✅ Anchor pricing partout
- ✅ Quiz diagnostic 7 questions + add-to-cart auto
- ✅ Wishlist localStorage avec sync inter-pages
- ✅ Progress bar livraison gratuite (seuil 150 €)
- ✅ Back-in-stock notification (form natif Shopify)
- ✅ Page 404 redesignée

### Conformité légale
- ✅ Cookie banner RGPD CNIL-compliant (refus aussi visible qu'accepter)
- ✅ Page confidentialité complète
- ✅ Bandeau "à compléter" sur infos placeholder (SIRET, etc.)
- ✅ 4 catégories cookies cochables (essentiel/audience/marketing/perso)
- ✅ Event `aurelia:consent` émis pour brancher GA/Pixel plus tard

### SEO
- ✅ JSON-LD : Organization, Product, FAQ, Breadcrumb, Collection,
  WebSite, BlogPosting
- ✅ Robots conditionnel, hreflang fr-fr
- ✅ Open Graph + Twitter Card
- ✅ Google Shopping metadata (GTIN, MPN, condition, gender, age_group)
- ✅ Breadcrumbs sur produit et collection

## Ce qui RESTE à faire (côté Shopify)

### Nécessite l'admin Shopify ou un token API
- ❌ Upload du thème dans la boutique
- ❌ Activation du thème (publish)
- ❌ Import des 4 produits + bundle
- ❌ Création de la collection `la-gamme`
- ❌ Création des 14 pages avec handles
- ❌ Création du blog `journal` + publication des 13 articles
- ❌ Codes promo `WELCOME10` et `RITUEL15`
- ❌ Templates emails à coller dans Paramètres → Notifications
- ❌ Configuration des moyens de paiement
- ❌ Configuration des zones et tarifs de livraison
- ❌ Connexion domaine custom (optionnel : `aurelia.paris` ?)

### Photos
- ❌ Génération des 16 visuels via Nano Banana 2 / Midjourney
  (prompts dans `shopify-theme/PHOTO-PROMPTS.md`)
- ❌ Upload des images sur chaque fiche produit
- ❌ Photo hero + photos sections homepage

### Optionnel / nice-to-have
- ❌ App d'avis client (Judge.me, Loox) à connecter
- ❌ App newsletter (Klaviyo, Omnisend) pour le welcome_newsletter
- ❌ App de fidélité (Smile.io, LoyaltyLion) pour Le Cercle Aurélia
- ❌ Pixel Meta + GA4 + TikTok à brancher (event `aurelia:consent`
  déjà disponible pour conditionner le chargement)

## Statistiques du projet

| Métrique | Valeur |
|---|---|
| Branches actives | `claude/cryoglow-ecommerce-shop-mFjYb` + `vault/aurelia-handoff` |
| Commits sur la branche de travail | 9+ |
| Lignes de code ajoutées (cumulé) | ~12 000 |
| Fichiers dans le zip thème | 75 |
| Taille du zip | 154 Ko |
| Templates Liquid (sections+snippets+templates+layout) | ~50 |
| Pages contenu rédigées | 14 |
| Articles blog rédigés | 13 |
| Mots de contenu cumulés | ~25 000 |
| Volume SEO ciblé | ~16 200 r/mois |

## Historique des sprints

| Sprint | Livraison principale |
|---|---|
| Sprint 0 | Repo de base, identité AURÉLIA, sections homepage |
| Sprint 1 | Pages légales + à propos, comparateur produits, SEO JSON-LD |
| Sprint 2 | CSV produits, prompts photo, garde-fous légaux |
| Sprint 3 | Polish autonome (404, bundle landing, upsell, 2 articles) |
| Sprint 4 | 4 agents parallèles : +5 articles, 5 emails, 4 pages, 5 features |
| Sprint 5 | 3 agents parallèles : quiz diagnostic, RGPD/wishlist/livraison, B2B/lexique + 3 articles |

## Limites connues

- Cette session Claude (instance cloud Anthropic) **n'a pas accès au
  navigateur** de l'utilisateur. Pour piloter Chrome / Shopify admin,
  il faut une session avec Computer Use ou un MCP browser local
  (cf. `HANDOFF-CLAUDE.md`)
- Les photos produit doivent être générées séparément (Nano Banana 2,
  Midjourney, ou photographe). Les prompts sont fournis.
- Le domaine custom (ex. `aurelia.paris`) n'est pas encore acheté/lié.
- Aucune intégration tierce n'est branchée (avis, newsletter, fidélité,
  pixels) — par choix : laisser le merchant choisir ses apps.
