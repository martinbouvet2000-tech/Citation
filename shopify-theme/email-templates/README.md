# Templates emails — AURÉLIA Paris

Cinq templates transactionnels et marketing, en HTML inliné, prêts à coller dans l'admin Shopify.

Tous les templates partagent la même grammaire visuelle : wordmark Cormorant Garamond, sous-titre or letter-spacing 4px, fond ivoire `#FAF6F1`, container blanc 600px, bouton ink `#1A1410`, footer sombre avec liens Instagram / TikTok.

---

## 1. Où coller chaque template dans Shopify

Toutes les notifications transactionnelles se trouvent dans :

**Admin Shopify → Paramètres → Notifications**

Pour chaque notification ci-dessous, cliquez dessus, puis dans la zone **"Corps de l'email (HTML)"** : sélectionnez tout (Ctrl/Cmd + A), supprimez, et collez le contenu du `.liquid` correspondant.

| Fichier | Notification Shopify à remplacer | Section |
| --- | --- | --- |
| `order_confirmation.liquid` | **Order confirmation** (Confirmation de commande) | Order |
| `shipping_confirmation.liquid` | **Shipping confirmation** (Confirmation d'expédition) | Shipping |
| `order_delivered.liquid` | **Order delivered** (Confirmation de livraison) | Shipping |
| `abandoned_checkout.liquid` | **Abandoned checkout** (Panier abandonné) | Marketing → Abandoned checkouts |
| `welcome_newsletter.liquid` | **Customer: welcome** / Flow d'inscription newsletter | Customer notifications ou Shopify Email / Klaviyo |

> **Note pour le welcome** : selon votre stack, ce template peut aussi être collé dans un flow Shopify Email, Klaviyo ou Omnisend déclenché par l'inscription au formulaire newsletter.

### Subjects (objets) recommandés

À renseigner dans le champ **"Email subject"** au-dessus du HTML :

| Template | Subject |
| --- | --- |
| order_confirmation | `Votre commande {{ order.name }} est confirmée` |
| shipping_confirmation | `Votre Aurélia est en route` |
| order_delivered | `Votre Aurélia est arrivé chez vous` |
| abandoned_checkout | `✨ Votre panier vous attend chez Aurélia` |
| welcome_newsletter | `Bienvenue dans la maison Aurélia` |

---

## 2. Variables Liquid disponibles par template

Shopify n'expose pas les mêmes objets à chaque notification. Voici ce que chaque template consomme.

### `order_confirmation.liquid`
- `shop.name`, `shop.url`
- `customer.first_name`
- `order.name`, `order.order_status_url`, `order.line_items`, `order.shipping_address`
- `line_item.title`, `line_item.variant.title`, `line_item.quantity`, `line_item.line_price`, `line_item | img_url`
- `subtotal_price`, `shipping_price`, `tax_price`, `total_price`

### `shipping_confirmation.liquid`
- `shop.name`, `shop.url`, `customer.first_name`, `order.name`, `order.order_status_url`
- `fulfillment.tracking_number`, `fulfillment.tracking_url`, `fulfillment.tracking_company`, `fulfillment.line_items`

### `order_delivered.liquid`
- `shop.name`, `shop.url`, `customer.first_name`, `order.name`
- Lien `{{ shop.url }}/pages/guide-utilisation` (à créer côté boutique)
- Lien `{{ shop.url }}/blogs/journal`
- Lien `{{ shop.url }}/pages/cercle` (programme fidélité — adapter si nom différent)
- Placeholder QR code : `https://aureliaparis.com/assets/email/qr-guide-placeholder.png` — **à remplacer par l'URL absolue d'un vrai QR exporté**.

### `abandoned_checkout.liquid`
- `shop.name`, `shop.url`, `customer.first_name`
- `checkout.line_items`, `checkout.recovery_url`
- `line.product.title`, `line.title`, `line.variant.title`, `line.quantity`, `line.line_price`, `line.image | img_url`

### `welcome_newsletter.liquid`
- `shop.name`, `shop.url`, `customer.first_name`
- Code statique : `WELCOME10` — créer la règle de remise dans **Admin → Discounts** (-10%, première commande, 60 jours).
- Lien gamme : `{{ shop.url }}/collections/all`
- `unsubscribe_url` (fourni par Shopify Email / Klaviyo) avec fallback sur `{{ shop.url }}/account`

---

## 3. Tester avant publication

### a) Aperçu dans Shopify
Sur la page de chaque notification, cliquez sur **"Preview"**. Shopify injecte des données fictives. Vérifiez : wordmark visible, accents (é, è, à) corrects, bouton CTA cliquable.

### b) Envoi de test
Bouton **"Send test email"** (en haut à droite de l'éditeur de notification). Envoyez à au moins :
- une boîte **Gmail desktop**
- une boîte **Gmail mobile** (ou Gmail app)
- une boîte **Outlook 365 / Outlook.com** (Outlook 2016 desktop rend différemment des autres clients — c'est le test le plus impitoyable)
- une boîte **Apple Mail iOS**

### c) Checklist de rendu
- [ ] Le wordmark **AURÉLIA** s'affiche (sinon : police serveur indisponible, le fallback Georgia prend le relais — c'est ok)
- [ ] Les images produits chargent (vérifier les `img_url`)
- [ ] Le bouton ink reste cliquable sur mobile (zone de tap ≥ 44px)
- [ ] Le footer sombre ne casse pas (Outlook a tendance à éclaircir les fonds noirs — accepté)
- [ ] Aucune CSS class ne reste (tout est inline)
- [ ] Largeur ≤ 600px sur desktop, fluide sur mobile

### d) Outils externes recommandés
- **Litmus** ou **Email on Acid** : preview sur 70+ clients mail réels.
- **mail-tester.com** : envoyez le test à l'adresse fournie pour vérifier le score SPF / DKIM / contenu (≥ 8/10 attendu).
- **Putsmail** (gratuit) : envoi rapide d'un HTML brut pour tester un rendu avant de coller dans Shopify.

### e) Avant publication
1. Le code WELCOME10 est créé dans Shopify Discounts ?
2. Les pages `/pages/guide-utilisation`, `/pages/cercle`, `/blogs/journal` existent (sinon liens 404) ?
3. Les comptes Instagram / TikTok (`@aureliaparis`) sont les bons handles ?
4. L'adresse postale du footer (`12 rue de Sévigné, 75004 Paris`) est exacte ?
5. Pour la newsletter : vérifier que le lien de désabonnement est généré par votre ESP (Shopify Email, Klaviyo) — obligatoire RGPD.
