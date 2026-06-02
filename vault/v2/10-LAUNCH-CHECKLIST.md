---
title: "Checklist finale avant lancement"
tags: [launch, checklist, aurelia]
created: 2026-06-01
---

# 🚀 Checklist finale avant lancement réel

> À cocher dans l'ordre une fois TOUT le reste fait. Ce sont les derniers
> contrôles avant d'inviter les premiers vrais visiteurs.

## ✅ Vérifications visuelles (mode incognito Chrome)

### Homepage
- [ ] Hero s'affiche avec photo + texte Aurélia (pas de "Lumière")
- [ ] Bandeau promesses visible (4 colonnes : livraison, cliniquement testé, garantie, paiement)
- [ ] Produit vedette montre AURÉLIA Signature avec sa vraie photo
- [ ] Collection "La Gamme" affiche les 4 produits avec photos
- [ ] Comparateur des 4 masques avec photos correctes
- [ ] Sections Science, Ritual, FAQ, Newsletter, Footer affichées sans bug
- [ ] **PAS de témoignages fictifs** (section désactivée si pas de vrais avis)
- [ ] **PAS de logos presse fictifs** (section désactivée si pas de vraies parutions)
- [ ] **PAS de "4,8/5 · 1 200 avis"** (toggle désactivé partout)

### Navigation
- [ ] Menu header affiche : Accueil, La Gamme, Rituel Complet, Diagnostic, Journal, À propos
- [ ] Cliquer sur chaque item → la bonne page s'ouvre
- [ ] Footer affiche 4 colonnes (Maison, Aide, Légal, Suivez-nous)
- [ ] Tous les liens du footer fonctionnent (pas de 404)
- [ ] Le logo "AURÉLIA" en haut renvoie à la home

### Fiches produit
- [ ] Cliquer sur Signature → fiche complète avec :
  - Photo packshot
  - Prix 279 € + prix barré 349 €
  - Description HTML rendue (titres, listes)
  - Bouton "Ajouter au panier"
  - Wishlist (cœur) cliquable
- [ ] Idem pour Lumière Pro, Regard, Décolleté, Bundle
- [ ] **Lumière Pro affiche bien le packshot multi-LED**, pas la photo hero

### Pages
- [ ] /pages/a-propos affiche le manifesto + équipe
- [ ] /pages/cgv complet (avec SIRET réel)
- [ ] /pages/mentions-legales complet
- [ ] /pages/livraison-retours OK
- [ ] /pages/confidentialite OK (RGPD)
- [ ] /pages/faq affiche les 30 questions accordéon
- [ ] /pages/guide-utilisation timeline 8 semaines
- [ ] /pages/programme-fidelite Le Cercle Aurélia
- [ ] /pages/devenir-ambassadrice formulaire OK
- [ ] /pages/diagnostic quiz 7 questions fonctionne
- [ ] /pages/favoris (wishlist vide initialement)
- [ ] /pages/professionnels formulaire OK
- [ ] /pages/lexique 36 termes scrollables

### Blog
- [ ] /blogs/journal liste les 13 articles
- [ ] Cliquer sur un article → contenu HTML rendu (titres, listes, liens internes)

## ✅ Vérifications fonctionnelles

### Tunnel d'achat (test complet)
- [ ] Mode incognito → homepage
- [ ] Ajouter Signature au panier
- [ ] Tiroir panier s'ouvre, progress bar livraison gratuite visible
- [ ] Aller au checkout
- [ ] Remplir adresse fictive (`5 rue test, 75001 Paris`)
- [ ] Choisir Standard 4,90 € (ou gratuit si > 150 €) ou Express 9,90 €
- [ ] Appliquer code `WELCOME10` → -10 % apparaît
- [ ] Carte test : `4242 4242 4242 4242`, CVV `100`, date `12/30`
- [ ] Validation → page de confirmation "Merci pour votre commande"
- [ ] Email de confirmation arrive à l'adresse fictive
- [ ] Commande apparaît dans Admin → Commandes

### Tunnel d'achat — Bundle avec RITUEL15
- [ ] Ajouter Le Rituel Complet au panier
- [ ] Appliquer code `RITUEL15` → -15 % apparaît
- [ ] Vérifier que le total est correct

### Mobile
- [ ] Ouvrir sur smartphone OU mode responsive Chrome (F12 + icône téléphone)
- [ ] Menu burger fonctionne
- [ ] Hero responsive (photo et texte bien arrangés)
- [ ] Fiche produit lisible
- [ ] Sticky add-to-cart visible en bas
- [ ] Checkout fluide sur mobile

### Cookie banner RGPD
- [ ] S'affiche au 1er chargement en mode incognito
- [ ] Bouton "Refuser" visible et fonctionnel
- [ ] Choix sauvegardé (revisiter → banner ne réapparaît pas)
- [ ] Lien "Gérer mes cookies" dans le footer fonctionne

### Quiz diagnostic
- [ ] Aller sur /pages/diagnostic
- [ ] Cliquer "Commencer le diagnostic"
- [ ] Répondre aux 7 questions
- [ ] Skipper l'email
- [ ] Voir le résultat avec produit recommandé
- [ ] Bouton "Ajouter à mon panier" fonctionne

## ✅ Conformité légale (CRITIQUE)

- [ ] SIRET réel renseigné dans Mentions légales et CGV
- [ ] Aucun témoignage fictif visible
- [ ] Aucun logo presse fictif visible
- [ ] Aucun "X avis vérifiés" sans vrais avis (Judge.me / Loox)
- [ ] Cookie banner conforme CNIL (refus aussi facile qu'accepter)
- [ ] CGV mentionnent droit de rétractation 14 jours minimum (ici 30 jours)
- [ ] Mentions claires sur dispositifs CE médical classe IIa (et seulement si vraiment certifiés)
- [ ] Promesses "Klarna/Alma" cohérentes avec paiements activés

## ✅ Backend & encaissement

- [ ] Dev store convertie en forfait Basic ($1/mois × 3 mois)
- [ ] Shopify Payments en **mode réel** (plus de mode test)
- [ ] IBAN connecté et vérifié pour les versements
- [ ] Politique fiscale OK (TVA 20 % France si entreprise, exonération auto-entrepreneur si < 91 900 €)
- [ ] Emails transactionnels installés (4 templates Aurélia)
- [ ] Adresse email pro configurée (`contact@aurelia.paris` ou autre)

## ✅ SEO & analytics

- [ ] Google Search Console : ajouter et vérifier la propriété
- [ ] Soumettre le sitemap `https://aurelia.paris/sitemap.xml`
- [ ] Google Analytics 4 branché (conditionnel via event `aurelia:consent`)
- [ ] Meta Pixel branché (idem)
- [ ] Désindexer les pages techniques inutiles (politiques boutique en double, etc.)

## ✅ Marketing pré-lancement

- [ ] Compte Instagram @aurelia.paris créé + 1ère publication
- [ ] Compte TikTok @aurelia.paris créé
- [ ] Page Facebook (optionnel) créée
- [ ] Email pro `contact@aurelia.paris` actif
- [ ] Premier email teaser à la newsletter pré-launch

## 🎉 Si tout est coché

Tu peux retirer la mention "soft launch" et communiquer publiquement.
Mon avis : ne lance pas avec moins de **3 vraies photos packshot** (pas AI)
et **au moins 5 vrais avis clients** (offrir 3 produits à des amies en
échange d'avis honnêtes — légal si transparent dans la review).

## 📊 Métriques à surveiller la 1ère semaine

- Taux de conversion homepage → fiche produit (ciblé : 30 %)
- Taux d'ajout au panier (ciblé : 5 %)
- Taux de checkout abandonné (acceptable : 70-75 %)
- Taux d'utilisation code WELCOME10 (ciblé : 40 % des 1res commandes)
- Temps moyen sur le quiz diagnostic
- Bounce rate homepage (ciblé : < 60 %)

Outils gratuits pour ça : Shopify Analytics natif, Google Analytics 4,
Microsoft Clarity (heatmaps gratuit).
