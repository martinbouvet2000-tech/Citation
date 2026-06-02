---
title: "Credentials et accès"
tags: [credentials, access, security, aurelia]
created: 2026-06-01
priority: critical
---

# 🔐 Credentials et accès

## ⚠️ Sécurité — à lire avant tout

**Ne committe JAMAIS de token ou mot de passe dans ce vault ou dans Git.**
Le `.gitignore` du repo couvre `.env`, `*.token`, `credentials.json` — utilise
ces noms si tu dois stocker des secrets localement.

Le token Shopify partagé dans la conversation précédente (`atkn_98b162...`) doit
être révoqué dès que possible :
- https://dev.shopify.com/dashboard → Aurelia Setup → Paramètres → "Faire pivoter"

## Boutique Shopify

| Élément | Valeur |
|---|---|
| **URL admin** | https://admin.shopify.com/store/3aff1g-y4 |
| **Front public** | https://3aff1g-y4.myshopify.com |
| **Compte propriétaire** | martinbouvet2000@gmail.com |
| **Plan** | Development store (non payant) |
| **Mode paiement** | Test (Shopify Payments) |

## Token Admin API

### Statut actuel : ❌ PAS DE TOKEN VALIDE

Le token `atkn_...` créé via le **Dev Dashboard** est un "App Automation Token"
qui fonctionne **uniquement avec la Partner API**, pas avec l'Admin REST API
de la boutique.

### Pour obtenir un VRAI token Admin API

Sur les **nouvelles dev stores Shopify** (créées via Partners en 2024+),
l'ancien système "Custom Apps" classique a été remplacé par le Dev Dashboard.
Il n'est donc **plus possible** de créer simplement un token `shpat_...` via
l'admin de la boutique.

**Options pour automatiser quand même** :

1. **Shopify CLI** (recommandé)
   - Sur le PC du user : `npm i -g @shopify/cli @shopify/theme`
   - `shopify login --store 3aff1g-y4`
   - OAuth via navigateur (5 sec)
   - Ensuite : `shopify theme push`, `shopify theme dev`, etc.
   - Mais ne couvre que le thème, pas les pages/articles/codes

2. **App Matrixify** depuis le Shopify App Store
   - Import bulk via Excel/CSV pour produits, pages, articles, codes
   - Gratuit pour < 1 000 lignes
   - Pas besoin de token API

3. **App "Custom Distribution" via Dev Dashboard** (complexe)
   - Configurer l'app Aurelia Setup avec une URL OAuth de redirect
   - Installer l'app sur la dev store via le flow OAuth
   - Récupérer le token d'installation
   - Long et risqué

4. **Tout faire manuellement via l'admin** (simple, recommandé pour MVP)
   - Le user fait les clics, l'IA donne les instructions exactes
   - C'est ce qu'on a fait jusqu'à maintenant

## Repo GitHub

| Élément | Valeur |
|---|---|
| **URL** | https://github.com/martinbouvet2000-tech/Citation |
| **Branche de travail principale** | `claude/cryoglow-ecommerce-shop-mFjYb` |
| **Branche du thème actif sur Shopify** | aurelia-theme (version 1.0.0 publiée) |
| **Branche de ce vault** | `vault/aurelia-handoff-v2` |

## Comptes annexes

| Service | Compte | Statut |
|---|---|---|
| Google AI Studio (Nano Banana 2 / Gemini Flash Image) | compte Google personnel | Actif, gratuit |
| Caisse d'Épargne (IBAN versements Shopify Payments) | personnel | Connecté à Shopify |
| PayPal | ❌ pas activé | Possible alternative paiement |
| Klarna / Alma | ❌ pas activés | Mentionnés dans le bandeau promesse → incohérence |

## Note importante : Mode test Shopify Payments

Tant que la dev store n'est pas convertie en forfait payant :
- ✅ Le tunnel de checkout fonctionne
- ✅ Les "commandes" se créent dans l'admin
- ✅ Les emails de confirmation s'envoient
- ❌ **AUCUN argent réel n'est encaissé**
- ❌ Carte test obligatoire : `4242 4242 4242 4242` (Visa), CVV `100`, date future
- ❌ Vraies cartes refusées

Pour vendre vraiment : Admin → Paramètres → Forfait → choisir Basic 1$/mois × 3 mois.
