---
title: "Historique des erreurs rencontrées"
tags: [erreurs, learnings, pieges, aurelia]
created: 2026-06-01
---

# 🐛 Historique des erreurs rencontrées

> Toutes les erreurs/blocages déjà rencontrés pendant l'installation, avec
> leur cause et leur résolution. **À lire avant de tenter une action
> similaire** — évite de répéter les mêmes erreurs.

## 🔴 Erreurs critiques (à éviter absolument)

### 1. Token Dev Dashboard `atkn_...` ≠ Token Admin API
- **Problème** : Le user a créé un "App Automation Token" via le Dev Dashboard
  (`https://dev.shopify.com/dashboard`). Format `atkn_...`. Pensait qu'il
  pourrait s'en servir pour appeler l'Admin REST API.
- **Cause** : Le token `atkn_` sert UNIQUEMENT à la **Partner API** (gestion
  des apps et déploiement continu), pas à l'**Admin API** (données de la
  boutique).
- **Symptôme** : HTTP 401 "Invalid API key or access token" sur tous les appels
  Admin API.
- **Résolution** : Abandonner l'automation API. Sur les nouvelles dev stores,
  l'ancien système "Custom Apps" qui donnait des tokens `shpat_...` n'est
  plus accessible. Faire le travail manuellement via l'admin Shopify, ou
  passer par Shopify CLI (qui utilise OAuth dans le navigateur).

### 2. Sandbox réseau Anthropic bloque les requêtes Shopify
- **Problème** : Depuis le conteneur cloud Claude, impossible de faire
  `curl https://*.myshopify.com/admin/api/...`. Réponse : "Host not in
  allowlist" HTTP 403.
- **Cause** : Sécurité du sandbox Anthropic, Shopify n'est pas whitelistée.
- **Symptôme** : Le script `install_shopify.py` se connecte au TCP/TLS mais
  reçoit un 403 niveau applicatif.
- **Résolution** : L'IA doit guider le user manuellement, OU le user lance
  le script sur son PC en local (où il n'y a pas de restriction).

### 3. Doublon produit Lumière Pro (failli arriver)
- **Problème** : Le user, en voulant changer l'image de Lumière Pro, est
  arrivé sur la page "Ajouter un produit" et a rempli tous les champs
  (titre, description, image, etc.) au lieu d'éditer la fiche existante.
- **Cause** : Confusion entre "modifier" et "créer". Le bouton "Ajouter un
  produit" dans l'admin Shopify mène à une création vide.
- **Symptôme** : Aurait créé un 2e produit "Lumière Pro" en doublon.
- **Résolution** : Cliquer "Annuler" avant Enregistrer. Toujours partir de
  la liste Produits et cliquer sur le produit existant pour le modifier.
- **À retenir** : Vérifier dans le tableau de bord avant de créer quoi que
  ce soit. Les 5 produits existent déjà.

### 4. Photo Hero uploadée par erreur sur la fiche Lumière Pro
- **Problème** : Lors de l'upload des photos AI Gemini, le user a mis la
  photo "femme profil + masque + fenêtre" sur la fiche produit Lumière Pro
  au lieu de l'utiliser comme image hero.
- **Cause** : Confusion entre l'ordre des photos téléchargées depuis Gemini.
- **Symptôme** : La fiche produit Pro affiche une photo lifestyle au lieu
  du packshot multi-LED. Le hero homepage reste vide.
- **Résolution** : 1. Supprimer la photo de la fiche Pro. 2. La mettre dans
  le Theme Editor → Hero. 3. Mettre le vrai packshot multi-LED sur la fiche Pro.
- **Statut actuel** : Hero ✅ fait, fiche Pro ❌ encore avec la mauvaise photo.

## 🟠 Erreurs UX et configuration

### 5. Code WELCOME10 mal initialisé avec mauvais type de réduction
- **Problème** : Premier essai du code WELCOME10 (avec "Réduction sur les
  produits" + "Produits spécifiques" pour Signature et Pro uniquement).
- **Cause** : Le user n'a pas suivi la spec (qui disait "Tous les produits").
- **Symptôme** : Le code n'aurait fonctionné que pour 2 produits sur 5.
- **Résolution** : Modifié vers "S'applique à : Tous les produits".

### 6. Code créé en double : "BIENVENUE10" puis "WELCOME10"
- **Problème** : Le traducteur Chrome auto traduit "WELCOME10" affiché en
  "BIENVENUE10" dans l'admin Shopify. Le user a cru que c'était un autre
  code et en a créé un nouveau.
- **Cause** : Extension de traduction Chrome activée sur l'admin Shopify.
- **Symptôme** : Doublon de code (BIENVENUE10 + WELCOME10 dans la liste).
- **Résolution** : Désactiver le traducteur Chrome sur admin Shopify
  (clic droit page → "Traduire en français" décoché). Le vrai code stocké
  est `WELCOME10`.

### 7. Section "Témoignages" avec faux avis activée par défaut
- **Problème** : Le thème inclut une section "Témoignages clientes" avec
  3 témoignages fictifs (noms inventés, citations marketing).
- **Cause** : Données placeholder du thème.
- **Symptôme** : Illégal en France (DGCCRF, amende possible 300 k€).
- **Résolution** : Désactiver la section dans le Theme Editor jusqu'à
  avoir de vrais avis (via Judge.me).

### 8. Bandeau "4,8/5 · 1 200 avis vérifiés" dans le hero
- **Problème** : Pareil que témoignages, faux nombre d'avis affiché par défaut.
- **Statut** : Le toggle "Afficher la note" est ENCORE activé. À désactiver.

### 9. Section "Presse" avec logos de magazines fictifs
- **Problème** : Bandeau "Présenté dans Vogue, ELLE, Marie Claire, Madame
  Figaro, Glamour" alors qu'aucune retombée réelle.
- **Cause** : Placeholder du thème.
- **Symptôme** : Tromperie commerciale.
- **Résolution** : Désactiver la section jusqu'à avoir de vraies parutions.

### 10. Bandeau promesse "Klarna/Alma 3× sans frais" sans Klarna/Alma activés
- **Problème** : Le bandeau de promesses sous le hero mentionne "Paiement
  3× sans frais via Klarna ou Alma", mais ces apps ne sont pas activées.
- **Cause** : Texte hardcodé dans `sections/promise-strip.liquid`.
- **Symptôme** : Promesse non tenue → mauvaise expérience client + risque légal.
- **Résolution** : Soit activer Alma (intégration Shopify), soit éditer le
  code du snippet pour retirer la mention.

## 🟡 Erreurs procédurales

### 11. PayPal pas disponible sur la dev store
- **Problème** : Le user voulait activer PayPal Express en plus de Shopify
  Payments. Pas trouvé dans la liste des fournisseurs.
- **Cause** : Sur les nouvelles dev stores Shopify, PayPal n'apparaît plus
  dans "Moyens de paiement supplémentaires" (intégré à Shopify Payments).
- **Résolution** : Abandonner pour MVP. Tester l'ajout après conversion en
  forfait payant.

### 12. Section "Aurelia Setup" créée dans Dev Dashboard au lieu de l'admin boutique
- **Problème** : Le user a créé une app dans `dev.shopify.com` (Partner
  Dashboard) au lieu de `admin.shopify.com/store/.../settings/apps`
  (custom app legacy).
- **Cause** : Shopify a déprécié les custom apps classiques sur les nouvelles
  dev stores. Le seul lien visible mène au Dev Dashboard.
- **Résolution** : L'app Dev Dashboard n'est PAS la bonne approche pour
  obtenir un Admin API token. Soit installer l'app sur la dev store via
  OAuth (complexe), soit abandonner et faire en manuel.

### 13. Tarifs de livraison par défaut Shopify (7,99 € / 65 € seuil) incohérents avec thème
- **Problème** : Shopify avait créé par défaut "Standard 7,99 € gratuit dès
  65 €" et "Express 10,99 €". Le thème dit "Livraison offerte dès 150 €".
- **Résolution** : Modifié en "Standard 4,90 € gratuit ≥ 150 €" + "Express 9,90 €".

### 14. Délais de livraison trop optimistes (3-5 j standard / 1-2 j express)
- **Problème** : Tarifs par défaut Shopify affichaient des délais courts
  alors qu'on fait du dropshipping intra-UE.
- **Cause** : Default Shopify pensé pour les boutiques avec stock local.
- **Résolution** : Ajusté en 5-10 j standard / 3-5 j express pour
  sous-promettre et éviter les déceptions.

## 🟢 Bugs cosmétiques

### 15. Hero affiche encore "La lumière, ce nouveau geste de beauté" après publication thème
- **Problème** : Le thème publié AURÉLIA contient encore les chaînes
  placeholder du nom de marque Lumière (l'ancien nom avant rebranding).
- **Cause** : Les `default` values dans `index.json` ou `settings_data.json`
  n'ont pas été mises à jour lors du rebranding.
- **Résolution** : Customiser manuellement via le Theme Editor (Hero
  section) avec les bons textes Aurélia.
- **Statut** : ✅ Corrigé (titre "La lumière, comme un rituel").

### 16. Aperçu d'import CSV produits aplati (sans HTML)
- **Problème** : L'aperçu de l'import CSV dans Shopify affiche les
  descriptions sans rendu HTML (titres collés, listes pas formatées).
- **Cause** : Shopify strip les balises HTML pour l'aperçu textuel uniquement.
- **Symptôme** : Inquiétant à la prévisualisation, mais le HTML est bien
  rendu sur la fiche produit après import.
- **Résolution** : Pas de souci, c'est cosmétique uniquement à l'aperçu.

## 📌 Patterns d'erreurs à anticiper

1. **Confusion modification vs création** : Le user a tendance à cliquer
   "Ajouter" alors qu'il faut "Modifier". Toujours vérifier "Tu es en train
   d'éditer une fiche existante ou de créer une nouvelle ?"

2. **Photos uploadées au mauvais endroit** : Lors d'upload d'images, le user
   peut se tromper de fichier (les fichiers Gemini ont tous des noms similaires
   `Gemini_Generated_Image_xxxxx.png`). Lui faire vérifier visuellement avant
   chaque upload.

3. **Extensions Chrome qui modifient l'affichage** : Le traducteur peut
   renommer des codes, des boutons, des champs. Toujours lui demander de
   désactiver la traduction sur l'admin Shopify.

4. **Sections placeholder du thème** : Toujours vérifier qu'on n'affiche pas
   d'avis fictifs, témoignages fictifs, logos presse fictifs. Désactiver
   par défaut tant que le contenu réel n'existe pas.

5. **Délais commerciaux trop courts** : Toujours sous-promettre (5-10 j vs
   3-5 j). Avis 1 ⭐ pour livraison en retard >> avis 5 ⭐ pour livraison
   en avance.

---

## Comment ajouter une nouvelle erreur

Si tu rencontres un nouveau bug ou blocage, ajoute-le ici avec le format :

```markdown
### [N°]. [Titre court de l'erreur]
- **Problème** : [description]
- **Cause** : [pourquoi ça s'est produit]
- **Symptôme** : [comment ça se manifeste]
- **Résolution** : [comment on a réglé]
- **Statut** : ✅ Résolu / ❌ En attente / ⏳ En cours
```
