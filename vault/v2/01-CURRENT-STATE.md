---
title: "État actuel précis de la boutique"
tags: [state, shopify, aurelia]
created: 2026-06-01
---

# 📊 État actuel précis de la boutique Shopify

> Snapshot au 1er juin 2026. Tout ce qui est ici est **déjà fait** dans Shopify
> — ne pas refaire.

## ✅ Identité de la boutique

| Élément | Valeur |
|---|---|
| Nom interne | Ma boutique 3 (à renommer en "Aurélia Paris") |
| URL myshopify | `3aff1g-y4.myshopify.com` |
| Email contact | `martinbouvet2000@gmail.com` |
| Adresse | 5 Chemin du Moulin, 92130 Issy-les-Moulineaux, France |
| Devise | EUR (€) |
| Langue admin | Français |
| Type | Dev store (Shopify Partners) |
| Forfait | Pas encore — **mode test uniquement** |
| Statut visibilité | **PUBLIQUE** (mot de passe retiré) |

## ✅ Thème actif

| Élément | Valeur |
|---|---|
| Nom | `aurelia-theme` |
| Version | 1.0.0 |
| Statut | Publié comme thème principal |
| Source | Repo GitHub `martinbouvet2000-tech/Citation`, branche `claude/cryoglow-ecommerce-shop-mFjYb` |
| Fichiers | 75 fichiers (sections, snippets, templates, assets) |

## ✅ Produits créés (5)

Tous **actifs**, suivi des stocks varie :

| Produit | Handle | Prix | Compare-at | Stock | Image |
|---|---|---|---|---|---|
| Le Rituel Complet — Bundle 4 dispositifs Aurélia | `le-rituel-complet` | 515 € | (à vérifier) | non suivi | ✅ flat lay |
| AURÉLIA Décolleté — Soin LED cou & décolleté | `aurelia-decollete` | 199 € | 269 € | 40 | ✅ collier rouge |
| AURÉLIA Regard — Soin LED contour des yeux & cernes | `aurelia-regard` | 129 € | 179 € | 80 | ✅ yeux ambrés |
| Masque LED AURÉLIA Lumière Pro — 7 longueurs d'onde anti-âge | `aurelia-lumiere-pro` | 379 € | 449 € | 30 | ⚠️ **MAUVAISE photo** (a celle du hero, devrait être le packshot multi-LED + télécommande) |
| Masque LED AURÉLIA Signature — Photothérapie & cryo regard | `aurelia-signature` | 279 € | 349 € | 50 | ✅ packshot masque |

## ✅ Collection

| Titre | Handle | Produits liés |
|---|---|---|
| La Gamme | `la-gamme` | Signature, Lumière Pro, Regard, Décolleté (4 — pas le bundle) |

## ✅ Codes promo

| Code | Type | Valeur | Conditions | Cumul |
|---|---|---|---|---|
| `WELCOME10` | Pourcentage | -10 % | Sur la commande entière · 1 utilisation par client | Non cumulable |
| `RITUEL15` | Pourcentage | -15 % | Sur produit `le-rituel-complet` uniquement · 1 utilisation par client | Non cumulable |

⚠️ Le code apparaît parfois sous le nom **BIENVENUE10** dans l'admin à cause du traducteur Chrome auto. Le vrai code dans Shopify est bien `WELCOME10`.

## ✅ Paiements

- **Shopify Payments en MODE TEST** activé
- IBAN connecté : Caisse d'Épargne et de Prévoyance Hauts de France
- Moyens activés : Shop Pay, Visa, Mastercard, American Express, Cartes Bancaires, Apple Pay, Google Pay
- USDC (crypto) : ignoré (warning visible mais non configuré)
- ⚠️ **Aucun paiement réel possible** tant que la boutique n'est pas convertie en forfait Basic
- ❌ PayPal : NON activé (Shopify ne le propose pas en standalone sur cette dev store)
- ❌ Klarna / Alma : NON activés (alors que le bandeau promesse les mentionne — incohérence à corriger)

## ✅ Livraison

| Tarif | Prix | Délai | Condition |
|---|---|---|---|
| **Standard France** | 4,90 € (gratuit ≥ 150 €) | 5-10 jours ouvrables (ajusté pour dropship intra-UE) | aucune |
| **Express France** | 9,90 € | 3-5 jours ouvrables | aucune |
| Standard International | 29,00 € | 3-5 jours ouvrables | zone non activée (warning) |
| Standard UE | 22,00 € | 3-5 jours ouvrables | zone non activée (warning) |

⚠️ Les zones UE et International existent mais leurs pays ne sont pas activés dans un "Marché" Shopify. → Pour vendre hors France, il faudra activer ces marchés.

## ✅ Customisation thème (en cours)

### Sections customisées
- ✅ **Hero** : image (femme profil + fenêtre), eyebrow "Maison Aurélia · Paris",
  titre "La lumière, comme un rituel.", description Aurélia, CTAs vers `/collections/la-gamme` et `/pages/diagnostic`
- ✅ **Bandeau promesses** : 4 promesses (livraison offerte, cliniquement testé, garantie 2 ans, paiement 3×) — textes hardcodés, OK
- ⏳ **Produit vedette** : section présente, **à lier au produit Signature** (champ "Produit" → Sélectionner)
- ⏳ **Collection en vedette** : textes OK ("La gamme", "Quatre masques, un rituel"), **à lier à la collection La Gamme**
- ⏳ **Comparateur de masques** : structure OK avec 4 colonnes pré-remplies, **à lier les 4 produits** aux 4 colonnes (Masque 1 à 4)
- ❌ Sections suivantes (Science, Ritual, Témoignages, Presse, FAQ, Newsletter, Footer) : pas encore vérifiées / customisées

### Pavés du Hero à désactiver
- ⚠️ Toggle "Afficher la note" (`4,8/5 · plus de 1 200 avis vérifiés`) → **encore activé** = FAUX AVIS, illégal en France
- ⚠️ Le placeholder "Ajoutez une image produit" de la section Produit vedette → à remplacer en liant le produit

## ❌ Pas encore fait (priorité ce soir)

| Catégorie | Élément | Détail |
|---|---|---|
| Pages | **14 pages** | À créer une par une dans Admin → Boutique en ligne → Pages, avec le bon `template_suffix` pour chacune. Le contenu HTML/Liquid est dans le thème. Liste exacte dans [[05-PAGES-TO-CREATE]] |
| Blog | **Blog "Journal" + 13 articles** | À créer manuellement dans Admin → Boutique en ligne → Articles de blog. Contenu rédigé dans `shopify-theme/BLOG-CONTENT.md` du repo. Détails dans [[06-BLOG-TO-PUBLISH]] |
| Emails | **5 templates emails** | À coller dans Paramètres → Notifications. Sources dans `shopify-theme/email-templates/*.liquid`. Détails dans [[07-EMAILS-TO-INSTALL]] |
| Politiques | **CGV, retours, RGPD** | À configurer dans Paramètres → Politiques de la boutique. Soit pointer vers les pages créées, soit copier le HTML. Détails dans [[09-POLICIES-TODO]] |
| Navigation | **Menu principal + footer** | Le menu actuel n'a pas "La Gamme" ni les pages. À reconfigurer dans Boutique en ligne → Navigation. Détails dans [[08-NAVIGATION-TODO]] |
| Thème | **Sections restantes** | Science, Ritual, Témoignages, Presse, FAQ, Newsletter, Footer à vérifier/customiser. Détails dans [[04-THEME-SECTIONS-TODO]] |
| Conversion | **Forfait payant** | Pour vendre vraiment, convertir la dev store en Basic 1$/mois × 3 mois (promo Partners). Sinon mode test seulement |
| Photos | **Photo Lumière Pro à swapper** | Actuellement c'est la photo hero qui s'y trouve. Swap par le packshot multi-LED + télécommande |
| URL | **Renommer myshopify + domaine custom** | `3aff1g-y4` → `aurelia-paris.myshopify.com` (1 changement gratuit) + acheter `aurelia.paris` |

## 🎨 Photos générées (Nano Banana 2 / Gemini 2.5 Flash Image)

L'utilisateur a généré 6 photos AI éditoriales cohérentes, palette ivoire/or/rouge, style Vermeer × Aesop. Toutes téléchargées sur son PC dans le dossier Téléchargements (probablement nommées `Gemini_Generated_Image_xxxxx.png`).

Mapping :
1. **Hero** : femme profil + masque LED + lumière fenêtre + drap lin
2. **Signature** : packshot masque LED + cryo patches
3. **Lumière Pro** : packshot masque + LEDs multicolores + télécommande dorée
4. **Regard** : gros plan yeux fermés + dispositif ambré
5. **Décolleté** : cou + collier LED rouge
6. **Bundle** : flat lay 4 dispositifs sur drap lin

État upload :
- ✅ Hero : uploadé dans Theme Editor
- ✅ Signature : uploadé dans fiche produit
- ⚠️ **Lumière Pro : SWAP nécessaire** (a actuellement la photo Hero)
- ✅ Regard : uploadé
- ✅ Décolleté : uploadé
- ✅ Bundle : uploadé

## 🔗 Liens utiles

- Admin Shopify : https://admin.shopify.com/store/3aff1g-y4
- Front public : https://3aff1g-y4.myshopify.com
- Repo GitHub : https://github.com/martinbouvet2000-tech/Citation
- Dev Dashboard (où est le token atkn — pas utile pour Admin API) : https://dev.shopify.com/dashboard
- Forfaits : https://admin.shopify.com/store/3aff1g-y4/settings/plan
