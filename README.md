# 🎓 Système de Gestion des Élèves

Un système de gestion des élèves développé en JavaScript qui charge les informations depuis un fichier JSON et fournit plusieurs fonctionnalités de recherche et de filtrage.

## 🚀 Fonctionnalités

- ✅ **Chargement des données** : Lecture automatique depuis `data/student.txt`
- ✅ **Affichage de la liste complète** : Tous les élèves avec leurs informations
- ✅ **Recherche par nom** : Recherche d'élèves par nom (insensible à la casse)
- ✅ **Filtrage par moyenne** : Élèves avec moyenne supérieure à une valeur
- ✅ **Statistiques générales** : Moyennes, meilleurs, plus faibles élèves
- ✅ **Gestion d'erreurs** : Validation des entrées et cas limites
- ✅ **Interface utilisateur** : Commandes intuitives et aide intégrée

## 📋 Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/student-management-system.git

# Naviguer vers le dossier
cd student-management-system

# Installer les dépendances (si nécessaire)
npm install
```

## 🎯 Utilisation

### Version interactive avec commandes (recommandée)
```bash
node commands.js
```

### Version automatique avec tests
```bash
node index.js
```

## 📋 Commandes disponibles

Une fois le programme lancé avec `node commands.js` :

| Commande | Description | Exemple |
|----------|-------------|---------|
| `list` | Afficher tous les élèves | `list` |
| `search <nom>` | Rechercher un élève | `search EMILY` |
| `filter <moyenne>` | Filtrer par moyenne | `filter 15` |
| `stats` | Afficher les statistiques | `stats` |
| `test` | Tests de gestion d'erreurs | `test` |
| `help` | Afficher l'aide | `help` |
| `quit` | Quitter le programme | `quit` |

## 📊 Exemples d'utilisation

### Recherche d'élèves
```
🎓 > search EMILY
```

### Filtrage par moyenne
```
🎓 > filter 15
```

### Statistiques
```
🎓 > stats
```

## 🧪 Tests

Le système inclut des tests automatiques pour :
- ✅ Gestion des entrées vides ou invalides
- ✅ Valeurs numériques hors limites (0-20)
- ✅ Recherches sans résultats
- ✅ Commandes inconnues
- ✅ Fichiers manquants ou corrompus

## 📁 Structure du projet

```
student-management-system/
├── index.js                 # Programme principal avec tests automatiques
├── commands.js              # Système interactif avec commandes
├── package.json             # Configuration Node.js
├── README.md                # Documentation (ce fichier)
├── .gitignore              # Fichiers à ignorer par Git
├── studentAppChallenge.md   # Instructions du challenge
└── data/
    └── student.txt          # Données des élèves (JSON)
```

## 🎯 Exigences du challenge

Ce projet répond aux exigences du challenge `studentAppChallenge.md` :

1. ✅ Programme JavaScript qui charge les données depuis `student.txt`
2. ✅ Affichage de la liste de tous les élèves
3. ✅ Recherche d'élèves par nom
4. ✅ Filtrage par moyenne supérieure
5. ✅ Gestion des cas limites et erreurs
6. ✅ Tests avec différentes commandes

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Ajouter de nouvelles fonctionnalités

## 📄 Licence

Ce projet est sous licence ISC.

---

**Développé avec ❤️ en JavaScript**
