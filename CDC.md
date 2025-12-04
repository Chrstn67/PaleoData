# Cahier des Charges - Fossilisphere

## Transformation Frontend → Fullstack

---

## 📋 Stack Technique

- **Backend** : Supabase (PostgreSQL, Auth, Storage)
- **Frontend** : ViteJS (JavaScript)
- **Styling** : CSS Nested
- **Cartographie** : Leaflet.js
- **Éditeur de texte** : Draft.js + draftjs-to-html

---

## 1. Authentification et Gestion des Utilisateurs

### 1.1 Inscription

**Champs requis** :

- Pseudo (unique, 3-20 caractères)
- Email (format valide, unique)
- Mot de passe (minimum 16 caractères, doit contenir : majuscules, minuscules, chiffres, caractères spéciaux)

**Validations** :

- Vérification de l'unicité du pseudo en temps réel
- Confirmation du mot de passe
- Validation de l'email par lien de confirmation

### 1.2 Connexion

**Méthodes** :

- Connexion par pseudo + mot de passe
- Connexion par email + mot de passe
- Session persistante avec option "Se souvenir de moi"
- Récupération de mot de passe par email

### 1.3 Compte Administrateur Initial

```
Pseudo : Christian
Email : fossilisphere@outlook.com
Mot de passe : [À définir en variable d'environnement]
Rôle : super_admin
```

---

## 2. Système de Contributions et Grades

### 2.1 Types de Contributions

- Ajout d'un nouvel article (animal, documentaire, etc.)
- Correction d'un article existant
- Ajout d'informations manquantes
- Signalement d'erreurs

### 2.2 Système de Grades Paléontologiques

| Grade        | Contributions requises | Icône suggérée |
| ------------ | ---------------------- | -------------- |
| Œuf          | 0                      | 🥚             |
| Trilobite    | 50                     | 🦐             |
| Ammonite     | 100                    | 🐚             |
| Archéoptéryx | 200                    | 🦅             |
| Tricératops  | 500                    | 🦏             |
| Tyrannosaure | 1000                   | 🦖             |

**Règles** :

- Progression automatique basée sur les contributions validées
- Affichage du grade sur le profil et à côté des contributions
- Historique des grades obtenus avec dates

---

## 3. Panneau d'Administration

### 3.1 Fonctionnalités Admin

**Tableau de bord** :

- Nombre total d'utilisateurs
- Nombre d'articles en attente de validation
- Statistiques de contribution par période
- Graphiques d'activité
- - Autres statistiques utiles

**Gestion des utilisateurs** :

- Liste complète avec filtres (grade, date d'inscription, statut)
- Profil détaillé : pseudo, email, grade, nombre de contributions, date d'inscription
- Historique des contributions de chaque utilisateur
- Statistiques individuelles

**Modération** :

- Suspension temporaire (durée configurable : jours/mois)
- Exclusion définitive avec motif obligatoire
- Conservation automatique de toutes les contributions de l'utilisateur suspendu/exclu
- Notifications automatiques envoyées à l'utilisateur concerné

### 3.2 Validation des Contenus

- File d'attente des soumissions par ordre chronologique
- Prévisualisation du rendu final
- Outils d'édition intégrés pour corrections mineures
- Boutons : Valider / Refuser avec commentaire / Demander des modifications
- Historique des validations avec horodatage

---

## 4. Création et Gestion d'Articles

### 4.1 Types d'Articles

1. **Animaux** (taxonomie complète requise)
2. **Documentaires** :
   - Batailles entre paléontologues
   - Découvertes majeures
   - Fictions paléontologiques
   - Fossiles célèbres
   - Biographies de paléontologues
   - Gisements fossilifères
   - Étymologie des noms

### 4.2 Règles de Rédaction

**Formatage obligatoire** :

- Noms scientifiques en _italique_
- Citations entre guillemets
- Titres en gras
- Respect de la nomenclature binominale

**Contenu minimal requis** :

- Titre (unique)
- Type d'article (animal, documentation)
- Image principale (format : JPG/PNG, taille max : 5 Mo, dimensions min : 800x600px)
- Corps de texte (minimum 300 mots)
- Sources/références

### 4.3 Éditeur de Texte

- Interface Draft.js avec barre d'outils complète
- Conversion automatique en HTML via draftjs-to-html
- Prévisualisation en temps réel
- Sauvegarde automatique en brouillon toutes les 30 secondes
- Case "Inconnu" pour informations non disponibles

### 4.4 Structure Spécifique - Articles sur les Animaux

**Champs obligatoires** :

- Nom
- Étymologie
- Image réaliste
- Taxonomie complète (tous les rangs disponibles + noms de toutes les espèces)
- Régime alimentaire
- Habitat
- Géologie (ère, période, époque, étage, date apparition + date disparition)
- Description détaillée
- Taille/dimensions (hauteur, longueur, envergure) si connues
- Poids (grammes, kilogrammes, tonnes)
- Lieu et date de découverte
- Coordonnées géographiques (découverte + zone habitat)

**Taxonomie hiérarchique** :

```
Règne → Sous-règne → Rameau → Infra-règne → Super-embranchement →
Embranchement → Sous-embranchement → Infra-embranchement →
Micro-embranchement → Super-classe → Classe → Sous-classe → Division →
Super-ordre → Ordre → Sous-ordre → Infra-ordre → Micro-ordre →
Super-famille → Famille → Sous-famille → Tribu → Sous-tribu →
Genre → Espèce
```

**Géolocalisation** :

- Point de découverte (marqueur unique)
- Zone d'habitat (polygone sur carte Leaflet)
- Carte interactive affichée sur la page de l'article

### 4.5 Brouillon

Possibilité de concerver l'article en cours d'écriture en brouillon pour le poursuivre plus tard

---

## 5. Workflow de Publication

### 5.1 Processus de Soumission

1. **Création** : Utilisateur rédige l'article dans l'éditeur
2. **Vérification** : Contrôle automatique des champs obligatoires
3. **Soumission** : Article envoyé en file d'attente de validation
4. **Notification** : L'admin reçoit une alerte
5. **Relecture** : L'admin vérifie et corrige si nécessaire
6. **Décision** :
   - **Accepté** : Publication + notification + compteur de contributions +1
   - **Refusé** : Message explicatif envoyé à l'auteur
   - **À modifier** : Demande de corrections spécifiques

### 5.2 Mise en Avant des Nouveautés

- Badge "Nouveau" sur l'article pendant 7 jours
- Notification sur la page d'accueil
- Section dédiée "Dernières publications"
- Fil d'actualité sur le profil de l'auteur

---

## 6. Système de Messagerie Interne

### 6.1 Fonctionnalités

- Messages privés entre utilisateurs
- Contact direct avec l'administrateur
- Notifications en temps réel (badge sur l'icône de messagerie)
- Marquage des messages lus/non lus
- Suppression automatique 7 jours après lecture
- Archivage possible avant suppression

### 6.2 Interface

- Boîte de réception / Messages envoyés
- Recherche par expéditeur ou contenu
- Filtres : Non lus / Tous / Archivés
- Pièces jointes autorisées (images uniquement, max 2 Mo)

---

## 7. Système de Favoris

### 7.1 Fonctionnalités

- Ajout/retrait d'articles en favoris (icône cœur)
- Collection personnelle accessible via le profil
- Tri par : Date d'ajout / Type d'article / Ordre alphabétique
- Export possible en PDF de la liste des favoris
- Statistiques : Articles les plus mis en favoris (page admin)

---

## 8. Rendu et Affichage des Articles

### 8.1 Conversion et Formatage

- Conversion Draft.js → HTML via draftjs-to-html
- Transformation HTML → JSX pour intégration React
- Préservation exacte du formatage :
  - Sauts de ligne
  - Gras, italique, souligné
  - Listes à puces et numérotées
  - Titres et sous-titres
  - Citations

### 8.2 Affichage Public

- Page dédiée par article avec URL unique
- Navigation par catégories et filtres
- Recherche full-text
- Partage sur réseaux sociaux

---

## 9. Gestion des Taxons Manquants

### 9.1 Ajout de Nouveaux Taxons

- Si un rang taxonomique n'existe pas dans la base, l'utilisateur peut le proposer
- Formulaire spécifique : Nom du taxon + Rang + Taxon parent + Source scientifique
- Validation obligatoire par l'admin avant intégration
- Notification à l'utilisateur une fois validé

---

## 10. Échelle des Temps Géologiques

### 10.1 Gestion

- Données existantes intégrées en BDD (fournies par vous)
- Corrections uniquement (pas de création)
- Processus de validation identique aux autres articles
- Affichage sous forme de frise interactive

---

## 11. Migration des Données Existantes

### 11.1 Intégration du Code Existant

- Import des composants JSX existants
- Mapping des données vers le schéma de BDD
- Script de migration fourni
- Validation de l'intégrité des données après migration

---

## 📊 Exigences Non-Fonctionnelles

### Sécurité

- Authentification JWT via Supabase
- Row Level Security (RLS) sur toutes les tables
- Protection contre les injections SQL
- Validation côté serveur de toutes les entrées
- HTTPS obligatoire
- Protection CSRF

### Performance

- Lazy loading des images
- Pagination des listes (20 éléments par page)
- Mise en cache des articles publiés
- Optimisation des requêtes SQL (index sur champs clés)

### Accessibilité

- Conformité WCAG 2.1 niveau AA
- Navigation au clavier
- Attributs ARIA appropriés
- Contrastes de couleurs suffisants

### Compatibilité

- Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Responsive design (mobile, tablette, desktop)
