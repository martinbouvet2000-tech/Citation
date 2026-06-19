# VÉLOCE — Sneakers authentiques, pièces uniques

Boutique vitrine **photo-first** : chaque paire du stock = **1 photo réelle = 1 fiche**. DA claire et épurée (galerie), pensée pour la revente de pièces uniques Nike & Jordan.

> 🔗 Lien public (à mettre en bio Insta) : **https://martinbouvet2000-tech.github.io/Citation/sneakers/**

## Nouveauté : le stock vit dans le cloud (Supabase)

Fini l'export `products.js` + republication à chaque modif. Le catalogue est maintenant une **base de données cloud (Supabase)** :

- **Côté visiteur** : le site charge instantanément le catalogue embarqué (repli), puis le **rafraîchit depuis le cloud**. Toute modif admin est donc visible par les acheteurs **en direct**, sans rien republier.
- **Côté admin** : les modifications (taille, prix, promo, photos, vendue, brouillon, suppression, ajout de paire) **s'enregistrent automatiquement dans le cloud**. Un indicateur « ✓ Synchronisé / ⏳ Enregistrement… » le confirme.
- **Repli hors-ligne** : si le cloud (ou le réseau) est injoignable, le site retombe automatiquement sur le catalogue embarqué `products.js` et le mode de gestion local. Le site n'est **jamais vide**.

### Détails techniques

- Projet Supabase `veloce-sneakers` — région `eu-west-3` (Paris), offre gratuite.
- Table `public.produits` : `id, name, cw, sizes (jsonb), price, old_price, sold, draft, photos (jsonb), sort`.
- **Lecture publique** protégée par RLS : seules les fiches `draft = false` sont servies aux visiteurs.
- **Écriture admin** via 4 fonctions RPC protégées par un **code de gestion** (`admin_list_all`, `admin_upsert`, `admin_new`, `admin_delete`). Le code n'est jamais stocké dans le navigateur d'un visiteur ; il est vérifié côté base.
- `products.js` n'est plus la source de vérité : c'est une **copie de secours** régénérée automatiquement (59 publiées, 6 brouillons).

## Pour le client

Catalogue filtrable (modèle, taille, tri prix) → fiche (photo zoomable, taille, prix, promo) → panier → **commande par email** pré-remplie (réponse 24h, paiement à l'expédition ou en main propre). Pages légales (mentions, CGV, confidentialité, retours) incluses.

## Pour l'admin — gérer le stock (depuis le téléphone)

1. Pied de page → **« Gérer »** → saisir le **code de gestion** (`veloce2026` par défaut).
2. Le mode gestion affiche **toutes** les fiches (catalogue + onglet **👻 Brouillons**). Chaque fiche a des champs : modèle, coloris, **tailles** (séparées par des virgules), **prix**, **prix barré € (promo)**, case **Vendue**.
3. **Tout est enregistré automatiquement dans le cloud** (indicateur « ✓ Synchronisé »). Plus aucun export à faire.
4. Boutons : **＋ Paire** (crée une nouvelle fiche en brouillon), **🗑 Retirer l'annonce**, **👻 Mettre en brouillon / ✓ Publier**, photos (ajouter / définir principale / supprimer), **⬇ Sauvegarde** (télécharge une copie `products.js` de secours — optionnel).

### Changer le code de gestion

Dans le SQL de Supabase :
```sql
update private.config set value = 'NOUVEAU_CODE' where key = 'admin_secret';
```

## Classement des paires (rang d'affichage)

En mode gestion, chaque fiche a un champ **Rang** (en haut) et un badge **« Rang N »** sur la photo :

- **1 = en tête** (montrée en premier au client), puis 2, 3, … Plus le nombre est grand, plus la paire descend.
- Mets tes plus belles paires en `1, 2, 3…` et les plus moyennes en numéros élevés → le client voit le meilleur d'abord, l'équilibre se fait en défilant.
- Le rang s'enregistre dans le cloud comme le reste ; la grille se réordonne dès que tu sors du champ. Le tri par prix (en haut du catalogue) reste prioritaire si le client l'active.

## Promotions

Renseigner le **prix barré €** d'une fiche → il s'affiche **barré en rouge** + badge `-X%` sur la vignette et la fiche.

## URL & partage

- **Aujourd'hui** : GitHub Pages → `https://martinbouvet2000-tech.github.io/Citation/sneakers/` (déjà en ligne, mis à jour à chaque merge sur `main`). Aperçu de lien soigné (image `img/og.jpg`).
- **Pour une URL plus courte** (type `veloce.vercel.app`) : importer le dépôt sur Vercel (le `vercel.json` à la racine sert déjà le dossier `sneakers/` à la racine du site — aucune config à faire).

## Données (`products.js`, repli)

```js
{ id:2, name:'Nike Dunk Low', cw:'Marron / Blanc', sizes:[44.5], price:60, oldPrice:null, sold:false, draft:false, photos:['pair-02.jpg'] }
```
`sizes` vide / `price` à `null` → « À confirmer » / « Sur demande ». `sold:true` → paire grisée, non commandable. `draft:true` → masquée du catalogue public.
