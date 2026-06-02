---
title: "🎯 MISSION CLAUDE — Brief autonome ultra-complet"
tags: [mission, claude, agent, urgent, aurelia, prompt]
created: 2026-06-01
priority: critical
type: prompt
---

# 🎯 MISSION CLAUDE — Brief autonome ultra-complet

> **À toi, Claude (ou autre IA) qui démarre une nouvelle session :**
> Ce document est ta mission complète. Lis-le en entier (10 min), puis exécute.
> Le user (Martin, martinbouvet2000@gmail.com) compte sur toi pour finir
> la boutique AURÉLIA Paris **jusqu'au bout, sans validation à chaque étape**.
> Il t'a donné autorité pleine — utilise-la avec discernement, fais les choix
> raisonnables sans demander confirmation, et avance.

---

## 1. CONTEXTE EN 60 SECONDES

**Projet** : AURÉLIA Paris — boutique e-commerce Shopify de masques LED de
luminothérapie premium (gamme de 4 dispositifs + 1 bundle).

**Stade** : Installation à **~70 %**. La boutique existe, est accessible
publiquement (`https://3aff1g-y4.myshopify.com`), avec produits, prix,
photos, codes promo, paiements (mode test) et livraison configurés.

**Manque** : 14 pages à créer, 13 articles blog à publier, 5 emails à coller,
quelques sections thème à finir, menus à configurer, politiques légales à
brancher. ~90 min de travail manuel.

**Contrainte** : pas de token Admin API valide. Le user a `atkn_...` du Dev
Dashboard qui ne fonctionne pas avec l'Admin REST API. Tout doit se faire
**manuellement via l'admin Shopify** — toi tu **guides le user** étape par
étape (lui clique).

**Voix marque** : éditorial parisien luxe discret, vouvoiement, palette
ivoire/or/bordeaux, Cormorant Garamond + Inter. Voir [[BRAND-CARD]] de v1.

**Style attendu de Claude** : direct, concis, instructions ultra-précises
(URLs cliquables, libellés exacts des boutons), zéro tergiversation. Le user
veut **finir ce soir**.

---

## 2. CE QUE TU DOIS FAIRE AUJOURD'HUI

Ta mission, dans cet ordre exact, sans dévier sauf urgence :

### Phase A — Quick wins thème (10 min)

1. Faire faire au user le **swap photo Lumière Pro** (Admin → Produits → Pro
   → Médias → supprimer photo actuelle → uploader photo n°5 packshot multi-LED)
2. Faire **lier le produit Signature** dans la section "Produit vedette" du
   Theme Editor
3. Faire **lier la collection La Gamme** dans la section "Collection en vedette"
4. Faire **lier les 4 produits** aux 4 sous-éléments "Masque" du Comparateur
5. Faire **désactiver le toggle "Afficher la note"** dans le Hero (faux 1 200 avis = illégal en France DGCCRF)

### Phase B — Création des 14 pages (20 min)

Pour chaque page de [[05-PAGES-TO-CREATE]], le user clique :
- Admin → Boutique en ligne → Pages → Ajouter une page
- Titre + handle + modèle (template_suffix)
- Laisser le contenu VIDE (le template du thème fournit tout)
- Section SEO : titre + méta description (fournies dans [[05-PAGES-TO-CREATE]])
- Enregistrer

Tu lui donnes les 14 lignes du tableau, il les passe l'une après l'autre.

⚠️ **Cas particulier** : le handle `le-rituel-complet` est utilisé par le
produit bundle ET la page landing. Faire créer la page avec handle `rituel`
pour éviter le conflit. Adapter le menu en conséquence.

### Phase C — Configuration des menus (10 min)

1. **Menu principal** : Accueil, La Gamme, Le Rituel Complet, Diagnostic, Journal, À propos (6 items max)
2. **Menu footer** : 4 colonnes (Maison, Aide & SAV, Légal, Suivez-nous) — voir [[08-NAVIGATION-TODO]] pour la structure exacte

### Phase D — Blog Journal + 13 articles (30 min)

1. Créer le blog `Journal` (handle `journal`)
2. Pour chaque article du tableau [[06-BLOG-TO-PUBLISH]], faire copier le HTML
   depuis `BLOG-CONTENT.md` du repo et coller dans Shopify
3. Auteur : Aurélia Marchand
4. Dates rétroactives étalées sur 3 mois pour donner l'air d'un blog actif

### Phase E — 5 emails transactionnels (10 min)

Pour chacun des 4 emails (welcome_newsletter ignoré pour MVP) :
- Admin → Paramètres → Notifications
- Cliquer la notif, "Modifier le code"
- Effacer tout, coller le HTML de `email-templates/*.liquid` du repo
- Enregistrer
- Test : envoyer un email de test

### Phase F — Politiques boutique (3 min)

Admin → Paramètres → Politiques de la boutique. Pour chaque champ :
- Mettre un lien vers la page correspondante (option recommandée, source unique)
- Ex CGV : `<p>Voir nos CGV complètes : <a href="/pages/cgv">aurelia.paris/pages/cgv</a></p>`

### Phase G — Sections thème restantes (10 min)

Faire scroller toutes les sections du Theme Editor :
- Science : valider ou désactiver
- Ritual : valider ou désactiver
- Témoignages : **DÉSACTIVER** (témoignages fictifs = illégal sans vrais avis)
- Presse : **DÉSACTIVER** (logos presse fictifs = illégal)
- FAQ : valider
- Newsletter : valider (sera branché à Klaviyo plus tard)
- Footer : vérifier que les liens pointent vers les pages créées

### Phase H — Test final complet (10 min)

Mode incognito → parcours complet :
1. Homepage charge sans erreur
2. Cliquer La Gamme → 4 produits avec photos
3. Cliquer Signature → fiche complète, ajout au panier
4. Code WELCOME10 → -10 % apparaît
5. Checkout avec carte test `4242 4242 4242 4242` CVV `100` date `12/30`
6. Email confirmation arrive
7. Commande visible dans Admin → Commandes

Si tout coche, mission accomplie pour aujourd'hui.

### Phase I — Bonus si temps restant

- Conversion forfait payant (Admin → Forfait → Basic 1$/mois × 3 mois)
- URL custom : renommer myshopify ou acheter `aurelia.paris`
- App Judge.me pour vrais avis
- App Klaviyo pour newsletter
- Configuration GA4 / Meta Pixel (conditionnel via event `aurelia:consent`)

---

## 3. RÈGLES D'ENGAGEMENT

### À FAIRE
- ✅ Avancer vite, en linéaire, dans l'ordre Phase A → I
- ✅ Donner les **instructions exactes** : URL cliquable + libellé bouton à cliquer
- ✅ Demander des **screenshots** quand un blocage technique
- ✅ Vérifier ton travail à la fin de chaque phase (test rapide)
- ✅ Mettre à jour [[01-CURRENT-STATE]] au fur et à mesure (commit régulier)
- ✅ Commit + push sur la branche `vault/aurelia-handoff-v2` à chaque
  jalon majeur pour traçabilité

### À ÉVITER
- ❌ Demander confirmation à chaque sous-étape ("tu veux qu'on continue ?")
  → l'utilisateur t'a donné le **GO global**, fonce
- ❌ Re-demander des infos déjà dans le vault ("c'est quoi le handle de la page X ?")
  → lis [[05-PAGES-TO-CREATE]]
- ❌ Faire des suggestions au-delà de la mission ("on pourrait aussi ajouter une
  feature de wishlist sociale...") → reste focus
- ❌ Recréer ce qui existe déjà (les 5 produits, codes promo, paiements,
  livraison sont FAITS — voir [[01-CURRENT-STATE]])
- ❌ Mentionner que c'est une IA qui parle ("en tant qu'IA, je ne peux pas...")
  → reste opérationnel, transparent uniquement si c'est utile

### Pièges techniques précis

1. **Token `atkn_...`** : ne sert à RIEN pour l'Admin REST API. Si tu veux
   automatiser, c'est Shopify CLI ou Matrixify. Sinon : guide manuel.

2. **Doublons produits** : avant de faire créer un produit, vérifier dans la
   liste qu'il n'existe pas déjà. Les 5 existent.

3. **Handle conflict** : `le-rituel-complet` utilisé 2× (produit bundle + page
   landing). Adapter la page en `rituel`.

4. **Traducteur Chrome auto** : peut afficher "BIENVENUE10" au lieu de
   "WELCOME10" dans l'admin. Le vrai code stocké est `WELCOME10`.

5. **Dev store** : tant qu'elle n'est pas convertie en forfait payant, mode
   test seulement. Carte test : `4242 4242 4242 4242`.

6. **Faux éléments** dans le thème (à ne JAMAIS laisser actifs) :
   - "4,8/5 · 1 200 avis vérifiés" → illégal sans Judge.me
   - Témoignages clientes fictifs → illégal
   - Logos presse fictifs (Vogue, ELLE, etc.) → illégal
   - Bandeau "Paiement 3× Klarna/Alma" → activer ou retirer

7. **Photos AI Gemini** : 5/6 uploadées. Lumière Pro a actuellement la photo
   du hero par erreur. À swapper.

---

## 4. RÉFÉRENCES À CONSULTER (dans l'ordre de priorité)

### Avant d'attaquer (5 min de lecture)

| Doc | Pourquoi |
|---|---|
| [[20-PERSONA-MARTIN]] | Comprendre l'utilisateur pour communiquer efficace |
| [[21-DECISIONS]] | Choix déjà faits — ne pas remettre en cause |
| [[22-HISTORIQUE-ERREURS]] | Erreurs déjà rencontrées — ne pas refaire |
| [[23-DO-NOT-DO]] | 25 interdictions absolues |
| [[24-GLOSSAIRE-SHOPIFY]] | Termes techniques si pas expert Shopify |

### Pour l'exécution (selon la phase en cours)

| Doc | Quand le lire |
|---|---|
| [[01-CURRENT-STATE]] | AVANT toute action, pour savoir ce qui existe déjà |
| [[02-NEXT-ACTIONS]] | Checklist priorisée P0→P3 |
| [[04-THEME-SECTIONS-TODO]] | Phase A et G |
| [[05-PAGES-TO-CREATE]] | Phase B |
| [[06-BLOG-TO-PUBLISH]] | Phase D |
| [[07-EMAILS-TO-INSTALL]] | Phase E |
| [[08-NAVIGATION-TODO]] | Phase C |
| [[09-POLICIES-TODO]] | Phase F |
| [[10-LAUNCH-CHECKLIST]] | Phase H (test final) |
| [[03-CREDENTIALS-AND-ACCESS]] | Pour les URLs et accès |
| [[../BRAND-CARD]] | Pour vérifier la voix de marque sur tout texte produit |
| [[../PRODUCT-CATALOG]] | Pour les détails produits |

Fichiers utiles dans le repo `martinbouvet2000-tech/Citation` :
- `shopify-theme/BLOG-CONTENT.md` — contenu HTML des 13 articles
- `shopify-theme/email-templates/*.liquid` — 5 templates emails
- `shopify-theme/PRODUCT-CONTENT.md` — descriptions produits longues
- `shopify-theme/PHOTO-PROMPTS.md` — prompts Nano Banana 2 si besoin photos

---

## 5. FORMAT DE COMMUNICATION ATTENDU

À chaque action que tu demandes au user, structure tes messages ainsi :

```
## [Phase X.Y] — [Nom de l'action]

→ [Action exacte avec URL clickable]
→ [Libellé exact du bouton à cliquer]
→ [Champ à remplir + valeur exacte à copier-coller]

Quand c'est fait, juste "OK" et j'enchaîne sur la suivante.
```

**Pas de longueur inutile**. Le user a déjà beaucoup de contexte, il veut des
**actions concrètes** rapides à exécuter.

À la fin de chaque phase majeure (A à I), faire un **mini-récap visuel** :

```
## ✅ Phase X terminée — Récap

- [✅] Action 1
- [✅] Action 2
- [✅] Action 3

Prochaine phase : [nom phase suivante]. On enchaîne ?
```

---

## 6. QUAND CONSIDÉRER LA MISSION FINIE

La mission est **terminée** quand TOUS ces critères sont remplis :

- [ ] Phase A à H complétées (Phase I = bonus)
- [ ] Test incognito : achat complet de bout en bout réussi
- [ ] Tous les liens du footer fonctionnent (pas de 404)
- [ ] Toutes les politiques boutique remplies
- [ ] Aucun élément fictif visible (avis, témoignages, presse)
- [ ] Tu as mis à jour [[01-CURRENT-STATE]] avec le nouvel état
- [ ] Tu as commit + push tes changements de doc sur la branche
  `vault/aurelia-handoff-v2`
- [ ] Tu as donné au user un **rapport final** récapitulant ce qui a été
  fait + ce qui reste pour le vrai lancement commercial (forfait payant,
  domain custom, etc.)

---

## 7. MOT DE LA FIN

Le user (Martin) est passionné par son projet mais a galéré sur Shopify.
Beaucoup de méandres techniques (mauvais token, doublons, swaps photos,
sections en double, traductions Chrome qui modifient les noms de codes).

**Sois patient, sois rapide, sois précis.**

Tu n'es pas là pour philosopher sur le e-commerce. Tu es là pour faire en
sorte que cette boutique soit LIVE et **vendable** ce soir.

Si tu hésites sur un choix design ou business — fais le choix qui rapproche
le plus du lancement, pas celui qui ouvre une discussion.

**Tu as carte blanche sur les détails. Va au bout.**

---

## 8. RAPPORT FINAL ATTENDU

Quand tu auras fini, livre au user un message structuré :

```
🎉 AURÉLIA Paris est LIVE.

✅ Ce que j'ai fait dans cette session :
- [liste détaillée]

📊 État final de la boutique :
- 5 produits actifs avec photos
- Collection La Gamme avec 4 produits
- [14] pages publiées (lien)
- Blog Journal avec [13] articles
- [4] emails transactionnels installés
- Codes WELCOME10 + RITUEL15 actifs
- Paiements Shopify Payments (test ou réel selon)
- Livraison France configurée
- Menus header + footer complets
- Cookie banner RGPD actif

🌐 URLs publiques :
- https://3aff1g-y4.myshopify.com
- https://3aff1g-y4.myshopify.com/collections/la-gamme
- https://3aff1g-y4.myshopify.com/blogs/journal
- [autres URLs clés]

🚨 Ce qu'il reste pour le vrai lancement commercial :
1. Convertir la dev store en forfait Basic (1$/mois × 3 mois)
2. Compléter mentions légales avec vrai SIRET (créer auto-entrepreneur si pas fait)
3. Acheter le domaine custom aurelia.paris (~10€/an)
4. Commander 1 exemplaire chez fournisseur intra-UE pour photos packshot réelles
5. Brancher Judge.me pour les vrais avis (et réactiver la note dans le hero)
6. Brancher Klaviyo pour le welcome email + newsletter
7. Premières communications Instagram/TikTok (créer comptes @aurelia.paris)

📅 Quand tu pourras vendre vraiment : sous 1 semaine si tu enchaînes ces 7 points.

Bon lancement, Martin.
```

---

**FIN DU BRIEF. Maintenant, mets-toi au boulot.**

Première action recommandée : envoyer un message au user dans le style :

> Salut Martin, j'ai lu ton vault v2 — je sais où on en est sur Aurélia.
> Tu étais en train de finir le Comparateur de masques du Theme Editor.
> On enchaîne : je te guide sur les 5 quick wins thème (Phase A), ça prend
> 10 min, puis on attaque les 14 pages. Tu es prêt ?

Et ATTAQUE.
