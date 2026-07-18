# 🌐 Social App — Réseau Social Full Stack

Projet réalisé dans le cadre du stage **Full Stack Development** chez [CodeAlpha](https://www.codealpha.tech) — Tâche 2 : *Social Media Platform*.

Mini réseau social permettant de créer un compte, publier des posts, liker, commenter, suivre d'autres utilisateurs, et personnaliser son profil avec une photo — le tout dans une interface claire ou sombre au choix.

---

## 📋 Sommaire

- [Fonctionnalités](#-fonctionnalités)
- [Stack technique](#-stack-technique)
- [Structure du projet](#-structure-du-projet)
- [Installation](#-installation)
- [Compte administrateur](#-compte-administrateur)
- [Endpoints API](#-endpoints-api)
- [Choix techniques notables](#-choix-techniques-notables)
- [Améliorations possibles](#-améliorations-possibles)

---

## ✨ Fonctionnalités

**Authentification**
- Inscription et connexion sécurisées (JWT)
- Email comme identifiant

**Fil d'actualité**
- Fil public : tous les posts de tous les utilisateurs, triés du plus récent au plus ancien
- Publication de posts texte
- Like / unlike en temps réel (cœur qui se remplit)
- Commentaires sur chaque post
- Lien direct vers le profil de l'auteur depuis chaque post

**Profils**
- Photo de profil personnalisable (upload d'image)
- Bio, nombre d'abonnés et d'abonnements
- Visite du profil de n'importe quel autre utilisateur
- Système de suivi (follow / unfollow) directement depuis le fil ou le profil
- Historique des publications d'un utilisateur

**Interface**
- Mode clair / sombre avec bascule instantanée et persistance du choix
- Icônes SVG intégrées (aucune dépendance à une police externe — fonctionne même hors ligne ou avec une connexion lente)

---

## 🛠 Stack technique

| Côté | Technologies |
|---|---|
| **Frontend** | HTML5, CSS3 (design système clair/sombre), JavaScript (ES Modules, Vanilla), Bootstrap 5 |
| **Backend** | Django 6, Django REST Framework |
| **Authentification** | JWT via `djangorestframework-simplejwt` |
| **Base de données** | SQLite (développement local) |
| **Autres** | `django-cors-headers`, Pillow (gestion des images) |

---

## 📁 Structure du projet

```
CodeAlpha_SocialMedia/
├── backend/
│   ├── social_api/          # Configuration Django (settings, urls)
│   ├── users/                # Utilisateurs, profils, avatar
│   ├── posts/                # Posts, commentaires, likes, fil d'actualité
│   ├── follows/               # Système de suivi (follow/unfollow)
│   ├── media/                 # Avatars et images uploadées
│   └── manage.py
│
└── frontend/
    ├── index.html             # Fil d'actualité
    ├── login.html             # Connexion
    ├── register.html          # Inscription
    ├── profile.html           # Profil (le sien ou celui d'un autre utilisateur)
    ├── css/
    │   └── style.css          # Design complet (thème clair/sombre)
    └── js/
        ├── config.js          # URL de l'API
        ├── auth.js            # login, register, logout, gestion du token
        ├── posts.js            # Fil, création de post, like, commentaires
        ├── profile.js          # Profil, follow/unfollow, upload avatar
        ├── theme.js            # Bascule mode clair/sombre
        └── icons.js            # Bibliothèque d'icônes SVG inline
```

---

## 🚀 Installation

### Prérequis
- Python 3.10+
- Un navigateur récent

### 1. Cloner le dépôt

```bash
git clone git@github.com:jeanbaptisteassogba87-jpg/CodeAlpha_SocialMedia.git
cd CodeAlpha_SocialMedia
```

### 2. Lancer le backend (Django)

```bash
cd backend
python3 -m venv env
source env/bin/activate        # sous Linux/Mac
pip install -r requirements.txt

python manage.py migrate
python manage.py runserver
```

Le backend est accessible sur **http://127.0.0.1:8000/**.

### 3. Lancer le frontend

Dans un second terminal :

```bash
cd frontend
python3 -m http.server 5500
```

Le site est accessible sur **http://127.0.0.1:5500/index.html**.

> ⚠️ Le backend doit tourner en même temps que le frontend pour que le site fonctionne (l'API est appelée depuis `js/config.js`).

---

## 🔑 Compte administrateur

Aucun identifiant n'est fourni dans ce dépôt pour des raisons de sécurité. Pour créer ton propre compte administrateur après l'installation :

```bash
python manage.py createsuperuser
```

Connecte-toi ensuite sur **http://127.0.0.1:8000/admin/**.

Pour tester le réseau social, crée simplement un ou plusieurs comptes depuis la page d'inscription (`register.html`) — deux comptes minimum permettent de tester le fil public, le suivi et les interactions entre utilisateurs.

---

## 🔌 Endpoints API

| Méthode | Endpoint | Description | Auth requise |
|---|---|---|---|
| POST | `/api/users/` | Inscription | Non |
| POST | `/api/token/` | Connexion (obtenir un token JWT) | Non |
| GET | `/api/me/` | Profil de l'utilisateur connecté | Oui |
| PATCH | `/api/me/avatar/` | Mettre à jour la photo de profil | Oui |
| GET | `/api/profile/<id>/` | Profil public d'un utilisateur | Oui |
| GET | `/api/feed/` | Fil d'actualité (tous les posts) | Oui |
| GET | `/api/posts/?author=<id>` | Posts d'un utilisateur précis | Oui |
| POST | `/api/posts/` | Créer un post | Oui |
| POST | `/api/posts/<id>/like/` | Liker un post | Oui |
| POST | `/api/posts/<id>/unlike/` | Retirer son like | Oui |
| POST | `/api/comments/` | Ajouter un commentaire | Oui |
| POST | `/api/follow/<id>/` | Suivre un utilisateur | Oui |
| POST | `/api/unfollow/<id>/` | Ne plus suivre un utilisateur | Oui |
| GET | `/api/followers/<id>/` | Liste des abonnés d'un utilisateur | Oui |
| GET | `/api/following/<id>/` | Liste des abonnements d'un utilisateur | Oui |

L'authentification se fait via un header `Authorization: Bearer <token>`.

---

## 💡 Choix techniques notables

- **Icônes en SVG inline plutôt qu'une police d'icônes externe** : évite tout scintillement ou affichage de texte brut en cas de connexion lente ou coupée, puisque rien n'a besoin d'être téléchargé depuis un CDN pour afficher les icônes.
- **Fil d'actualité public** : plutôt qu'un fil strictement limité aux abonnements (ce qui rendrait l'application vide pour un nouvel utilisateur sans abonnés), tous les posts sont visibles par tous — le follow sert à structurer les relations sociales sans bloquer la découverte de contenu.
- **JWT avec une durée de vie de 24h** : adapté à un contexte de démonstration/développement, pour éviter des déconnexions trop fréquentes pendant les tests.

---

## 🔧 Améliorations possibles

- Notifications en temps réel (nouveaux likes, commentaires, abonnés) via WebSockets
- Pagination du fil d'actualité pour de meilleures performances à grande échelle
- Upload d'images dans les posts (le modèle le permet déjà, l'interface reste à ajouter)
- Système de recherche d'utilisateurs
- Système de refresh token pour prolonger une session sans reconnexion manuelle

---

## 👤 Auteur

Projet réalisé par **Jean-Baptiste Assogba** dans le cadre du stage CodeAlpha (Full Stack Development).
