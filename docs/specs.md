---
layout: default
---
[Accueil](./index.md) | [Apropos](./about.md) | Specifications | [Guides](./userguide.md)


# **Spécifications techniques pour un ensemble de tableaux de bord de suivi et d'évaluation du paludisme pour les appareils mobiles**


## 1. Users

MEASURE Evaluation envisage un ensemble diversifié d'utilisateurs potentiels à la périphérie du système de santé, y compris

### Niveau District:
- Les responsables de programme de lutte contre le paludisme
Gestionaires de données sur le paludisme
- Responsables de la chaîne d'approvisionnement (produits pharmaceutiques et produits antipaludiques, tels que les moustiquaires) 
- Médecins de districts
- Personnel de lutte antivectorielle
- Officiers de surveillance des maladies

### Niveau de l'établissement:

- Responsable de l'établissement
- Gestionnaire de données (hôpital)
- Point focal paludisme (hôpital)
- Prestataire de services de santé (centre de santé)
- Responsables des stocks

### Niveau communautaire :

- Agents de santé communautaire
- Volontaires du village

### Contenu :

Les tableaux de bord mobiles doivent contenir des informations à jour pour les indicateurs du programme

- Comparaisons géographiques (diagramme à barres montrant les résultats par zone de couverture, sous-district, district)
- Tendances dans le temps - comparaison des valeurs des établissements dans un district au fil du temps pour les indicateurs prioritaires.
- Tendances au fil du temps - un indicateur pour un établissement de santé (pour chaque établissement pour analyser les données et prendre des décisions)
- Cartes thématiques

### Fonctionnalité

- Voir la cohérence des données, la qualité sur le tableau de bord en utilisant les règles de validation (par exemple # de CPN1 vs # de MII distribuées aux femmes enceintes) et DHIS2/DQR app
- voir 2-3 graphiques sur les tableaux de bord à la fois, selon la taille de l'écran et/ou les préférences de l'utilisateur
- voir 2-3 indicateurs sur le même graphique, par exemple les doses de vaccin administrées pour différents antigènes au cours d'une période de rapport donnée et au fil du temps.
- modifier le contenu au besoin, à partir d'une liste d'indicateurs et d'éléments de données.
- sélectionner le mode d'affichage d'un indicateur - c'est-à-dire sous forme de tableau, de graphique ou de graphique
- afficher des cartes thématiques (si possible)
- Avoir plusieurs "vues" - c'est-à-dire basculer entre différents tableaux de bord configurés (2-3 graphiques chacun), pour différents aspects du suivi traitement, prévention, gestion des produits, etc.)
- créer un rapport statique (comme un PDF) d'un tableau de bord donné qui pourrait être facilement partagé (e-mail ou publié sur une plateforme de réseautage social)
- possibilité d'ajouter des annotations textuelles (par exemple pour les interprétations) de graphiques individuels
- comparent les résultats avec des cibles prédéfinies
- Afficher les coordonnées GPS (par ex. répartition des centres de santé ou des ASC engagés dans des activités de lutte contre le paludisme)

### Éléments de données/indicateurs (appropriés à la périphérie du système de santé)

| Prévention | du paludisme Dépistage du | paludisme Cas | paludisme Traitement | paludisme Disponibilité des produits | antipaludiques Mortalité due |
| --- | --- | --- | --- | --- | --- |
| 1.1 : Nombre d'enfants de moins de 5 ans ayant reçu des MII | 2.1 : Nombre de visites OPD pour les enfants (\< 5) | 3.1 : Nombre d'enfants (\< 5) avec paludisme confirmé (tes positifs au TDR) |  Nombre d'enfants (\< 5) atteints de paludisme confirmé recevant des ACT | d'établissements en rupture de stock d'ACT pendant 7 jours consécutifs au cours du mois précédent |  Nombre |
|  :Nombre de femmes enceintes ayant reçu des MII | 2.2 : Nombre d'enfants (\< 5) ayant de la fièvre | 3.2 : Nombre d'enfants (5-14) atteints de paludisme confirmé (testés positifs au TDR) | 4.2 : Nombre d'enfants (5-14) atteints de paludisme confirmé recevant les ACT | 5.2 : Nombre d'établissements en rupture de stock de TDR pendant 7 jours consécutifs au cours du mois précédent | Autre précisez |
| 1.3 : Nombre de moustiquaires distribuées aux femmes enceintes | 2.3 : Nombre d'enfants (5-14) ayant de la fièvre | 3.3 : Nombre de personnes (15 +) avec paludisme confirmé (testé positif avec TDR) | 4.3 : Nombre de personnes (15+) avec paludisme confirmé recevant des ACT | 5.3 : Nombre d'établissements avec rupture de stock de SP pendant 7 jours consécutifs au cours du mois passé |
 |
| 1.4 : Nombre de moustiquaires campagne de masse | 2.4 : Nombre de personnes (15+) ayant de la fièvre | 3.4 : Numbe r de femmes enceintes atteintes de paludisme confirmé (testées positives au TDR) | 4.4 : Nombre d'enfants (\<5) recevant des ACT | 5.4 : Nombre d'établissements avec Rupture de stock d'artésunate injectable pendant 7 jours consécutifs au cours du dernier mois |
 |
| 1.5 : Nombre total de moustiquaires( ITNs) distribuées | 2.5 : Nombre d'enfants (\< 5) avec fièvre testés (TDR ou microscopie) | 3.5 : Nombre de cas testés négatifs avec TDR dans toutes les catégories | 4.5 : Nombre d'enfants (5-14) recevant des ACT | 5.5 : Nombre d'établissements avec Rupture de stock d'artestunate rectal pendant 7 jours consécutifs au cours du dernier mois |
 |
| 1.6 Activités de lutte antivectorielle (?) | 2.6 : Nombre d'enfants (5-14) avec fièvre testés (TDR ou microscopie) | 3.6 : Nombre de cas confirmés de paludisme | 4.6 : Nombre de personnes (15+) recevant des ACT | 5.6 : Nombre d'établissements en rupture de stock d'ITN pendant 7 jours consécutifs au cours du mois précédent |
 |
| 1.7 Couverture du traitement préventif intermittent du paludisme pendant la grossesse (TPIp)
 | 2.7 : Nombre de personnes (15+) ayant subi un test de fièvre (TDR) ou microscopie) | 3.7 : Nombre de cas présumés de paludisme a cas | 4.7 : Nombre de cas graves référés | 5.7 Nombre d'établissements disposant d'un inventaire de MII disponibles |
 |
|
 |
 | 3.8 : Nombre d'enfants (\<5) atteints de paludisme grave | 4.8 : Nombre de cas testés négatifs avec un TDR recevant des ACT | 5.8 Nombre d'établissements disposant d'un inventaire disponible de ACT |
 |
|
 |
 | 3.9 : Nombre d'enfants (5-14) atteints de paludisme grave | 4.9 : Nombre de cas confirmés de paludisme guéris après un traitement par ACT |
 |
 |
|
 |
 | 3.10 : Nombre de personnes (15+) atteintes de paludisme grave | 4.10 : Nombre de cas de paludisme grave traités et guéris |
 |
 |
|
 |
 | 3.11 : Nombre des cas de paludisme grave référés |
 |
 |
 |
|
 |
 |
 |
 |
 |
 |

# **DOCUMENT DE SPÉCIFICATIONS TECHNIQUES**

## Introduction

|
Cette activité aidera à générer les évidences pour informer la planification stratégique de PMI et d'autres parties prenantes et contribuera également à soutenir les efforts des pays dans l'utilisation des données pour la prise de décision. Cette activité abordera l'une des approches stratégiques de PMI qui est "Améliorer la capacité des pays à collecter et utiliser l'information". |
| --- |

La portée de ce travail est de fournir un tableau de bord mobile convivial au niveau périphérique visant à améliorer la capacité des agents de santé à analyser et à utiliser les données pour la prise de décision.

## Description de l'activité

1.
## Phase 1 : Application de tableau de bord conviviale et réactive basée sur le Web DHIS2 :

La première phase du projet consistera à développer une application conviviale mobile REACT.js DHIS2 qui comportera un module de configuration et une représentation de tableau de bord d'un ensemble d'indicateurs.

1.
### Interface de configuration :

- Permettra la sélection d'un groupe d'indicateurs DHIS2 à utiliser pour la génération du tableau de bord.
- Permettra de définir le type de graphiques et la sélection des indicateurs à afficher sur ce graphique.
- Ordre des graphiques

1.
### Interface du tableau de bord

- Affichage d'un tableau de bord adapté aux mobiles s'ajustant automatiquement aux dimensions de l'écran (Mobile ou Desktop)
- Possibilité de passer du mode graphique au mode tableau ainsi qu'à la carte
- Possibilité d'explorer d'un niveau d'unité d'organisation supérieur à inférieur

1.
### Module de rapport

- Possibilité de télécharger le tableau de bord au format PDF ou image.

1.
## Phase 2 : Application d'affichage du tableau de bord Android

Au cours de cette phase initiale, une application Android sera développée qui ne téléchargera que le tableau de bord généré à l'aide de l'application mobile conviviale DHIS2 basée sur le Web au format PDF ou Image et l'affichera sur le téléphone mobile hors ligne.

1.
## Phase 3 : Application de tableau de bord dynamique hors ligne entièrement configurable pour Android

Au cours de cette phase, l'application évoluera pour permettre le téléchargement des métadonnées et d'une certaine quantité de données liées à un ensemble sélectionné d'indicateurs pendant un certain nombre de périodes sur l'appareil mobile et permettre utiliser dans un ensemble prédéfini de graphiques conçus pour être utilisés sur l'application de téléphonie mobile.

## Spécifications techniques

### Langage de programmation :

Au cours des phases 1, l'application mobile DHIS2 sera développée à l'aide du langage de programmation JavaScript et des bibliothèques suivantes :

- REACT.js pour le développement de l'application
- Bootstrap pour le moteur de modèle
- Highchart pour la génération de tableaux de bord

Aux phases 2 et 3, l'Android L'application sera développée en utilisant le langage de programmation JavaScript.

## mise

| Fonctionnalité | Description |
Temps de développement | Responsable |
| --- | --- | --- | --- |
| Janvier | Février |
 |
| Semaines | Semaines |
 |
| 1 | 2 | 3 | 4 | 1 | 2 | 3 |
 |
| Application mobile DHIS2 Développement frontend | Affichage ajustable des graphiques en fonction de la taille de l'écran - conception réactive, mise en page spéciale | x | x |
 |
 |
 |
 |
 |
 |
| Développement backend de l'application mobile DHIS2 | Sélection de indicateurs à utiliser pour l'interface de génération de graphiques Interface
de paramétrage des graphiques |
 | x |
 |
 |
 |
 |
 |
 |
| Module de génération de tableaux de bord PDF |
 |
 | x |
 |
 |
 |
 |
 |
 |
| graphiques |
 |
 | x | x | x |
 |
 |
 |
 |
| comparer les résultats avec des cibles prédéfinies |
 |
 |
 |
 |
 |
 |
 |
 |
| comparaisons d'orgunits |
 |
 |
 |
 |
 |
 |
 |
 |
| Graphique permettant des comparaisons d'Orgunits dans le temps |
 |
 |
 |
 |
 |
 |
 |
 |
| 2-3 indicateurs de vue dans le temps graphique |
 |
 |
 |
 |
 |
 |
 |
 |
| Intégration de graphiques de cartes |
 |
 |
 |
 |
 |
 |
 |
 |
| niveau |
 |
 |
 |
 |
 |
 |
 |
 |
| conversion dynamique graphique/tableau/carte |
 |
 |
 |
 |
 |
 |
 |
 |
| Afficher les coordonnées GPS (par ex. répartition des centres de santé ou des ASC engagés dans des activités de lutte contre le paludisme)
 |
 |
 |
 |
 |
 |
 |
 |
 |
| caractéristiques sociales - partage et commentaires |
 |
 |
 |
 |
 |
 |
 |
 |
| DHIS2 basée | Test |
 |
 | sur | application |
 |
 |
 |
 |
| le | Web le tableau de bord basé sur le Web |
 |
 |
 | x |
 |
 |
 |
 |
| Test de l'application Android v1 |
 |
 |
 |
 | x | x |
 |
 |
 |
| Application Android v2 | Génération de graphiques dynamiques basée sur les métadonnées et les données sur l'appareil mobile |
 |
 |
 |
 | x |
 | x |
 |
| Test de l'application Android v1 |
 |
 |
 |
 |
 |
 |
 | x |
 |

* * *

 [Accueil](./index.md) | [Apropos](./about.md) | Specifications | [Guides](./userguide.md)
