---
title: "5 emails transactionnels à installer"
tags: [emails, todo, aurelia]
created: 2026-06-01
---

# 📧 5 emails transactionnels à installer

> Les 5 templates sont déjà rédigés en marque Aurélia (palette ivoire/or,
> Cormorant Garamond, voix éditoriale). Format HTML inliné compatible
> Gmail/Outlook mobile. Liquid Shopify natif.

## Source

Repo GitHub : `martinbouvet2000-tech/Citation`
Branche : `claude/cryoglow-ecommerce-shop-mFjYb` (ou `main`)
Dossier : `shopify-theme/email-templates/`

## Procédure pour chaque email

1. Admin → **Paramètres** → **Notifications** → **Notifications par e-mail**
   (URL directe : https://admin.shopify.com/store/3aff1g-y4/email_settings)
2. Cliquer sur le nom de la notification (ex. "Confirmation de commande")
3. Cliquer **« Modifier le code »**
4. Aller sur GitHub ouvrir le fichier `.liquid` correspondant (lien dans le tableau)
5. **Copier tout le contenu** du fichier
6. Revenir dans Shopify, dans le champ "Body" / "Code HTML" :
   - **Effacer tout** le HTML existant (Ctrl+A puis Delete)
   - **Coller** le contenu copié (Ctrl+V)
7. **Enregistrer** en bas
8. Cliquer **« Aperçu »** pour vérifier le rendu
9. Optionnel : **« Envoyer un e-mail de test »** à ton adresse perso

## Tableau des 5 emails

| # | Notification Shopify | Fichier source | URL raw GitHub |
|---|---|---|---|
| 1 | Confirmation de commande | `order_confirmation.liquid` | https://raw.githubusercontent.com/martinbouvet2000-tech/Citation/main/shopify-theme/email-templates/order_confirmation.liquid |
| 2 | Confirmation d'expédition | `shipping_confirmation.liquid` | https://raw.githubusercontent.com/martinbouvet2000-tech/Citation/main/shopify-theme/email-templates/shipping_confirmation.liquid |
| 3 | Confirmation de livraison | `order_delivered.liquid` | https://raw.githubusercontent.com/martinbouvet2000-tech/Citation/main/shopify-theme/email-templates/order_delivered.liquid |
| 4 | Panier abandonné | `abandoned_checkout.liquid` | https://raw.githubusercontent.com/martinbouvet2000-tech/Citation/main/shopify-theme/email-templates/abandoned_checkout.liquid |
| 5 | (Bienvenue newsletter) | `welcome_newsletter.liquid` | https://raw.githubusercontent.com/martinbouvet2000-tech/Citation/main/shopify-theme/email-templates/welcome_newsletter.liquid |

⚠️ **L'email "Bienvenue newsletter"** (#5) **n'a pas de notification native Shopify**.
Il faut une app newsletter type **Klaviyo** ou **Omnisend** pour le brancher.
Pour MVP, ignorer celui-ci, à activer dans la phase 2.

## Contenu de chaque email

### 1. order_confirmation
- Merci de la confiance
- Récap des articles (table avec image + nom + prix)
- Adresse de livraison
- Total
- Lien vers status commande
- "Vous recevrez un nouvel email dès l'expédition"
- Signature L'équipe Aurélia · Paris

### 2. shipping_confirmation
- "Votre commande est en route"
- Numéro de tracking ({{ fulfillment.tracking_number }})
- URL tracking ({{ fulfillment.tracking_url }})
- Estimation 5-10 jours France métropolitaine
- Lien suivi commande
- Conseil "préparez votre coin rituel"

### 3. order_delivered
- "Votre Aurélia est arrivé"
- Invitation à scanner le QR code du guide d'utilisation
- Lien vers le journal Aurélia pour conseils
- Demande d'avis dans 4 semaines
- Programme fidélité (Le Cercle Aurélia)

### 4. abandoned_checkout
- Ton bienveillant pas pressant ("votre panier vous attend")
- Récap des articles abandonnés
- CTA "Reprendre mon panier" → {{ checkout.recovery_url }}
- **PAS de code promo** dès le premier email (mauvaise tactique long terme)
- Rappel "livraison offerte dès 150 €"

### 5. welcome_newsletter (via app newsletter externe)
- Merci de rejoindre la maison Aurélia
- Présentation rapide (1 email/mois max, contenu éditorial)
- **Code WELCOME10 pour -10 %** sur la première commande
- Lien vers la gamme
- Signature personnelle de la fondatrice

## ✅ Vérification finale

Après installation des 4 premiers emails :

1. Faire une commande test (mode incognito + carte test `4242 4242 4242 4242`)
2. Vérifier que l'email de confirmation arrive bien
3. Vérifier le rendu (logo, photos produits, total, etc.) sur Gmail mobile et Outlook

## Note sur les variables Liquid

Chaque template utilise des variables Shopify natives :
- `{{ shop.name }}`, `{{ shop.url }}`
- `{{ order.name }}`, `{{ order.line_items }}`, `{{ order.total_price }}`
- `{{ customer.first_name }}`
- `{{ fulfillment.tracking_number }}`, `{{ fulfillment.tracking_url }}`
- `{{ checkout.recovery_url }}` (pour panier abandonné)

Shopify remplit ces variables automatiquement à l'envoi.
