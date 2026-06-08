# VÉLOCE — Plateforme vitrine chaussures de sport

Vitrine **premium** mono-page dédiée à la vente de chaussures de sport (running, fitness, football, basketball, tennis, lifestyle). Design dynamique et immersif inspiré des grandes enseignes sportives, pensé pour évoluer vers une boutique e-commerce complète.

> 🔗 En ligne : https://martinbouvet2000-tech.github.io/Citation/sneakers/

## Fonctionnalités

- **Hero plein écran** impactant avec animations, statistiques animées et visuel produit 3D-like.
- **Catégories de sport** (Running, Fitness, Football, Basketball, Tennis, Lifestyle) cliquables vers le catalogue filtré.
- **Nouveautés** et **best-sellers** mis en avant.
- **Catalogue complet** avec **filtres avancés** : recherche, sport, marque, technologie, couleur, taille, prix, et tri (popularité, nouveautés, prix, note).
- **Fiches produits détaillées** (modale) : visuel HD, description, caractéristiques techniques (poids, drop, techno), coloris, tailles disponibles (gestion stock), avis clients et notes.
- **Comparateur** de modèles (jusqu'à 3) avec tableau comparatif et mise en avant des meilleures valeurs.
- **Favoris** persistants (localStorage).
- **Guides d'achat** (running, pointure, entretien) en modale.
- **Newsletter** et **formulaire de contact** avec validation.
- **Réseaux sociaux** intégrés.
- **100% responsive** (mobile / tablette / ordinateur), animations fluides, mode `prefers-reduced-motion` respecté.

## Pile technique

- HTML / CSS / JavaScript **vanilla**, **zéro dépendance**, **un seul fichier** (`index.html`).
- Illustrations produits en **SVG paramétrique** (générées à la volée selon les coloris) — aucun asset externe, chargement instantané.
- Hébergement : **GitHub Pages**.

## Gérer le catalogue (facile)

Tout le catalogue vit dans **`sneakers/products.js`** — un fichier simple, un bloc par chaussure.

**Ajouter une paire :**
1. Déposez la/les photo(s) dans `sneakers/img/`.
2. Copiez le modèle commenté en haut de `products.js`, collez-le dans la liste et remplissez les champs.

Seuls `name`, `brand`, `sport` et `price` sont requis — tout le reste est optionnel :
- `photos: ['a.jpg','b.jpg']` → **galerie** de plusieurs photos sur la fiche produit (pub).
- `sizes: [40,41,42]` → tailles affichées au client ; `outSizes: [38]` → tailles barrées (rupture).
- `old`, `promo`, `tech`, `colors`, `weight`, `drop`, `rating`, `reviews`, `new`, `pop`, `desc`.

Les **filtres** (marque, sport, technologie, couleur) se mettent à jour **automatiquement** selon les produits présents.

## Mode admin (édition sur le site)

Un **mode admin** permet de modifier le catalogue directement depuis le site, sans toucher au code :

1. En bas de page, cliquez sur **« Admin »** et entrez le code (par défaut `veloce2026`, modifiable dans `index.html` → `ADMIN.pass`).
2. Une barre admin apparaît. Chaque paire affiche un bouton **✏️ Éditer** pour modifier :
   - **Nom**, **marque**, **sport**, **prix** (et ancien prix pour une promo),
   - **Photos** : en ajouter plusieurs (redimensionnées automatiquement) ; la 1ʳᵉ est la principale,
   - **Tailles disponibles** et **tailles en rupture** (barrées côté client),
   - technologie et description.
3. **➕ Ajouter** crée une nouvelle paire. **↺ Réinit.** revient au catalogue publié.

**Persistance :** les modifications sont enregistrées **sur votre appareil** (aperçu immédiat). Pour les rendre visibles par **tous les visiteurs**, cliquez sur **⬇️ Exporter** : un fichier `products.js` est téléchargé — il suffit de remplacer `sneakers/products.js` par ce fichier et de republier (ou de l'envoyer pour mise en ligne).

> Pour gérer **beaucoup** de paires avec **plusieurs photos chacune**, une base cloud (photos hébergées + édition connectée, visible par tous sans republier) est plus adaptée — évolution possible.

## Évolution e-commerce

L'architecture (catalogue en données structurées, panier, favoris, comparateur) est prête à être branchée sur un back-end e-commerce (paiement en ligne, gestion des stocks, suivi des commandes), par exemple via Shopify.
