---
title: "🏛 Vault v2 — Index AURÉLIA"
aliases: [Index v2, MOC v2]
tags: [aurelia, moc, v2]
created: 2026-06-01
type: hub
---

# 🏛 Vault v2 — AURÉLIA

Documentation à jour de la boutique **AURÉLIA Paris** (1er juin 2026).
Snapshot après ~6 heures de travail d'installation, ~70 % du chemin parcouru.

## ⚡ Démarrage rapide

**Si tu es une IA qui reprend le projet** :

→ Lis directement [[MISSION-CLAUDE]] — c'est ton brief autonome complet
avec autorité d'exécuter sans validation à chaque étape.

**Si tu es un humain qui reprend le projet** :

→ Commence par [[00-START-HERE]]

## 📚 Table des matières

### 🚀 Entry points

| Doc | Contenu | Quand le lire |
|---|---|---|
| ⭐ **[[MISSION-CLAUDE]]** | **Brief autonome ultra-complet pour IA** | **EN PREMIER si tu es Claude/ChatGPT/autre** |
| [[00-START-HERE]] | Brief 5-min : où on en est, où il faut aller | EN PREMIER si humain |
| README (ce fichier) | Index et carte mentale | Pour naviguer |

### 📊 État du projet

| Doc | Contenu |
|---|---|
| [[01-CURRENT-STATE]] | État exact de la boutique Shopify |
| [[02-NEXT-ACTIONS]] | Checklist priorisée (P0 → P3) |
| [[10-LAUNCH-CHECKLIST]] | Checklist finale avant lancement |

### 🛠 Actions à faire

| Doc | Contenu |
|---|---|
| [[04-THEME-SECTIONS-TODO]] | Sections du thème à finir |
| [[05-PAGES-TO-CREATE]] | 14 pages à créer |
| [[06-BLOG-TO-PUBLISH]] | Blog + 13 articles à publier |
| [[07-EMAILS-TO-INSTALL]] | 5 emails transactionnels |
| [[08-NAVIGATION-TODO]] | Menu header + footer |
| [[09-POLICIES-TODO]] | Politiques boutique |

### 🧠 Contexte et règles

| Doc | Contenu |
|---|---|
| [[03-CREDENTIALS-AND-ACCESS]] | URLs, comptes, tokens |
| [[20-PERSONA-MARTIN]] | Qui est l'utilisateur, comment communiquer |
| [[21-DECISIONS]] | Décisions déjà prises (ADR simplifiés) |
| [[22-HISTORIQUE-ERREURS]] | Erreurs déjà rencontrées + résolutions |
| [[23-DO-NOT-DO]] | 25 interdictions absolues |
| [[24-GLOSSAIRE-SHOPIFY]] | Termes techniques expliqués |

## 🗺 Carte mentale de la mission

```mermaid
graph TD
    Start[📍 Vault v2] --> Mission[[MISSION-CLAUDE]]
    Start --> StartHere[[00-START-HERE]]

    Mission --> Context[Lire le contexte]
    Context --> Persona[[20-PERSONA-MARTIN]]
    Context --> Decisions[[21-DECISIONS]]
    Context --> Errors[[22-HISTORIQUE-ERREURS]]
    Context --> DoNot[[23-DO-NOT-DO]]
    Context --> Gloss[[24-GLOSSAIRE-SHOPIFY]]

    Mission --> State[[01-CURRENT-STATE]]
    State --> Actions[[02-NEXT-ACTIONS]]

    Actions --> PhaseA[Phase A: Quick wins]
    Actions --> PhaseB[[05-PAGES-TO-CREATE]]
    Actions --> PhaseC[[08-NAVIGATION-TODO]]
    Actions --> PhaseD[[06-BLOG-TO-PUBLISH]]
    Actions --> PhaseE[[07-EMAILS-TO-INSTALL]]
    Actions --> PhaseF[[09-POLICIES-TODO]]
    Actions --> PhaseG[[04-THEME-SECTIONS-TODO]]
    PhaseG --> PhaseH[[10-LAUNCH-CHECKLIST]]
    PhaseH --> Live[🚀 LIVE]
```

## 🎯 Objectif

**Finir l'installation Shopify pour qu'AURÉLIA Paris soit vendable.**

Restant estimé : ~90 minutes de travail manuel + conversion forfait payant
pour encaisser vraiment.

## 🔗 Docs de référence v1 (ancien vault)

Toujours valides comme référence générale :
- `vault/BRAND-CARD.md` — palette, typo, voix éditoriale
- `vault/PRODUCT-CATALOG.md` — catalogue produits exhaustif
- `vault/CONTENT-INDEX.md` — index des contenus rédigés
- `vault/SHOPIFY-RUNBOOK.md` — runbook complet (mais avec étapes déjà faites)

## 🚦 État global

| Catégorie | Statut |
|---|---|
| Identité marque | ✅ 100 % |
| Thème Shopify uploadé | ✅ 100 % |
| Produits (5) créés | ✅ 100 % |
| Photos AI uploadées | ✅ 95 % (1 swap à faire) |
| Collection | ✅ 100 % |
| Codes promo | ✅ 100 % |
| Paiements (mode test) | ✅ 100 % |
| Livraison | ✅ 100 % |
| **Customisation thème** | ⏳ 50 % (sections à finir) |
| **Pages (14)** | ❌ 0 % (à créer) |
| **Blog (13 articles)** | ❌ 0 % (à publier) |
| **Emails (5)** | ❌ 0 % (à coller) |
| **Politiques** | ❌ 0 % (à configurer) |
| **Menu navigation** | ⏳ 30 % (à compléter) |
| **Conformité légale** | ⚠️ 60 % (faux avis à retirer, SIRET à ajouter) |
| **Forfait payant** | ❌ 0 % (à convertir pour vendre) |

**Global** : ≈ **70 %** du chemin parcouru.
