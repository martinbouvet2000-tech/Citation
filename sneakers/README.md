# VÉLOCE v2 — Sneakers authentiques, pièces uniques

Boutique vitrine **photo-first** : chaque paire du stock = **1 photo réelle = 1 fiche**. DA claire et épurée (galerie), pensée pour la revente de pièces uniques Nike & Jordan.

> 🔗 https://martinbouvet2000-tech.github.io/Citation/sneakers/

## Principes (leçons de la v1)

- **1 photo = 1 paire = 1 fiche.** Le catalogue naît des photos du stock réel — aucune association automatique photo↔texte, donc aucune erreur de paire possible.
- **Rien à sélectionner** sur une fiche : une paire est unique, sa taille est affichée comme un fait.
- **Stockage local versionné** (`veloce2_*`) + nettoyage des anciennes clés : plus de bugs de cache fantôme. `?reset` dans l'URL purge les modifications locales.
- **Zéro dépendance** (hors Google Fonts), un fichier HTML + un fichier de données.

## Pour le client

Catalogue filtrable (modèle, taille, tri prix) → fiche (photo zoomable, taille, prix) → panier → **commande par email** pré-remplie (réponse 24h, paiement à l'expédition ou main propre). Pages légales (mentions, CGV, confidentialité, retours) incluses.

## Pour l'admin — étiqueter le stock (~10 min)

1. Pied de page → **« Gérer »** → code (`veloce2026`, modifiable via `PASS` dans `index.html`).
2. Chaque photo affiche des champs : **modèle** (pré-identifié), **coloris**, **taille**, **prix**, case **Vendue**.
3. Tout est sauvegardé localement en direct (aperçu immédiat, bannière « modifications locales »).
4. **⬇ Exporter** télécharge `products.js` → le publier (remplacer `sneakers/products.js` dans le repo, ou l'envoyer pour mise en ligne).

## Données (`products.js`)

```js
{ id:1, photo:'pair-01.jpg', name:'Nike Shox TL', cw:'Blanc', size:42.5, price:55, sold:false }
```
`sizes` (tableau) / `price` à `null` → « À confirmer » / « Sur demande ». `sold:true` → paire grisée, non commandable.

## Multi-tailles & promotions

Dans le mode gestion, chaque paire propose :
- **Tailles** : saisir une ou plusieurs tailles séparées par des virgules (ex. `42, 42.5, 44`).
- **Prix barré € (promo)** : renseigner l'ancien prix → il s'affiche **barré en rouge** + badge `-X%`.
