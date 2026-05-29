# 🚀 Installation Shopify AURÉLIA — Mode tryhard

Ce runbook te fait passer de **rien** à **boutique en vente** en ~30 minutes.

## ⏱ Vue d'ensemble

| Étape | Temps | Action |
|---|---|---|
| 1 | 2 min | Installer Python (si pas déjà fait) |
| 2 | 30 sec | Télécharger `install_shopify.py` |
| 3 | 30 sec | Lancer le script |
| 4 | 5 min | Photos produit (Nano Banana 2 ou skip pour l'instant) |
| 5 | 5 min | Coller les 5 emails dans Notifications |
| 6 | 5 min | Configurer paiements + livraison |
| 7 | 30 sec | Retirer mot de passe de la boutique |

---

## 1️⃣ Installer Python (1 fois pour la vie)

Ouvre **PowerShell** (Windows) ou **Terminal** (Mac/Linux) et tape :

```
python --version
```

- Si tu vois `Python 3.x.x` (avec x ≥ 8) → ✅ saute à l'étape 2
- Si erreur → installe Python :
  - **Windows** : https://www.python.org/downloads/ → bouton jaune "Download Python 3.x" → lance l'installeur → **CRUCIAL : coche "Add Python to PATH"** en bas → "Install Now"
  - **Mac** : `brew install python` (ou télécharge depuis le site)

Une fois installé, ferme et rouvre ton terminal, puis vérifie `python --version`.

---

## 2️⃣ Télécharger le script

**Option A — direct** :
Télécharge ces 2 fichiers et mets-les dans un même dossier (ex. `Documents/aurelia/`) :

- https://raw.githubusercontent.com/martinbouvet2000-tech/Citation/feat/install-script/install_shopify.py
- (Tout le reste — thème, CSV, blog — sera téléchargé automatiquement)

**Option B — git clone (mieux si tu as git)** :
```
git clone https://github.com/martinbouvet2000-tech/Citation.git
cd Citation
```

---

## 3️⃣ Lancer l'install

Dans ton terminal, dans le dossier où se trouve `install_shopify.py` :

> ⚠️ Remplace `TON_TOKEN_ICI` par ton vrai token (celui qui commence par `atkn_...`)
> que tu as récupéré sur dev.shopify.com.

### Windows PowerShell
```powershell
pip install requests
$env:SHOPIFY_STORE = "3aff1g-y4"
$env:SHOPIFY_TOKEN = "TON_TOKEN_ICI"
python install_shopify.py
```

### Mac / Linux
```bash
pip install requests
export SHOPIFY_STORE=3aff1g-y4
export SHOPIFY_TOKEN=TON_TOKEN_ICI
python install_shopify.py
```

### Ce qui va se passer

Le script va afficher en temps réel :

```
▶ Test connexion Shopify
   ✓ Boutique : Ma boutique 3 (3aff1g-y4.myshopify.com)
▶ Récupération des artefacts (thème, CSV, blog)
   ✓ Thème : aurelia-theme.zip
▶ Upload du thème Shopify
   ✓ Thème créé (id 12345)
   10/75 assets uploadés
   20/75 assets uploadés
   ...
   ✓ Thème publié comme thème principal
▶ Import des produits
   ✓ aurelia-signature
   ✓ aurelia-lumiere-pro
   ✓ aurelia-regard
   ✓ aurelia-decollete
   ✓ le-rituel-complet (bundle)
▶ Création de la collection 'La Gamme'
   ✓ Collection créée
   ✓ aurelia-signature attaché
   ...
▶ Création des 14 pages
   ✓ a-propos
   ✓ cgv
   ... (14 lignes)
▶ Création du blog 'Journal' + articles
   ✓ Blog 'journal' créé
   ✓ masque-led-comment-ca-marche
   ... (13 articles)
▶ Création des codes promo
   ✓ Code WELCOME10 créé (-10%)
   ✓ Code RITUEL15 créé (-15%)

🌟 AURÉLIA — Installation terminée
🌐 Front public : https://3aff1g-y4.myshopify.com
🛠 Admin       : https://admin.shopify.com/store/3aff1g-y4
... [URLs de toutes les pages] ...
```

**Durée totale du script : 2 à 4 minutes**.

### En cas d'erreur

- **`[X] Variables manquantes`** → tu as oublié `export`/`$env:` → relance les commandes
- **`Connexion impossible (HTTP 401)`** → token invalide ou expiré → régénère un token sur dev.shopify.com
- **`Connexion impossible (HTTP 403)`** → scopes insuffisants sur l'app → vérifie qu'elle a bien les 12 permissions
- **`HTTP 429`** → rate limit Shopify, le script retry automatiquement
- **Le script s'arrête à mi-chemin** → relance-le tel quel, il saute ce qui est déjà fait (idempotent)

Pour ne refaire qu'une partie :
```bash
python install_shopify.py --skip-theme --skip-products
```
Options : `--skip-theme`, `--skip-products`, `--skip-collection`, `--skip-pages`, `--skip-blog`, `--skip-discounts`

---

## 4️⃣ Photos produit (optionnel pour MVP)

Sans photos, les fiches produit ont des placeholders. Pour générer les vraies :

1. Ouvre `shopify-theme/PHOTO-PROMPTS.md` (16 prompts au total : 4 par produit)
2. Passe chaque prompt dans **Nano Banana 2** (Gemini), **Midjourney v6+**, ou un photographe pro
3. Sur chaque fiche produit dans l'admin : **Médias → Ajouter une image** (cliquer-déposer)

**Pour aller en ligne plus vite** : tu peux skipper et lancer la vente avec placeholders, ajouter les photos après. La boutique fonctionne quand même.

---

## 5️⃣ Coller les 5 emails (5 min)

Va sur https://admin.shopify.com/store/3aff1g-y4/settings/email_settings → **Notifications par e-mail**

Pour chacune des 4 notifications listées dans le tableau :
1. Clique sur la notification
2. Bouton **"Modifier le code"**
3. Efface tout le HTML par défaut
4. Colle le contenu du fichier `.liquid` correspondant (lien GitHub ci-dessous)
5. **Enregistrer**

| Notification Shopify | Fichier source (clic → copie) |
|---|---|
| Confirmation de commande | https://raw.githubusercontent.com/martinbouvet2000-tech/Citation/main/shopify-theme/email-templates/order_confirmation.liquid |
| Confirmation d'expédition | https://raw.githubusercontent.com/martinbouvet2000-tech/Citation/main/shopify-theme/email-templates/shipping_confirmation.liquid |
| Confirmation de livraison | https://raw.githubusercontent.com/martinbouvet2000-tech/Citation/main/shopify-theme/email-templates/order_delivered.liquid |
| Panier abandonné | https://raw.githubusercontent.com/martinbouvet2000-tech/Citation/main/shopify-theme/email-templates/abandoned_checkout.liquid |

Le `welcome_newsletter.liquid` nécessite une app newsletter (Klaviyo, Omnisend) — pas besoin tout de suite.

---

## 6️⃣ Paiements + Livraison (5 min)

### Paiements
https://admin.shopify.com/store/3aff1g-y4/settings/payments

1. **Activer Shopify Payments** (gros bouton bleu en haut) → suis le formulaire KYC
   - Tu peux skipper et activer plus tard si tu veux d'abord tester
2. **Activer PayPal Express** (recommandé, augmente le taux de conversion)
3. Optionnel : Klarna, Alma (paiement en 3-4× — adapté au panier moyen 200-500€)

### Livraison
https://admin.shopify.com/store/3aff1g-y4/settings/shipping

1. Clique sur **"Gérer"** à côté de la zone France
2. Crée 2 tarifs :
   - **Livraison standard** : 4.90 € · **gratuit dès 150 €** (case "Ajouter une condition basée sur le prix")
   - **Livraison express** : 9.90 € (J+1)
3. Optionnel : zone Union Européenne → 12.90 € flat

---

## 7️⃣ Retirer le mot de passe boutique = mise en vente ✨

https://admin.shopify.com/store/3aff1g-y4/online_store/preferences

1. Scroll jusqu'à **"Protection de la boutique en ligne par mot de passe"**
2. **Décoche** la case "Restreindre l'accès"
3. **Enregistrer**

🎉 **Ta boutique est LIVE** sur https://3aff1g-y4.myshopify.com

---

## 8️⃣ Test final (5 min)

Dans un nouveau navigateur incognito (pour pas avoir le cache admin) :

- [ ] https://3aff1g-y4.myshopify.com charge sans password
- [ ] Tu vois la homepage avec hero + 4 produits
- [ ] Tu cliques sur AURÉLIA Signature → la fiche s'affiche
- [ ] Tu ajoutes au panier → le tiroir s'ouvre
- [ ] Tu vas au checkout → le formulaire s'affiche
- [ ] Tu testes le code `WELCOME10` → -10% appliqué
- [ ] Le footer pointe vers /pages/cgv, /pages/mentions-legales, etc.
- [ ] Le quiz /pages/diagnostic démarre et te recommande un produit

Si tout coche : **félicitations, ta boutique est ouverte.** 🌟

---

## 🔐 Dernière chose — Sécurité

**Révoque ton token API** maintenant qu'on a fini :

1. https://dev.shopify.com/dashboard
2. Clic sur **Aurelia Setup**
3. Sidebar gauche → **Paramètres**
4. Dans **"Jeton d'automatisation d'appli"** → bouton **"⋯"** ou **"Faire pivoter"** → supprime / régénère

Comme ça si le token a été vu par quelqu'un d'autre, il est invalidé.

---

## ❓ Si tu bloques

Copie l'erreur dans la conversation, je débugue.

Si tu veux relancer toute l'install à zéro :
- Supprime le thème "Aurélia v5" dans Admin → Thèmes
- Supprime tous les produits, pages, blog, articles, codes promo
- Relance `python install_shopify.py`
