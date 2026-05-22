# Vault AURÉLIA — Documentation de référence

Ce dossier contient tous les documents critiques pour reprendre le projet
dans une autre session, transférer à un autre développeur, ou déployer
la boutique en autonomie complète.

## Comment utiliser ce vault

Selon ton besoin, ouvre le document adapté :

| Tu veux… | Lis ce fichier |
|---|---|
| Donner un brief complet à une nouvelle session Claude qui pilote ton browser | `HANDOFF-CLAUDE.md` |
| Comprendre l'état actuel du projet (qu'est-ce qui est fait, à faire) | `PROJECT-STATE.md` |
| Déployer pas à pas la boutique sur Shopify (manuel ou semi-auto) | `SHOPIFY-RUNBOOK.md` |
| Connaître la voix de marque, la charte graphique, les valeurs | `BRAND-CARD.md` |
| Avoir le catalogue produit exhaustif (prix, descriptions, tags) | `PRODUCT-CATALOG.md` |
| Trouver tous les contenus rédigés (pages, articles, emails) | `CONTENT-INDEX.md` |

## Structure du repo

```
shopify-theme/              ← le thème Shopify Online Store 2.0
├── assets/                 ← CSS, JS, SVG (logo, favicon, etc.)
├── config/                 ← settings_schema.json, settings_data.json
├── layout/                 ← theme.liquid (template global)
├── locales/                ← fr.default.json
├── sections/               ← 19 sections (hero, header, footer, etc.)
├── snippets/               ← 15 snippets (cart-drawer, popup, etc.)
├── templates/              ← 16 templates de pages
├── email-templates/        ← 5 emails transactionnels
├── BLOG-CONTENT.md         ← 13 articles SEO complets
├── PRODUCT-CONTENT.md      ← 4 fiches produit complètes
├── PHOTO-PROMPTS.md        ← 16 prompts pour visuels (Nano Banana 2)
├── INSTALL.md              ← runbook d'installation (rapide)
└── products.csv            ← import direct produits Shopify

aurelia-theme.zip           ← zip du thème prêt à uploader (154 Ko, 75 fichiers)

vault/                      ← ce dossier — docs de référence
├── README.md               ← ce fichier
├── HANDOFF-CLAUDE.md       ← brief pour une nouvelle session Claude
├── PROJECT-STATE.md        ← état actuel exhaustif
├── SHOPIFY-RUNBOOK.md      ← procédure de déploiement détaillée
├── BRAND-CARD.md           ← marque, voix, palette
├── PRODUCT-CATALOG.md      ← catalogue produit
└── CONTENT-INDEX.md        ← index de tous les contenus rédigés
```

## Branche active

Branche de travail principale : `claude/cryoglow-ecommerce-shop-mFjYb`
Cette branche `vault/aurelia-handoff` est issue de la branche de travail
à un état stable et contient en plus le dossier `vault/`.

## Lien PR

PR ouverte côté GitHub : `martinbouvet2000-tech/Citation#2` (ou la dernière
en date sur la branche `claude/cryoglow-ecommerce-shop-mFjYb`).
