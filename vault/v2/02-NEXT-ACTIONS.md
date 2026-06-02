---
title: "Checklist priorisée — actions restantes"
tags: [todo, urgent, aurelia, v2]
created: 2026-06-01
priority: critical
---

# ✅ Checklist priorisée — Actions restantes

> Ordre optimal pour finir la boutique ce soir. Coche au fur et à mesure.

## 🔴 P0 — BLOQUANT (à faire impérativement)

### [ ] 1. Swap image Lumière Pro (2 min)
- Admin → Produits → cliquer **Masque LED AURÉLIA Lumière Pro**
- Section **Médias** → supprimer la photo actuelle (femme profil)
- Drag-drop la photo n°5 (packshot multi-LED + télécommande dorée)
- Enregistrer

### [ ] 2. Lier le produit dans la section "Produit vedette" du thème (1 min)
- Theme Editor → section **Produit vedette**
- Champ **Produit** → Sélectionner → **AURÉLIA Signature**
- Enregistrer

### [ ] 3. Lier la collection dans "Collection en vedette" (1 min)
- Theme Editor → section **Collection en vedette**
- Champ **Collection** → Sélectionner → **La Gamme**
- Enregistrer

### [ ] 4. Lier les 4 produits dans le Comparateur (4 min)
- Theme Editor → développer **Comparateur de masques**
- Clic sur chaque sous-élément **Masque** (1 à 4)
- Champ **Produit** → Sélectionner :
  - Masque 1 → Signature
  - Masque 2 → Lumière Pro
  - Masque 3 → Regard
  - Masque 4 → Décolleté
- Enregistrer

### [ ] 5. Désactiver les faux avis dans le Hero (30 sec)
- Theme Editor → section **Hero**
- Toggle **« Afficher la note »** → OFF
- Vérifier aussi dans les autres sections (Témoignages probable) qu'il n'y a pas de faux nombres
- Enregistrer

### [ ] 6. Créer les 14 pages (20 min)
- Voir [[05-PAGES-TO-CREATE]] pour la liste exacte avec handles et template_suffix
- Pour chaque page : Admin → Boutique en ligne → Pages → Ajouter une page
- Champ **Modèle** : sélectionner le bon template (ex. `page.cgv` pour CGV)
- Titre + handle URL → Enregistrer

### [ ] 7. Configurer le menu principal (5 min)
- Voir [[08-NAVIGATION-TODO]]
- Admin → Boutique en ligne → Navigation → menu Principal
- Ajouter : La Gamme · Diagnostic · Le Cercle Aurélia · Journal · À propos · FAQ

### [ ] 8. Configurer le menu Footer (5 min)
- Idem menu Principal pour les pages légales (CGV, RGPD, etc.)

## 🟠 P1 — IMPORTANT (faire le même soir)

### [ ] 9. Créer le blog "Journal" + publier les 13 articles (30 min)
- Voir [[06-BLOG-TO-PUBLISH]]
- Admin → Boutique en ligne → Articles de blog → Gérer les blogs
- Créer blog titre "Journal" handle `journal`
- Pour chaque article : copier le HTML depuis `shopify-theme/BLOG-CONTENT.md` du repo

### [ ] 10. Installer les 5 templates emails (10 min)
- Voir [[07-EMAILS-TO-INSTALL]]
- Admin → Paramètres → Notifications
- Pour chaque notification, coller le contenu du fichier `.liquid` correspondant

### [ ] 11. Configurer les politiques boutique (3 min)
- Voir [[09-POLICIES-TODO]]
- Admin → Paramètres → Politiques de la boutique
- Pointer vers les pages CGV, RGPD, livraison déjà créées

### [ ] 12. Finir les sections du thème (10 min)
- Voir [[04-THEME-SECTIONS-TODO]]
- Scroller toutes les sections : Science, Ritual, Témoignages, Presse, FAQ, Newsletter, Footer
- Vérifier le contenu, désactiver les éléments fictifs (avis, presse non réelle)

## 🟡 P2 — AVANT LANCEMENT RÉEL

### [ ] 13. Vérifier/retirer le bandeau Paiement 3× Klarna/Alma
- Soit activer Alma (Admin → Paiements → Ajouter)
- Soit éditer le code de la section `promise-strip.liquid` pour retirer la mention
- Sinon : promesse non tenue côté client = risque légal

### [ ] 14. Test d'achat complet de bout en bout
- Mode incognito sur https://3aff1g-y4.myshopify.com
- Parcours : homepage → fiche produit → ajout panier → checkout → paiement test (carte `4242 4242 4242 4242`, CVV `100`, date `12/30`)
- Vérifier que :
  - Le code WELCOME10 fonctionne
  - L'email de confirmation arrive
  - La commande apparaît dans Admin → Commandes

### [ ] 15. Convertir en forfait payant (si prêt à vendre vraiment)
- Admin → Paramètres → Forfait
- Choisir Basic à 1$/mois × 3 mois (promo Partners pour dev stores converties)
- → ouvre l'encaissement réel

## 🟢 P3 — APRÈS LANCEMENT (optimisation)

### [ ] 16. URL custom
- Renommer `3aff1g-y4` → `aurelia-paris` (1 fois gratuit dans Paramètres → Domaines)
- Acheter `aurelia.paris` ou `aurelia-paris.com` (10-15 €/an via Shopify ou OVH/Gandi)
- Connecter le domaine custom

### [ ] 17. App d'avis client
- Installer **Judge.me** (gratuit) ou **Loox** (payant, mais photos)
- Configurer les emails de demande d'avis post-achat
- Réactiver le bloc "Note" dans le Hero quand vrais avis arrivent

### [ ] 18. App newsletter pour l'email de bienvenue
- Installer **Klaviyo** ou **Omnisend** (gratuit jusqu'à 500 contacts)
- Brancher le formulaire newsletter du thème
- Importer le template `welcome_newsletter.liquid` du repo
- Workflow : nouveau subscriber → envoi welcome avec code WELCOME10

### [ ] 19. Sourcer le vrai fournisseur
- Trouver fournisseur intra-UE (Pays-Bas, Allemagne, Pologne, Espagne)
- Commander 1 exemplaire de chaque dispositif pour photographier (remplacer les images AI)
- Vérifier conformité CE médical classe IIa pour les claims

### [ ] 20. Brancher analytics
- Google Analytics 4 (conditionnellement via event `aurelia:consent` déjà émis par le cookie banner)
- Meta Pixel (idem)
- Hotjar (optionnel, voir le comportement utilisateur)

---

## 🎯 Workflow recommandé pour finir ce soir

```
1. Actions 1 à 5 (10 min) — quick wins thème
2. Action 6 (20 min) — créer toutes les pages
3. Actions 7 + 8 (10 min) — menus
4. Action 9 (30 min) — blog
5. Action 10 (10 min) — emails
6. Action 11 (3 min) — politiques
7. Action 14 (10 min) — test complet
```

**Total ~90 min** pour avoir une boutique vraiment finie (sauf forfait payant).

## ⏸ Si tu n'as pas le temps de tout faire

**Priorité absolue** : actions 1 à 8 + 11 + 14. Le reste peut attendre 1-2 jours.

Sans les pages (action 6), le footer aura des **liens 404** = très mauvais signal pour le visiteur et le SEO.

Sans les emails (action 10), les clients qui commandent reçoivent des emails Shopify génériques (pas grave si tu n'as pas encore de clients, à faire avant le 1er lancement marketing).

Sans le blog (action 9), pas de SEO long terme, mais ça n'empêche pas la vente.
