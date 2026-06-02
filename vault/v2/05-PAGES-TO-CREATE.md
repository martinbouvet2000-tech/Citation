---
title: "14 pages à créer dans Shopify"
tags: [pages, todo, aurelia]
created: 2026-06-01
---

# 📄 14 pages à créer dans Shopify

> Le contenu HTML/Liquid de chaque page est **déjà dans le thème** (dans
> `shopify-theme/templates/page.*.liquid`). Il faut juste créer chaque page
> dans l'admin Shopify avec le bon `template_suffix` pour que Shopify utilise
> le bon template.

## Procédure pour chaque page

1. Admin → **Boutique en ligne** → **Pages** (ou direct https://admin.shopify.com/store/3aff1g-y4/pages)
2. Bouton **Ajouter une page**
3. Remplir :
   - **Titre** : voir tableau ci-dessous
   - **Contenu** : LAISSER VIDE (le template du thème fournit tout)
   - **Modèle** (dropdown en bas à droite) : choisir le `template_suffix` correspondant
4. Section **Aperçu sur les moteurs de recherche** → clic crayon ✏️ :
   - **Identifiant URL** (handle) : voir tableau
   - Titre SEO et description : voir colonne SEO ci-dessous
5. **Visibilité** : Visible
6. **Enregistrer**

## Tableau des 14 pages

| # | Titre Shopify | Handle URL | Modèle (template_suffix) | Notes |
|---|---|---|---|---|
| 1 | À propos | `a-propos` | `a-propos` | Manifesto + équipe + fondatrice |
| 2 | Conditions générales de vente | `cgv` | `cgv` | CGV France complètes (à compléter avec SIRET réel) |
| 3 | Mentions légales | `mentions-legales` | `mentions-legales` | Obligatoires LCEN (à compléter SIRET, hébergeur) |
| 4 | Livraison & retours | `livraison-retours` | `livraison-retours` | Politique 30j |
| 5 | Politique de confidentialité | `confidentialite` | `confidentialite` | RGPD |
| 6 | FAQ | `faq` | `faq` | 30 questions × 5 catégories accordéon |
| 7 | Guide d'utilisation | `guide-utilisation` | `guide-utilisation` | Premiers pas, 6 étapes, timeline 8 sem. |
| 8 | Programme fidélité — Le Cercle Aurélia | `programme-fidelite` | `programme-fidelite` | 3 paliers |
| 9 | Devenir ambassadrice | `devenir-ambassadrice` | `devenir-ambassadrice` | Programme partenariat + formulaire |
| 10 | Le Rituel Complet | `le-rituel-complet` | `le-rituel-complet` | Landing bundle (ATTENTION : même handle que le produit bundle, peut créer conflit. Vérifier dans Shopify) |
| 11 | Trouvez votre Aurélia | `diagnostic` | `diagnostic` | Quiz interactif 7 questions |
| 12 | Mes favoris | `favoris` | `favoris` | Wishlist client (localStorage) |
| 13 | Pour les professionnels | `professionnels` | `professionnels` | B2B esthéticiennes / dermato |
| 14 | Lexique skincare | `lexique` | `lexique` | 36 termes A→W |

## ⚠️ Conflit possible : `le-rituel-complet`

Le **handle `le-rituel-complet`** est utilisé deux fois :
- Comme handle du **produit bundle** (Le Rituel Complet)
- Comme handle de la **page landing** (Le Rituel Complet)

Shopify peut t'empêcher de créer la page avec ce handle (déjà pris par le produit).

**Solutions** :
- Soit changer le handle de la page en `le-rituel-complet-landing` ou `rituel`
- Soit changer le handle du produit en `bundle-rituel-complet`
- Soit accepter que la page s'appelle `/pages/le-rituel-complet-1` (Shopify ajoute auto un `-1`)

Le plus propre : changer la **page** en handle `rituel` (URL `/pages/rituel`), et garder le produit avec `le-rituel-complet`.

## 📝 Méta SEO suggérées par page

Pour gagner du temps, voici les méta titres/descriptions à coller pour chaque page :

### À propos
- Titre : `AURÉLIA Paris — La maison parisienne de luminothérapie LED`
- Description : `Découvrez l'histoire d'AURÉLIA, fondée à Paris en 2024. Notre vision : la lumière comme un rituel. Notre équipe, nos valeurs, nos engagements.`

### CGV
- Titre : `Conditions générales de vente — AURÉLIA Paris`
- Description : `Nos conditions générales de vente : commande, paiement, livraison, garantie, droit de rétractation 30 jours. Conformité loi française.`

### Mentions légales
- Titre : `Mentions légales — AURÉLIA Paris`
- Description : `Informations légales sur AURÉLIA Paris : raison sociale, SIRET, hébergeur, contact, propriété intellectuelle.`

### Livraison & retours
- Titre : `Livraison & retours — Livraison offerte dès 150 € | AURÉLIA`
- Description : `Livraison standard 4,90 € (offerte dès 150 €) ou express 9,90 €. Retour gratuit sous 30 jours. Garantie 2 ans sur tous les dispositifs.`

### Politique de confidentialité
- Titre : `Politique de confidentialité — Aurélia Paris RGPD`
- Description : `Comment nous collectons et protégeons vos données personnelles. Vos droits RGPD. Cookies utilisés.`

### FAQ
- Titre : `FAQ — Toutes vos questions sur les masques LED AURÉLIA`
- Description : `30 questions / réponses : photothérapie LED, utilisation, résultats, contre-indications, SAV, commande. L'essentiel pour bien commencer.`

### Guide d'utilisation
- Titre : `Guide d'utilisation AURÉLIA — Votre première séance en 5 min`
- Description : `Le rituel pas à pas, les 4 modes de votre masque, le calendrier de progression sur 8 semaines, les erreurs à éviter.`

### Programme fidélité
- Titre : `Le Cercle Aurélia — Programme fidélité 3 paliers`
- Description : `Plus qu'un programme, une appartenance. Initiée, Confidente, Maison : avantages croissants, accès anticipé, séances diagnostic gratuites.`

### Devenir ambassadrice
- Titre : `Devenir ambassadrice AURÉLIA — Programme partenariat`
- Description : `15 % de commission, codes promo personnalisés, masques offerts pour test, mise en avant éditoriale. Pour les vraies parlantes du skincare.`

### Le Rituel Complet (page landing)
- Titre : `Le Rituel Complet AURÉLIA — Bundle 4 masques LED -92 €`
- Description : `Les 4 dispositifs Aurélia en un kit : Signature, Pro, Regard, Décolleté. 92 € d'économie. Livraison express offerte. Garantie 2 ans.`

### Diagnostic
- Titre : `Trouvez votre Aurélia — Diagnostic personnalisé en 2 min`
- Description : `Sept questions pour identifier le masque LED adapté à votre peau et vos objectifs. Recommandation immédiate, sans email obligatoire.`

### Mes favoris
- Titre : `Mes favoris — AURÉLIA Paris`
- Description : `Votre liste de favoris Aurélia. Retrouvez les dispositifs que vous souhaitez essayer ou offrir.`

### Pour les professionnels
- Titre : `AURÉLIA Pro — Programme esthéticiennes & dermatologues`
- Description : `Tarifs revendeurs, formation incluse, support dédié. Pour les esthéticiennes, instituts, spas et cabinets médicaux.`

### Lexique skincare
- Titre : `Lexique skincare AURÉLIA — 36 termes décryptés`
- Description : `Acide hyaluronique, photobiomodulation, fibroblastes, longueurs d'onde... Tout le vocabulaire du skincare expliqué simplement.`

## ✅ Une fois les 14 pages créées

Vérifie en mode incognito que chaque URL répond bien :
- https://3aff1g-y4.myshopify.com/pages/a-propos
- https://3aff1g-y4.myshopify.com/pages/cgv
- (etc.)

Si une page renvoie 404, c'est que :
- Le handle n'est pas celui attendu → vérifier dans la liste pages
- Ou le `template_suffix` est mauvais → reprendre

Ensuite passer à [[08-NAVIGATION-TODO]] pour ajouter ces pages au menu.
