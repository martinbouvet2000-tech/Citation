---
title: "Politiques boutique à configurer"
tags: [policies, legal, todo, aurelia]
created: 2026-06-01
---

# ⚖️ Politiques boutique

> Shopify a une section dédiée "Politiques de la boutique" qui apparaît
> automatiquement au checkout et dans certains emails. À configurer pour
> être conforme légalement et pour que le checkout soit propre.

## Accès

Admin → **Paramètres** → **Politiques de la boutique**
URL directe : https://admin.shopify.com/store/3aff1g-y4/settings/legal

## Les 5 politiques à remplir

| Politique | Source contenu | Statut |
|---|---|---|
| Politique de remboursement | page `livraison-retours` | ⏳ À copier |
| Politique de confidentialité | page `confidentialite` | ⏳ À copier |
| Conditions de service | page `cgv` | ⏳ À copier |
| Politique d'expédition | page `livraison-retours` | ⏳ À copier |
| Mentions légales | page `mentions-legales` | ⏳ À copier |

## Procédure

Pour chaque politique :

### Option A — Coller le contenu HTML
1. Aller sur la page créée (ex. https://3aff1g-y4.myshopify.com/pages/cgv)
2. Faire Ctrl+U pour voir le source HTML
3. Copier le `<main>` ou `<article>` qui contient le contenu
4. Coller dans le champ "Conditions de service" dans Paramètres → Politiques

⚠️ Cette approche duplique le contenu (page + politique) → maintenir deux endroits
en cas de mise à jour.

### Option B — Pointer vers les pages (recommandée)
Shopify permet de mettre **uniquement un lien** vers la page existante :

Dans le champ de la politique, mettre par exemple pour les CGV :
```html
<p>Nos conditions générales de vente sont détaillées sur cette page :
<a href="/pages/cgv">https://aurelia.paris/pages/cgv</a></p>
```

Plus simple, source unique de vérité = la page Shopify créée.

### Option C — Générer via Shopify (pour démarrage rapide)
Au-dessus de chaque champ, Shopify propose un bouton **« Insérer un modèle
Shopify »** qui génère un texte type. C'est trop générique mais ça dépanne
si tu n'as pas le temps.

À remplacer ensuite par les vrais contenus des pages.

## ⚠️ Informations à compléter avant tout

Le thème et les pages contiennent des **placeholders** pour ces infos
légales obligatoires. Tu dois les remplir avec tes vraies données :

| Info | À remplir |
|---|---|
| **Raison sociale** | "Aurélia Paris" + forme juridique (SAS, EURL, auto-entrepreneur...) |
| **SIRET** | À obtenir via [autoentrepreneur.urssaf.fr](https://autoentrepreneur.urssaf.fr) si pas encore créé |
| **TVA intracom** | Pour les entreprises non micro |
| **Adresse siège** | Vraie adresse pro (peut être celle perso pour auto-entrepreneur) |
| **Email contact** | `contact@aurelia.paris` ou autre |
| **Email SAV** | `sav@aurelia.paris` |
| **Téléphone** | Optionnel mais recommandé |
| **Hébergeur** | Shopify Inc., 151 O'Connor Street, Ground floor, Ottawa, Ontario K2P 2L8, Canada |

## 🚨 Si tu n'as pas encore monté ta structure légale

**Tu ne peux pas vendre légalement en France sans SIRET.**
- Auto-entrepreneur (gratuit, SIRET sous 4 jours) : [autoentrepreneur.urssaf.fr](https://autoentrepreneur.urssaf.fr)
- SASU (200-500 €, plus de flexibilité) : Legalstart, Captain Contrat, Shine

En attendant : **garder la boutique en mode test** (pas convertir en forfait
payant). Tu peux faire la mise en page et l'éditorial, mais n'encaisser aucun
client tant que tu n'as pas ton statut.

## ✅ Vérification finale

Au moment du checkout (test ou réel), Shopify affiche en bas un lien :
"Politique de remboursement | Politique de confidentialité | Conditions de service"

Cliquer sur chacun → vérifier que ça affiche le bon contenu (pas une page vide
ou un placeholder).

## 📌 Cookie banner et consentement

Le thème Aurélia contient déjà un **cookie banner RGPD** (sections/cookie-banner.liquid)
avec 4 catégories cochables et bouton refus aussi visible qu'accepter.

C'est conforme CNIL. Vérifier qu'il s'affiche au premier chargement de la
boutique en mode incognito.

Si le banner ne s'affiche pas, vérifier que `consent-banner` est bien actif
dans le Theme Editor.
