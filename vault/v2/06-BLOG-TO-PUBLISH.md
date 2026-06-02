---
title: "13 articles blog à publier"
tags: [blog, seo, todo, aurelia]
created: 2026-06-01
---

# 📰 Blog "Journal" + 13 articles à publier

## Étape 1 : Créer le blog

1. Admin → **Boutique en ligne** → **Articles de blog**
   (URL : https://admin.shopify.com/store/3aff1g-y4/articles)
2. En haut à droite → **Gérer les blogs** → **Ajouter un blog**
3. Remplir :
   - **Titre du blog** : `Journal`
   - **Identifiant URL** (handle) : `journal`
   - **Modèle de blog** : `blog` (par défaut)
   - **Commentaires** : Désactivés (on est en luxe éditorial, pas un forum)
4. **Enregistrer**

## Étape 2 : Publier les 13 articles

Pour chaque article :
1. Admin → **Articles de blog** → **Ajouter un article**
2. Remplir titre, contenu HTML, méta, tags, image en vedette
3. Lier au blog **Journal**
4. Auteur : `Aurélia Marchand`
5. Date publication : étalées sur les 3 derniers mois (donne une impression
   de blog régulier — Shopify accepte les dates rétroactives)
6. Visibilité : Visible
7. **Enregistrer**

## Source du contenu

Repo GitHub `martinbouvet2000-tech/Citation`, fichier
`shopify-theme/BLOG-CONTENT.md` :
- https://github.com/martinbouvet2000-tech/Citation/blob/main/shopify-theme/BLOG-CONTENT.md

Le fichier contient pour chaque article :
- **Titre** (SEO 50-60 caractères)
- **Handle** (URL kebab-case)
- **Mot-clé cible** + volume Google France estimé
- **Méta description** (145-155 caractères)
- **Tags** (3-5)
- **Extrait** (2 phrases d'accroche)
- **Contenu HTML complet** (entre balises markdown ` ```html ... ``` `)

## Tableau des 13 articles

| # | Titre court | Handle | Volume recherche/mois |
|---|---|---|---|
| 1 | Masque LED : comment ça marche | `masque-led-comment-ca-marche` | 1 600 |
| 2 | Combien de temps pour les résultats | `combien-temps-resultats-masque-led` | 720 |
| 3 | Longueurs d'onde LED guide complet | `longueurs-onde-led-guide` | 3 680 |
| 4 | Masque LED grossesse & allaitement | `masque-led-grossesse` | 350 |
| 5 | Masque LED matin ou soir | `masque-led-matin-ou-soir` | 670 |
| 6 | LED vs cabinet esthétique | `masque-led-vs-cabinet-esthetique` | 420 |
| 7 | Acné hormonale adulte | `photo-therapie-acne-hormonale-adulte` | 1 200 |
| 8 | Masque LED pour homme | `masque-led-homme` | 380 |
| 9 | Entretenir son masque LED | `entretenir-masque-led-longevite` | 280 |
| 10 | 5 erreurs routine LED | `5-erreurs-routine-led` | 520 |
| 11 | Rosacée et photothérapie LED | `rosacee-photo-therapie-led` | 880 |
| 12 | Cernes pigmentaires/vasculaires/creux | `types-cernes-traitement-led` | 4 400 |
| 13 | Glow nuptial 90 jours | `glow-nuptial-90-jours` | 1 100 |

**Total volume SEO ciblé** : ~16 200 recherches/mois en France.

## ⚡ Méthode rapide

Au lieu de copier-coller 13 fois manuellement, plusieurs options :

### Option A — Manuel (40 min)
Ouvrir le fichier `BLOG-CONTENT.md` en local, et pour chaque bloc :
1. Copier le titre dans Shopify
2. Copier le contenu HTML (entre les ``` ```html``` ```) dans le champ Contenu (mode HTML)
3. Copier méta dans SEO
4. Coller les tags
5. Enregistrer

### Option B — App Matrixify (15 min)
1. Installer Matrixify (gratuit pour < 1 000 lignes) depuis le Shopify App Store
2. Préparer un fichier Excel/CSV au format Matrixify pour articles
3. Upload → import bulk → 13 articles créés d'un coup

### Option C — Script Python (10 min mais token requis)
- Le script `install_shopify.py` du repo fait ça (fonction `create_blog_and_articles`)
- Mais nécessite un VRAI token Admin API (voir [[03-CREDENTIALS-AND-ACCESS]])
- Pas faisable simplement avec `atkn_...` actuel

## Image en vedette par article

Si tu veux une image en vedette pour chaque article (recommandé pour le visuel
du blog), utilise une des 6 photos AI déjà générées en réutilisation, ou
génère des hero spécifiques par article via Gemini Nano Banana 2.

Pour MVP, l'image en vedette peut rester vide — le blog reste lisible mais
moins joli.

## Categories / Tags suggérés

Pour organiser le blog, utiliser ces tags transversaux :
- `guide` (articles explicatifs)
- `routine` (articles pratiques)
- `science` (articles techniques)
- `conseils` (articles d'avis)
- `mariage`, `homme`, `acné`, `rosacée`, `regard`, `décolleté` (thématiques)

Les visiteurs pourront filtrer par tag via `/blogs/journal/tagged/guide` etc.
