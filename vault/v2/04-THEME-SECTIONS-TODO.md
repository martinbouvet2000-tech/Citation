---
title: "Sections du thème à finir de customiser"
tags: [theme, todo, aurelia]
created: 2026-06-01
---

# 🎨 Sections du thème — État et actions

## ✅ Déjà fait

### Hero
- ✅ Suréverbe : `Maison Aurélia · Paris`
- ✅ Titre : `La lumière, comme un rituel.` (avec "comme un rituel" en italique)
- ✅ Accroche : "Aurélia conçoit à Paris des masques LED..."
- ✅ CTA principal : "Découvrir la gamme" → `/collections/la-gamme`
- ✅ CTA secondaire : "Trouver mon Aurélia" → `/pages/diagnostic`
- ✅ Image : photo profil + masque + fenêtre (Gemini AI)
- ⚠️ **À DÉSACTIVER** : toggle "Afficher la note" (faux 4,8/5 · 1 200 avis)

### Bandeau promesses
- ✅ 4 promesses hardcodées : Livraison offerte, Cliniquement testé, Garantie 2 ans, Paiement 3×
- ⚠️ La mention "Klarna ou Alma" ne correspond pas aux paiements activés (à éditer le code de `sections/promise-strip.liquid` ou activer Alma)

## ⏳ En cours / à finir

### Produit vedette
- ⏳ **Lier le produit** : champ "Produit" → Sélectionner → AURÉLIA Signature
- Une fois lié, l'image et le CTA se synchronisent automatiquement
- Tous les textes sont déjà bons (best-seller, édition Paris, 4 caractéristiques)

### Collection en vedette
- ⏳ **Lier la collection** : champ "Collection" → Sélectionner → La Gamme
- Tous les textes sont déjà bons ("Quatre masques, un rituel")

### Comparateur de masques
- ⏳ **Lier les 4 produits** (sous-éléments Masque 1 à 4) :
  - Masque 1 → AURÉLIA Signature
  - Masque 2 → AURÉLIA Lumière Pro
  - Masque 3 → AURÉLIA Regard
  - Masque 4 → AURÉLIA Décolleté
- La data du tableau (zones, longueurs d'onde, durée, prix) est déjà hardcodée

## ❌ Pas encore vérifié

### Science (la photothérapie expliquée)
- Section avec schéma + explication des 5 couches de peau et longueurs d'onde
- À vérifier en ouvrant la section dans le Theme Editor
- Contenu probable hardcodé dans `sections/science.liquid`
- Action : juste valider le rendu

### Le Rituel (4 étapes)
- 1. Nettoyer · 2. Sécher · 3. Allumer · 4. Apprécier (12 min)
- Hardcodé dans `sections/ritual.liquid`
- Vérifier le rendu

### Témoignages
- Section avec 3-4 témoignages clientes fictifs
- ⚠️ **PROBLÈME LÉGAL** : témoignages fictifs = trompeur en France
- Action : soit désactiver la section, soit la masquer en attendant les vrais avis,
  soit changer le wording pour "Voici ce qu'on aimerait pouvoir vous montrer"
  (peu probable...)
- Recommandation : **désactiver la section** dans le Theme Editor jusqu'à avoir
  de vrais avis

### Presse (bandeau retombées)
- Logos placeholder : Vogue, ELLE, Marie Claire, Madame Figaro, Glamour
- ⚠️ **PROBLÈME LÉGAL** : si pas de vraies retombées, c'est trompeur
- Action : **désactiver la section** jusqu'à avoir de vraies parutions
- Ou la garder vide (sans logos) avec un message "Bientôt dans..."

### FAQ
- 5 questions principales sur la homepage
- Probablement hardcodée
- Vérifier le rendu — devrait être OK

### Newsletter
- Formulaire d'inscription dans la home + footer
- À vérifier que ça envoie bien à un endroit (Shopify Email ou app type Klaviyo)
- Pour MVP : Shopify Email natif suffit

### Footer
- Sections : Liens utiles, Mentions, Réseaux sociaux, Paiements
- ⚠️ Le menu actuel pointe probablement vers des pages **qui n'existent pas encore** (FAQ, CGV, etc.)
- Action : **créer les pages D'ABORD** (voir [[05-PAGES-TO-CREATE]]),
  puis vérifier que les liens du footer sont corrects
- Réseaux sociaux : ajouter les vrais comptes Aurélia (Instagram, TikTok) — soit créer maintenant, soit cacher en attendant

## 📌 Workflow recommandé

1. **Faire les 3 lien-produit/collection** (Produit vedette, Collection vedette, Comparateur) — 5 min
2. **Désactiver les faux contenus** : toggle avis Hero, section Témoignages, section Presse — 3 min
3. **Créer les 14 pages** (cf. [[05-PAGES-TO-CREATE]]) — 20 min
4. **Revenir au Theme Editor**, scroller jusqu'au Footer, vérifier que tous les liens fonctionnent — 5 min
5. **Configurer le menu** (cf. [[08-NAVIGATION-TODO]]) — 5 min

## 🎯 Sections par ordre d'apparition sur la home

Ordre attendu (selon le thème) :
1. Barre d'annonce (haut)
2. Header (avec menu)
3. Hero ✅
4. Bandeau promesses ✅
5. Produit vedette ⏳
6. Collection en vedette ⏳
7. Comparateur de masques ⏳
8. Science ❌
9. Ritual ❌
10. Témoignages ❌ (à désactiver)
11. Presse ❌ (à désactiver)
12. FAQ ❌
13. Newsletter ❌
14. Footer ❌

## 💡 Bonus — éditer un texte hardcodé

Si un texte est dans le code du thème (pas modifiable via Theme Editor), il
faut éditer le fichier Liquid correspondant via :
- **Admin → Boutique en ligne → Thèmes → ⋯ → Modifier le code**
- Ou en local : modifier le fichier dans le repo `shopify-theme/sections/*.liquid`
  puis redéployer le thème (ré-upload zip)

Pour MVP : éviter de toucher au code, customiser uniquement via Theme Editor.
