---
title: "🚨 LIS-MOI EN PREMIER — Handoff Aurélia v2"
tags: [handoff, urgent, aurelia, v2]
created: 2026-06-01
priority: critical
---

# 🚨 LIS-MOI EN PREMIER

## Si tu ouvres ce vault dans une nouvelle session Claude

Tu reprends la boutique **AURÉLIA Paris** (masques LED luminothérapie premium)
en plein milieu de l'installation Shopify. Beaucoup est déjà fait — il reste
~1 h de travail pour finaliser.

**Avant de coder ou cliquer quoi que ce soit, lis dans cet ordre :**

1. [[01-CURRENT-STATE]] — ce qui est **déjà fait** dans Shopify (ne pas refaire !)
2. [[02-NEXT-ACTIONS]] — checklist priorisée de ce qui reste à faire
3. [[03-CREDENTIALS-AND-ACCESS]] — comment accéder à Shopify
4. Selon ta tâche, lis le doc spécifique :
   - Customiser le thème → [[04-THEME-SECTIONS-TODO]]
   - Créer les pages → [[05-PAGES-TO-CREATE]]
   - Publier le blog → [[06-BLOG-TO-PUBLISH]]
   - Installer les emails → [[07-EMAILS-TO-INSTALL]]
   - Configurer le menu/footer → [[08-NAVIGATION-TODO]]
   - Compléter les politiques → [[09-POLICIES-TODO]]

## 🔑 Info clé

- **Boutique** : `3aff1g-y4.myshopify.com`
- **Admin URL** : `https://admin.shopify.com/store/3aff1g-y4`
- **Front public** : `https://3aff1g-y4.myshopify.com` (LIVE, mot de passe retiré)
- **Mode paiement** : Shopify Payments en **MODE TEST** (pas de vrais paiements possibles tant que pas converti en forfait payant)
- **Statut** : Dev store, doit être convertie en forfait Basic 1$/mois × 3 mois pour vendre réellement

## 🎯 Mission

Finir la boutique pour qu'elle soit **vraiment vendable** :
- Customiser les sections du thème restantes
- Créer les 14 pages (CGV, FAQ, etc.)
- Publier les 13 articles blog
- Installer les 5 emails transactionnels
- Configurer le menu de navigation
- Pointer les politiques boutique vers les pages créées

## ⚠️ Pièges à éviter (erreurs déjà rencontrées)

1. **Le token `atkn_...` du Dev Dashboard ne fonctionne PAS** pour l'Admin REST API. Il sert uniquement à la Partner API. Pour l'Admin API, il faut un token `shpat_...` qui n'est plus créable via le Dev Dashboard sur les nouvelles dev stores. → **Faire le travail manuellement via l'admin Shopify, OU passer par Shopify CLI**.

2. **Ne JAMAIS dupliquer un produit** — vérifier dans la liste produits avant de "Créer un nouveau produit". Les 5 produits existent déjà.

3. **Les "1 200 avis vérifiés" du thème sont FAUX** — c'est illégal en France (DGCCRF). Désactiver le toggle "Afficher la note" tant qu'il n'y a pas de vrais avis (via Judge.me ou Loox).

4. **Le bandeau "Paiement 3× sans frais Klarna/Alma"** mentionne des passerelles non activées — promesse non tenue. Soit activer Alma, soit retirer la mention.

5. **Lumière Pro a actuellement la photo du HERO** au lieu du packshot multi-LED. À swapper.

## 📁 Structure du vault

```
vault/v2/
├── 00-START-HERE.md           ← tu es ici
├── 01-CURRENT-STATE.md        ← état actuel précis de la boutique
├── 02-NEXT-ACTIONS.md         ← checklist priorisée
├── 03-CREDENTIALS-AND-ACCESS.md ← URLs et accès
├── 04-THEME-SECTIONS-TODO.md  ← textes pour finir les sections thème
├── 05-PAGES-TO-CREATE.md      ← 14 pages avec titres + handles + templates
├── 06-BLOG-TO-PUBLISH.md      ← 13 articles à publier
├── 07-EMAILS-TO-INSTALL.md    ← 5 emails transactionnels
├── 08-NAVIGATION-TODO.md      ← menu header + footer
├── 09-POLICIES-TODO.md        ← politiques boutique
└── 10-LAUNCH-CHECKLIST.md     ← derniers contrôles avant lancement
```

Anciens docs (référence) dans `vault/` : `BRAND-CARD.md`, `PRODUCT-CATALOG.md`,
`CONTENT-INDEX.md`, `SHOPIFY-RUNBOOK.md` — toujours valides comme référence
de marque et de catalogue.

## 🤝 Si tu es Claude dans une nouvelle session

Présente-toi à l'utilisateur, dis-lui :

> Salut Martin — j'ai lu ton vault v2, je sais où on en est sur Aurélia.
> On était bloqué sur [X dernière chose en cours]. On enchaîne sur [Y] qui est
> la prochaine priorité, c'est OK pour toi ?

Et ATTAQUE. Le user veut **finir ce soir**, donc pas de re-validation à chaque étape.
