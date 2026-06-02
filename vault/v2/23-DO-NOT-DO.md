---
title: "DO NOT — Interdictions absolues"
tags: [interdictions, security, aurelia]
created: 2026-06-01
priority: critical
---

# 🚫 DO NOT — Interdictions absolues

> Tout ce qu'il faut **NE JAMAIS faire**. Tu as carte blanche sur le reste,
> mais ces 25 points sont des **lignes rouges**.

## 🔐 Sécurité

### 1. NE JAMAIS committer un token ou mot de passe
- Pas de `shpat_...`, `atkn_...`, `sk_...`, mots de passe, IBAN, etc.
- Si tu vois un secret partagé dans la conversation, **rappelle au user de
  le révoquer** après usage.
- Le `.gitignore` couvre `.env`, `*.token`, `credentials.json` — utilise ces
  noms pour stocker des secrets en local.

### 2. NE JAMAIS pousser du code sur main sans validation
- Toujours bosser sur une branche feature (`feat/...`, `vault/...`, etc.)
- Push direct sur `main` interdit
- Création de PR demandée explicitement par le user uniquement

### 3. NE JAMAIS exposer publiquement l'URL `3aff1g-y4.myshopify.com`
- Tant que la dev store est en mode test, ne pas la communiquer comme URL
  finale de la boutique
- Attendre le domaine custom `aurelia.paris` pour communiquer

## 🛍 Shopify — actions destructives

### 4. NE JAMAIS supprimer la collection "La Gamme"
- Liée à plusieurs sections du thème + au comparateur
- Supprimer = casser le hero, les fiches produits, le menu

### 5. NE JAMAIS renommer le handle d'un produit déjà créé
- Casse les URLs `/products/aurelia-signature` → 404
- Casse les codes promo qui ciblent ce handle (ex. RITUEL15 pour le bundle)
- Casse les liens internes du blog

### 6. NE JAMAIS supprimer un produit existant
- Vérifier dans l'admin AVANT de "créer" un produit
- Si doublon, garder l'original, supprimer le nouveau

### 7. NE JAMAIS désinstaller Shopify Payments
- Configuration IBAN + KYC liée, à refaire entièrement si désinstallé
- Pour l'instant en mode test, à convertir en réel quand prêt

### 8. NE JAMAIS modifier les codes WELCOME10 / RITUEL15 sans raison
- Ces codes sont mentionnés dans le thème (popup exit-intent, emails, hero)
- Modifier le nom = casser ces références

### 9. NE JAMAIS publier un thème non testé
- Toujours utiliser "Prévisualiser" avant "Publier"
- Le thème `aurelia-theme` actuel est la version stable

## 📜 Légal — interdictions strictes

### 10. NE JAMAIS afficher de faux avis clients
- Pas de "4,8/5 · 1 200 avis vérifiés" sans Judge.me ou Loox avec vrais avis
- DGCCRF amende 300 k€ + 2 ans de prison max
- Désactiver le toggle "Afficher la note" partout

### 11. NE JAMAIS afficher de faux témoignages
- Pas de "Marie, 32 ans, Paris : J'adore !" sans vraie cliente
- Même règle DGCCRF

### 12. NE JAMAIS afficher de faux logos de presse
- Pas de Vogue, ELLE, Marie Claire, Madame Figaro, Glamour sans vraies parutions
- Concurrence déloyale, illégal

### 13. NE JAMAIS prétendre que les masques sont CE médical classe IIa sans certification réelle
- Si le user n'a pas le certificat, retirer la mention
- Faire des claims médicaux non certifiés = illégal (DM, AFSSAPS)

### 14. NE JAMAIS faire de promesses non tenues
- Pas de "Paiement 3× Klarna" si Klarna pas activé
- Pas de "Livraison J+1" si dropshipping → 5-10 j réels

### 15. NE JAMAIS vendre sans SIRET
- Vente sans SIRET = travail dissimulé = pénal
- Tant que le user n'a pas son auto-entrepreneur, mode test uniquement

### 16. NE JAMAIS oublier le cookie banner RGPD
- Obligatoire en France/UE depuis 2018
- Le banner du thème AURÉLIA est conforme CNIL, ne pas le désactiver

## 🎨 Design — interdictions cohérence marque

### 17. NE JAMAIS introduire des couleurs hors palette
- Ivoire, crème, or, bordeaux, ink uniquement
- Pas de rose flashy, violet, vert pomme, bleu électrique
- Si une photo a une couleur dominante hors palette, la désaturer

### 18. NE JAMAIS utiliser une police autre que Cormorant Garamond + Inter
- Pas de Comic Sans (évident), pas de Roboto, pas de Arial
- Si une section a hardcodé une autre police, c'est un bug à signaler

### 19. NE JAMAIS écrire en majuscules criardes ("PROFITEZ !", "DERNIÈRE CHANCE")
- Aurélia c'est le quiet luxury, pas le black friday Wish
- Acceptable : eyebrow en caps avec letter-spacing (style éditorial)

### 20. NE JAMAIS utiliser le tutoiement dans le contenu publié
- Vouvoiement systématique côté front (fiche produit, blog, emails, etc.)
- Tutoiement OK uniquement entre Martin et toi en interne

### 21. NE JAMAIS mettre des emojis dans le contenu publié
- Pas de 🌟✨🎉 dans les fiches produit, articles, emails
- Acceptable : check ✓ très discret en SVG ponctuel

## 🤖 Communication avec le user

### 22. NE JAMAIS demander confirmation à chaque sous-étape
- Le user a donné le GO global, il veut avancer
- Si pas sûr sur une décision **stratégique**, demande
- Sur les détails (style, ordre, formatage), décide pour lui

### 23. NE JAMAIS justifier longuement chaque choix
- Phrases courtes, actions directes
- Le user veut "comment faire", pas "pourquoi je le fais comme ça"

### 24. NE JAMAIS dire "je ne peux pas piloter ton PC"
- Il le sait, il s'en souvient. Inutile de le rappeler à chaque message.
- Proposer la solution alternative directement (guide manuel ou script à lancer en local).

### 25. NE JAMAIS faire passer ton statut d'IA avant la mission
- Évite "en tant qu'IA, je ne peux pas..." — ça frustre le user
- Reste opérationnel, sois transparent uniquement si c'est utile pour
  débloquer la situation

---

## 🆘 Cas de doute

Si tu n'es pas sûr qu'une action soit autorisée, **ne pas la faire** et
demander au user :

> "Avant de faire X, je veux confirmer : c'est OK pour toi ? Parce que ça
> [risque/impact possible]."

Mais ne demande PAS pour les détails cosmétiques. Demande UNIQUEMENT pour :
- Actions destructives (suppression, modification de handle)
- Décisions business (prix, marketing, légal)
- Actions à risque légal (RGPD, DGCCRF, fiscal)
