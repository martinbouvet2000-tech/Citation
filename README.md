# Oral PASS Sorbonne 2026 — Préparation

Application web mono-page pour préparer les **épreuves orales du PASS** (Parcours Accès Santé Spécifique) de **Sorbonne Université**. Conçue pour réviser les deux épreuves orales, suivre sa progression et s'entraîner jusqu'au jour J.

> **Version officielle : [`oral-medecine.html`](oral-medecine.html)**
> 🔗 En ligne : https://martinbouvet2000-tech.github.io/Citation/oral-medecine.html

## Fonctionnalités

- **Banques de questions** : RPC (Réflexion sur une Problématique Complexe) et ARED (Analyse et Raisonnement devant un Ensemble de Données), conformes aux **4 consignes officielles** de la faculté.
- **Vraies infographies en français** : les questions ARED s'appuient sur des infographies générées **en français** (données INSEE, OMS, DREES, FAO, ONU, Banque Mondiale) — santé, démographie, société, environnement.
- **Suivi de progression** : système à 3 états (à faire / à revoir / acquis), tableau de bord, compte à rebours.
- **« Question pour un champion »** : marquer les questions clés à maîtriser.
- **Réponses & notes** personnelles par question.
- **Synchronisation multi-appareils** via Firebase (`?room=CODE` pour partager entre PC et téléphone).
- **Sauvegarde automatique** dans le cloud (historique 14 jours) + export / import / restauration manuelle.
- **Thème clair / sombre**, plein écran.

## Utilisation

1. Ouvrir la [version en ligne](https://martinbouvet2000-tech.github.io/Citation/oral-medecine.html).
2. (Optionnel) Ajouter `?room=UNCODE` à l'URL pour synchroniser les données entre plusieurs appareils partageant le même code.

## Méthodologie ARED (officielle, dans l'ordre)

1. **Décrire** les informations contenues dans le document (l'étape la plus importante).
2. **Message** : quel est le message de l'infographie ?
3. **Forme** : discuter le choix de la forme (design, couleurs, espace).
4. **Points forts / points faibles**, et pourquoi.

## Pile technique

- React 18 (via CDN, sans build)
- Firebase Realtime Database (synchronisation + sauvegardes automatiques)
- Hébergement : GitHub Pages

## Sources

- Infographies du site : générées en français à partir de données publiques (INSEE, OMS, DREES, FAO, ONU, Banque Mondiale). Sources d'entraînement complémentaires : [Our World in Data](https://ourworldindata.org), Visual Capitalist, Statista.
- Format de l'épreuve : MCC Sorbonne Université 2025-2026.
