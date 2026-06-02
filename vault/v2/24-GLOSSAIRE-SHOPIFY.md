---
title: "Glossaire Shopify et Aurélia"
tags: [glossaire, lexique, reference, aurelia]
created: 2026-06-01
---

# 📖 Glossaire — termes Shopify et Aurélia

> Si tu n'es pas spécialiste Shopify, lis-moi avant d'attaquer. Sinon tu vas
> perdre 20 min à comprendre des termes au fur et à mesure.

## Termes Shopify généraux

### Handle
URL slug d'une ressource. Format kebab-case (`aurelia-signature`).
- Pour un produit : `/products/aurelia-signature`
- Pour une page : `/pages/cgv`
- Pour une collection : `/collections/la-gamme`
- Pour un blog : `/blogs/journal`
- Pour un article : `/blogs/journal/comment-fonctionne-led`

⚠️ Le handle est **unique** dans son type. Si tu essaies de créer une page
avec le même handle qu'un produit existant, Shopify ajoute un `-1` auto.

### Template suffix
Suffixe d'un modèle de page Liquid dans le thème. Pour une page avec handle
`cgv`, si tu veux qu'elle utilise le template `templates/page.cgv.liquid`,
tu mets `template_suffix: "cgv"` (sans le préfixe `page.` ni l'extension).

Exemples utilisés dans AURÉLIA :
- `cgv`, `mentions-legales`, `livraison-retours`, `confidentialite`
- `a-propos`, `faq`, `guide-utilisation`
- `programme-fidelite`, `devenir-ambassadrice`
- `diagnostic`, `favoris`, `professionnels`, `lexique`
- `le-rituel-complet`

### Liquid
Le langage de templating de Shopify (`{{ variable }}`, `{% tag %}`).
Tous les fichiers `.liquid` du thème utilisent cette syntaxe.

### Section
Bloc de contenu réutilisable du thème, customisable via le Theme Editor.
Dans AURÉLIA : Hero, Bandeau promesses, Produit vedette, Science, etc.
Chacune correspond à un fichier `sections/[nom].liquid`.

### Snippet
Sous-élément réutilisable, inclus dans des sections via `{% render 'nom-snippet' %}`.
Pas customisable via Theme Editor (sauf via les paramètres exposés).
Dans AURÉLIA : cart-drawer, popup-exit-intent, cookie-banner, etc.

### Template
Modèle de page entier (homepage, produit, collection, blog, page).
Fichiers `templates/*.liquid` ou `*.json` (Online Store 2.0).
- `index.json` : homepage
- `product.json` : fiche produit
- `collection.json` : page collection
- `page.json` : page générique
- `page.cgv.liquid` : page avec template_suffix "cgv"

### Theme Editor / Personnaliser
Interface visuelle (split-screen avec preview live) pour customiser le thème
sans toucher au code. URL :
`https://admin.shopify.com/store/3aff1g-y4/themes/[id]/editor`

### Variant (variante)
Déclinaison d'un produit (taille, couleur, etc.). Chaque produit AURÉLIA a
1 seule variante (couleur unique). Le bundle est aussi à 1 variante.

### SKU
Stock Keeping Unit. Identifiant interne d'un produit/variante. AURÉLIA utilise :
- `AUR-SIG-LIL` (Signature - Lilas)
- `AUR-PRO-IVO` (Pro - Ivoire)
- `AUR-REG-ROS` (Regard - Rose)
- `AUR-DEC-IVO` (Décolleté - Ivoire)
- `AUR-BDL-001` (Bundle)

## Tokens et accès

### Admin API access token (`shpat_...`)
Token de longue durée pour appeler l'**Admin REST API** ou GraphQL Admin API.
Création via custom app dans Admin → Paramètres → Apps → Develop apps.
**MAIS** : sur les nouvelles dev stores, ce système est désactivé.

### App Automation Token (`atkn_...`)
Token créé via le **Dev Dashboard** (`dev.shopify.com`). Sert UNIQUEMENT
à la **Partner API** (gestion des apps), **PAS** à l'Admin API d'une boutique.
Ne pas confondre. Voir [[22-HISTORIQUE-ERREURS]] erreur #1.

### Storefront API token (`shpat_storefront_...`)
Token pour appeler la Storefront API (frontend public). Pas utilisé pour
l'install Shopify, sert aux apps headless.

### Shopify CLI
Outil en ligne de commande pour développer des thèmes et apps.
`npm i -g @shopify/cli @shopify/theme`. Login via OAuth navigateur.
Permet `shopify theme push`, `shopify theme dev` (preview live), etc.

## Types de boutiques

### Development store (dev store)
Boutique gratuite créée via Shopify Partners (`https://partners.shopify.com`).
Limitations :
- Pas de vrais paiements (mode test uniquement)
- 0,99 $/transaction (en mode test, pas réel)
- Max 25 commandes/mois en mode test
- À convertir en forfait payant pour vendre vraiment

### Forfaits payants
- **Basic** : 32 €/mois (promo Partners pour dev stores : 1 $/mois × 3 mois)
- **Shopify** : 92 €/mois
- **Advanced** : 384 €/mois
- **Plus** : ~2 300 $/mois (entreprise)

AURÉLIA partira sur Basic pour MVP.

### Custom Distribution App
Type d'app du Dev Dashboard installable uniquement sur des boutiques
spécifiques (pas via le Shopify App Store). Permet d'avoir un token Admin
API après installation OAuth.

## Paiements

### Shopify Payments
Passerelle de paiement native de Shopify. Couvre CB, Apple Pay, Google Pay,
Shop Pay automatiquement. Le plus simple à activer. Demande KYC + IBAN.
**Mode test** = transactions simulées (carte test `4242 4242 4242 4242`).

### Shop Pay
"Wallet" Shopify qui sauvegarde la CB du client pour un checkout 1-clic
sur toutes les boutiques Shopify. Activé auto avec Shopify Payments.

### Cartes test Stripe (utilisées en mode test Shopify Payments)
- Visa réussite : `4242 4242 4242 4242`
- Mastercard réussite : `5555 5555 5555 4444`
- Carte refusée : `4000 0000 0000 0002`
- CVV : `100` ou `123`
- Date : n'importe quoi dans le futur (ex. `12/30`)

## Légal France

### CGV (Conditions Générales de Vente)
Document légal obligatoire pour vendre en ligne. Contenu : commande,
paiement, livraison, garantie, droit de rétractation, etc.
Page AURÉLIA : `/pages/cgv`.

### LCEN
Loi pour la Confiance dans l'Économie Numérique. Impose les Mentions légales
(SIRET, hébergeur, contact, etc.).
Page AURÉLIA : `/pages/mentions-legales`.

### RGPD
Règlement Général sur la Protection des Données. Impose le cookie banner,
la politique de confidentialité, le droit à l'oubli, le consentement explicite.
Page AURÉLIA : `/pages/confidentialite`.

### DGCCRF
Direction Générale de la Concurrence, Consommation et Répression des Fraudes.
Amendes pour faux avis, faux témoignages, publicité trompeuse. Jusqu'à
300 000 € + 2 ans de prison.

### Droit de rétractation
14 jours minimum en France (Code de la consommation). AURÉLIA va plus loin
avec 30 jours.

### SIRET / SIREN
Numéro d'identification d'entreprise. Obligatoire pour vendre légalement.
Création gratuite et rapide via auto-entrepreneur.urssaf.fr.

### TVA intracom
Numéro de TVA intracommunautaire (format `FRxxxxxxxxxxx`). Pour entreprises
non micro qui font du B2B en Europe.

### CE médical classe IIa
Certification européenne pour dispositifs médicaux. Les masques LED de
photothérapie peuvent y prétendre. Nécessite un dossier technique + audit.
**Ne pas claim si pas certifié réellement**.

## Termes AURÉLIA spécifiques

### Rituel
Le mot-clé central de la marque. Désigne la séance LED quotidienne du soir.
À utiliser systématiquement en remplacement de "routine" ou "soin".

### Le Cercle Aurélia
Programme de fidélité à 3 paliers (Initiée, Confidente, Maison).

### Maison Aurélia
Le nom alternatif de la marque (style "Maison Goyard"). À utiliser dans
les eyebrow et copy éditorial pour ancrer le côté luxe parisien.

### Photothérapie LED
Technique scientifique d'utilisation de la lumière LED pour stimuler la peau.
Mécanisme : photobiomodulation des mitochondries des cellules cutanées.

### Longueurs d'onde
Chaque couleur LED a une longueur en nanomètres :
- Rouge 633 nm : collagène
- Rouge profond 660 nm : cicatrisation
- Infrarouge 830 nm : derme profond
- Bleue 415 nm : anti-acné
- Bleue profonde 465 nm : pores
- Ambrée 590 nm : éclat, anti-tache
- Verte 520 nm : apaisement
- Jaune 590-625 nm : anti-rougeur (parfois confondu avec ambrée)

### Quiet luxury
Style éditorial : luxe sans logos voyants, esthétique minimaliste et
naturelle (Aesop, Hermès, Loro Piana). Opposé de l'esthétique "blingée".

## Acronymes courants

- **MVP** : Minimum Viable Product (version minimale fonctionnelle)
- **ATC** : Add To Cart (ajout au panier)
- **AOV** : Average Order Value (panier moyen)
- **CR** : Conversion Rate (taux de conversion)
- **CTA** : Call To Action
- **DOM** : Document Object Model (structure HTML d'une page)
- **JSON-LD** : JavaScript Object Notation for Linked Data (SEO structuré)
- **SEO** : Search Engine Optimization
- **DTC** / **D2C** : Direct To Consumer
- **B2B** : Business to Business (vente aux pros)
- **B2C** : Business to Consumer (vente aux particuliers)
- **UGC** : User Generated Content (avis, photos de clients)
- **CRO** : Conversion Rate Optimization
