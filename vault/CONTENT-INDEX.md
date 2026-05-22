# Index de tous les contenus rédigés

## Pages (14)

Toutes les pages sont **déjà écrites** dans `shopify-theme/templates/`.
Pour les créer dans Shopify, créer chaque page avec son handle et le
bon `template_suffix` — le thème injecte automatiquement le contenu.

| # | Titre | Handle | Template Liquid | Sujet |
|---|---|---|---|---|
| 1 | À propos | `a-propos` | `page.a-propos.liquid` | Manifesto, fondatrice, équipe |
| 2 | Conditions générales de vente | `cgv` | `page.cgv.liquid` | CGV légales France |
| 3 | Mentions légales | `mentions-legales` | `page.mentions-legales.liquid` | Mentions obligatoires LCEN |
| 4 | Livraison & retours | `livraison-retours` | `page.livraison-retours.liquid` | Politique 30j |
| 5 | Politique de confidentialité | `confidentialite` | `page.confidentialite.liquid` | RGPD |
| 6 | FAQ | `faq` | `page.faq.liquid` | 30 Q × 5 catégories accordéon |
| 7 | Guide d'utilisation | `guide-utilisation` | `page.guide-utilisation.liquid` | Premiers pas, 6 étapes, timeline 8 sem. |
| 8 | Programme fidélité | `programme-fidelite` | `page.programme-fidelite.liquid` | Le Cercle Aurélia, 3 paliers |
| 9 | Devenir ambassadrice | `devenir-ambassadrice` | `page.devenir-ambassadrice.liquid` | Programme partenariat + form |
| 10 | Le Rituel Complet | `le-rituel-complet` | `page.le-rituel-complet.liquid` | Landing bundle |
| 11 | Trouvez votre Aurélia | `diagnostic` | `page.diagnostic.liquid` | Quiz 7 questions |
| 12 | Mes favoris | `favoris` | `page.favoris.liquid` | Wishlist localStorage |
| 13 | Pour les professionnels | `professionnels` | `page.professionnels.liquid` | B2B esthéticiennes/derma |
| 14 | Lexique skincare | `lexique` | `page.lexique.liquid` | 36 termes A→W |

## Blog (13 articles)

Tous les articles sont **rédigés intégralement** dans
`shopify-theme/BLOG-CONTENT.md`. Chaque bloc contient :
- Titre SEO (50-60 caractères)
- Handle (slug kebab-case)
- Mot-clé cible + volume estimé Google France
- Méta description (145-155 caractères)
- Tags (3-5)
- Extrait (2 phrases)
- HTML complet (entre balises markdown ` ```html ... ``` `)

Blog à créer : titre **Journal**, handle `journal`.

| # | Titre | Handle | Volume |
|---|---|---|---|
| 1 | Comment fonctionne un masque LED | `comment-fonctionne-masque-led` | 1 600 |
| 2 | Combien de temps pour les résultats | `combien-de-temps-pour-resultats-masque-led` | 720 |
| 3 | Longueurs d'onde LED guide complet | `longueurs-onde-led-guide-complet` | 3 680 |
| 4 | Masque LED grossesse & allaitement | `masque-led-grossesse-allaitement` | 350 |
| 5 | Masque LED matin ou soir | `masque-led-matin-ou-soir` | 670 |
| 6 | LED vs cabinet esthétique | `masque-led-vs-cabinet-esthetique` | 420 |
| 7 | Acné hormonale adulte | `photo-therapie-acne-hormonale-adulte` | 1 200 |
| 8 | Masque LED pour homme | `masque-led-homme` | 380 |
| 9 | Entretenir son masque LED | `entretenir-masque-led-longevite` | 280 |
| 10 | 5 erreurs routine LED | `5-erreurs-routine-led` | 520 |
| 11 | Rosacée et photothérapie LED | `rosacee-photo-therapie-led` | 880 |
| 12 | Cernes pigmentaires / vasculaires / creux | `types-cernes-traitement-led` | 4 400 |
| 13 | Glow nuptial 90 jours | `glow-nuptial-90-jours` | 1 100 |

**Total volume SEO** : ~16 200 r/mois (France).

## Fiches produit (4 + 1 bundle)

Toutes les fiches sont **rédigées dans** `shopify-theme/PRODUCT-CONTENT.md`,
avec pour chaque produit :
- Titre commercial
- Sous-titre catchline
- Description longue (~400-500 mots)
- 6-8 bullet points clés
- Spécifications techniques (wavelengths, durées, batterie, etc.)
- FAQ produit (5-8 questions)
- Tags suggérés
- Catégorie Google Shopping

Le fichier `shopify-theme/products.csv` reprend tout ce contenu au
format **Shopify import direct** — il suffit de l'importer dans
Admin → Produits → Importer pour créer les 5 produits d'un coup.

## Emails transactionnels (5)

Tous prêts dans `shopify-theme/email-templates/` :

| Fichier | Notification Shopify |
|---|---|
| `order_confirmation.liquid` | Confirmation de commande |
| `shipping_confirmation.liquid` | Confirmation d'expédition |
| `order_delivered.liquid` | Confirmation de livraison |
| `abandoned_checkout.liquid` | Panier abandonné (sans promo agressive) |
| `welcome_newsletter.liquid` | Bienvenue newsletter avec WELCOME10 |

Format : HTML inliné (compatible Gmail/Outlook mobile), tables layout,
Liquid Shopify natif (`{{ order.name }}`, `{{ customer.first_name }}`, etc.).

Détail d'installation dans `shopify-theme/email-templates/README.md`.

## Prompts photo (16)

Tous dans `shopify-theme/PHOTO-PROMPTS.md` :
- 4 photos hero (1 par produit, fond ivoire studio)
- 4 photos lifestyle (mise en scène)
- 4 photos macro (détails, lumière LED active)
- 4 photos packaging (boîte ouverte, housse, intérieur)

Adapté pour Nano Banana 2 (Gemini) et Midjourney v6+.

## Snippets de copy réutilisables

### Tagline marque
> "La lumière, comme un rituel."

### Sous-titre footer
> "Maison de soins lumineux fondée à Paris en 2024. Quatre dispositifs,
> un rituel complet."

### Promesse livraison
> "Livraison offerte dès 150 € · Retour 30 jours · SAV France"

### Garantie
> "Garantie 24 mois sur tous les dispositifs. CE médical classe IIa."

### CTA newsletter
> "Recevez nos rituels de saison, conseils dermato et accès anticipé
> aux nouveautés. Un email par mois, jamais plus."

### Bandeau presse (placeholder, à remplacer par vraies retombées)
> "Présenté dans Vogue · ELLE · Marie Claire · Madame Figaro · Glamour"

⚠️ Le bandeau presse contient pour l'instant des **placeholders** —
à remplacer par les vraies retombées presse quand elles existeront.
Aucune publication réelle ne doit être citée tant que ce n'est pas vrai.
