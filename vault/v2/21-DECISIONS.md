---
title: "Décisions déjà prises — ADR simplifiés"
tags: [decisions, adr, aurelia]
created: 2026-06-01
---

# 🧠 Décisions déjà prises

> Tous les choix structurants qui ont été faits. **Ne pas remettre en cause**
> sauf si Martin demande explicitement. Sinon on perd 30 min à rediscuter
> chaque décision.

## Identité de marque

### Nom : AURÉLIA Paris
- **Choisi** parce que évoque le latin *aurum* (or, lumière dorée), élégant
- **Validé** par Martin
- **Storytelling** : fondée par Aurélia Marchand, ex-consultante Estée Lauder,
  Paris 2024. Inventé mais cohérent.
- **Ne pas suggérer** de renommer

### Palette
- Ivoire #FAF6F1 / crème #F5EDE4 / or #C9A96E / bordeaux #6B2336 / ink #1A1410
- **Choisie** pour éviter le rose/violet beauté générique et incarner le
  "quiet luxury parisien"
- **Cohérente** avec le positionnement (Hermès × Aesop × Diptyque)

### Typographie
- **Titres** : Cormorant Garamond (serif, italique sur les emphases)
- **Texte** : Inter (sans, light 300 sur body)
- **Choisies** pour rappeler les codes éditoriaux luxe

### Voix
- Vouvoiement systématique
- Pas d'emojis publiquement
- Mots-clés : "rituel", "lumière", "patience", "trésor"
- Mots interdits : "magique", "miracle", "révolutionnaire", "PROFITEZ"

## Catalogue produits

### Gamme : 4 produits + 1 bundle
| Produit | Prix | Pourquoi |
|---|---|---|
| Signature | 279 € | Best-seller, point d'entrée milieu de gamme |
| Lumière Pro | 379 € | Upsell, pour les peaux exigeantes |
| Regard | 129 € | Produit d'appel, idéal cadeau |
| Décolleté | 199 € | Niche, peu de concurrence |
| Le Rituel Complet | 515 € | Bundle pour économiser 92 € + livraison express |

### Codes promo
- **WELCOME10** : -10 % sur 1re commande, **1 utilisation par client**, non cumulable
- **RITUEL15** : -15 % sur bundle uniquement, non cumulable avec WELCOME10
- **Choix non cumul** : éviter -25 % sur 515 € = -129 € de marge perdue

### Inventaire
- **Suivi désactivé** sur le bundle (dropshipping prévu)
- **Suivi activé** sur les 4 produits avec stocks fictifs (30, 40, 50, 80)
- Quand Martin aura un vrai fournisseur, à reconfigurer

## Architecture technique

### Plateforme : Shopify
- **Choisie** pour rapidité de mise en route, qualité du checkout, écosystème apps
- Alternative Woocommerce/Wix rejetée (trop de bricolage)

### Dev store puis forfait Basic
- Démarrage en dev store gratuite pour configurer sans pression
- À convertir en Basic 1$/mois × 3 mois (promo Partners) pour vendre
- Ensuite Basic régulier ~32 €/mois

### Thème : custom Aurélia
- Développé from scratch dans le repo `martinbouvet2000-tech/Citation`
- 75 fichiers (sections, snippets, templates, assets)
- Plus complet que les thèmes gratuits Shopify
- Features avancées : quiz diagnostic, wishlist, cookie banner RGPD, popup
  exit-intent, sticky ATC mobile, progress bar livraison gratuite, etc.

### URLs
- Provisoire : `3aff1g-y4.myshopify.com` (auto-généré Shopify)
- À renommer en : `aurelia-paris.myshopify.com` (1 changement gratuit)
- À acheter : domaine `aurelia.paris` (10-15 €/an)

### Paiements
- **Shopify Payments** activé en mode test (gère CB, Apple Pay, Google Pay,
  Shop Pay automatiquement)
- **PayPal** : essayé d'activer mais pas dispo sur cette dev store
- **Stripe** : redondant avec Shopify Payments, non activé
- **Klarna/Alma** : mentionnés dans le bandeau promesse mais pas activés
  → incohérence à corriger (soit activer, soit retirer du bandeau)

### Livraison
- **Standard France** : 4,90 € (gratuit ≥ 150 €), 5-10 jours ouvrables
- **Express France** : 9,90 €, 3-5 jours ouvrables
- **Délais ajustés** pour dropshipping intra-UE (sous-promettre)
- **UE et International** : zones créées mais pays pas activés dans un Marché
- **Choix** : commencer par France uniquement, étendre après les 1res ventes

### Politique retour
- **30 jours** retour gratuit (au-dessus du minimum légal 14 jours)
- **Garantie 2 ans** sur tous les dispositifs (CE médical classe IIa)
- **Choix** : sur-promettre la garantie pour rassurer face à des produits chers

## Sourcing et logistique

### Modèle : dropshipping intra-UE
- Martin **n'a pas de stock physique** et ne veut pas en avoir
- Plan : trouver un fournisseur Pays-Bas / Allemagne / Pologne / Espagne
- **Évite** les douanes/TVA pour les clients européens (vs Chine)
- **Délais réalistes** : 5-10 jours standard, 3-5 jours express

### Photos produit : AI génération
- Pas de stock = pas de photo packshot réel possible
- **Choix** : générer via Nano Banana 2 (Gemini 2.5 Flash Image, gratuit)
- 6 photos cohérentes (palette ivoire/or/rouge, style Vermeer × Aesop)
- À remplacer par vraies photos quand fournisseur trouvé

## Conformité légale

### RGPD
- **Cookie banner CNIL-compliant** intégré au thème
- 4 catégories cochables (essentiel, audience, marketing, perso)
- Bouton refus aussi visible qu'accepter

### Avis clients
- **Faux avis interdits** en France (DGCCRF)
- **Décision** : désactiver le bloc "Avis 4,8/5 · 1 200 clients vérifiés"
  jusqu'à avoir des vrais avis (via Judge.me ou Loox)

### SIRET
- Martin doit créer son auto-entrepreneur sur autoentrepreneur.urssaf.fr
- Sans SIRET, vente illégale en France
- **Décision** : MVP en mode test pour ne pas vendre tant que pas réglo

## Marketing

### Programme fidélité : Le Cercle Aurélia
- 3 paliers (Initiée 0-300 €, Confidente 300-800 €, Maison 800 €+)
- Avantages croissants : remises, accès anticipé, séances diagnostic visio
- **À brancher** sur une app (Smile.io ou LoyaltyLion) — pas fait pour MVP

### Programme ambassadrices
- Pour micro-influenceuses 1 000+ followers engagées
- 15 % commission, codes promo personnalisés, masques offerts
- **Formulaire** créé dans le thème (page `/pages/devenir-ambassadrice`)

### Newsletter
- **Code de bienvenue WELCOME10** dans l'email de bienvenue
- À brancher sur Klaviyo ou Omnisend
- Promesse : 1 email/mois max, jamais de spam

## Stack apps Shopify recommandées (à installer plus tard)

| App | Pourquoi | Quand |
|---|---|---|
| Judge.me | Vrais avis clients gratuit | Dès les 1res commandes |
| Klaviyo | Newsletter + automation email | Avant le lancement marketing |
| Smile.io | Programme fidélité Cercle Aurélia | Quand 100+ clients |
| Loox | Avis avec photos (payant 10$/mois) | Si Judge.me suffit pas |

---

## Comment ajouter une nouvelle décision

Si tu prends une nouvelle décision structurante avec Martin, ajoute-la ici
avec le format :

```markdown
### [Nom de la décision]
- **Choisi** : [option retenue]
- **Pourquoi** : [raison principale]
- **Alternatives rejetées** : [autres options et pourquoi pas]
- **Date** : [quand décidé]
```
