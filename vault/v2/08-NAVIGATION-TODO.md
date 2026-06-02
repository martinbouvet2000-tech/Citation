---
title: "Menu principal + footer à configurer"
tags: [navigation, todo, aurelia]
created: 2026-06-01
---

# 🧭 Menu principal + footer

> Avant de configurer le menu, **créer d'abord les 14 pages** (voir
> [[05-PAGES-TO-CREATE]]) sinon les liens seront morts.

## Accès

Admin → **Boutique en ligne** → **Navigation**
URL directe : https://admin.shopify.com/store/3aff1g-y4/menus

Tu vois normalement 2 menus existants :
- **Menu principal** (Main menu) — affiché dans le header
- **Footer menu** — affiché dans le footer

## Menu principal — Structure cible

Renomme les éléments existants ou ajoute-les si manquants. Garde une nav
courte (max 5-6 items pour ne pas surcharger).

| Ordre | Nom affiché | URL / Lien |
|---|---|---|
| 1 | Accueil | `/` |
| 2 | La Gamme | `/collections/la-gamme` |
| 3 | Le Rituel Complet | `/products/le-rituel-complet` |
| 4 | Diagnostic | `/pages/diagnostic` |
| 5 | Journal | `/blogs/journal` |
| 6 | À propos | `/pages/a-propos` |

### Sous-menu "La Gamme" (déroulant)

Optionnel pour rendre la nav plus riche. Sous "La Gamme", ajouter en sous-items :
- Visage : Signature → `/products/aurelia-signature`
- Anti-âge intensif : Lumière Pro → `/products/aurelia-lumiere-pro`
- Regard : `/products/aurelia-regard`
- Décolleté : `/products/aurelia-decollete`

### Procédure pour ajouter un sous-menu

1. Dans le menu principal, **ajouter "La Gamme"** (lien `/collections/la-gamme`)
2. Sous "La Gamme", clic sur **« Ajouter un élément de menu »** pour créer un enfant
3. Indenter (Shopify affiche les enfants en dropdown)

## Menu Footer — Structure cible

Le footer doit grouper les liens par catégorie. Le thème Aurélia affiche
plusieurs colonnes (4 typiquement) :

### Colonne 1 : "La maison"
- À propos → `/pages/a-propos`
- Le Cercle Aurélia → `/pages/programme-fidelite`
- Devenir ambassadrice → `/pages/devenir-ambassadrice`
- Pour les professionnels → `/pages/professionnels`

### Colonne 2 : "Aide & SAV"
- FAQ → `/pages/faq`
- Guide d'utilisation → `/pages/guide-utilisation`
- Lexique skincare → `/pages/lexique`
- Nous contacter → `/pages/contact` (à créer si manquant — page Shopify native)

### Colonne 3 : "Légal"
- Conditions générales de vente → `/pages/cgv`
- Mentions légales → `/pages/mentions-legales`
- Livraison & retours → `/pages/livraison-retours`
- Politique de confidentialité → `/pages/confidentialite`

### Colonne 4 : "Suivez-nous"
- Instagram → `https://instagram.com/aurelia.paris` (à créer)
- TikTok → `https://tiktok.com/@aurelia.paris` (à créer)
- Newsletter → ancre vers la section newsletter ou lien `/pages/newsletter`

## ⚙️ Configurer les menus dans Shopify

### Pour le menu principal

1. Admin → **Boutique en ligne** → **Navigation** → cliquer sur **Menu principal**
2. Pour chaque item à ajouter :
   - Clic **« Ajouter un élément de menu »**
   - **Nom** : ce qui s'affichera (ex. "La Gamme")
   - **Lien** : taper dans la recherche → Shopify suggère les collections, pages, produits — sélectionner le bon
   - **Enregistrer le menu** (en haut à droite)
3. Pour réordonner : glisser-déposer les items
4. Pour créer un sous-menu : ajouter un item enfant en l'indentant sous un parent

### Pour le footer

Même principe avec le menu **Footer menu**.

⚠️ Si le thème Aurélia a une structure footer en colonnes hardcodée, il faudra
peut-être créer **plusieurs menus** :
- `footer-maison` (colonne 1)
- `footer-aide` (colonne 2)
- `footer-legal` (colonne 3)
- `footer-social` (colonne 4)

Et lier chaque menu à sa colonne dans le Theme Editor → section Footer.

À vérifier en ouvrant la section Footer du Theme Editor : quels champs de
sélection de menu sont présents ?

## ✅ Vérification finale

Mode incognito sur https://3aff1g-y4.myshopify.com :
- Cliquer sur chaque item du menu principal → la bonne page s'ouvre, pas de 404
- Scroll en bas → vérifier que chaque lien du footer fonctionne
- Vérifier sur mobile (mode responsive Chrome F12) : le menu burger affiche bien les items

## 💡 Astuce SEO

Si le footer pointe vers des pages avec contenu de qualité (FAQ, Lexique, Guide),
Google considère ces liens comme **signaux de structure** → meilleur référencement
des pages SEO comme le lexique (qui peut ranker sur des questions LED skincare).

## 📌 Cas particulier : page Contact

Shopify a une **page Contact native** automatique :
- URL : `/pages/contact`
- Affiche un formulaire de contact qui envoie à l'email proprio
- Pas besoin de la créer manuellement, elle existe par défaut

Pour la customiser : Admin → Pages → "Contact" (peut être à créer en réalité,
selon les versions Shopify). Si pas créée auto, créer une page :
- Titre : `Contact`
- Handle : `contact`
- Modèle : `page.contact` (template natif Shopify)
