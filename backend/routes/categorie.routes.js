//* script qui sert à renseigner les routes spécifiques aux utilisateurs et à associer pour chaque route une méthode du controlleur importé à exécuter
// il sera importé dans le fichier d'entrée index.js

/// imports de module et scripts nécessaires
// import d'express qui servira à importe le router
const express = require('express');

const auth = require('../middleware/auth');
// import du controlleur spécifique
const categorieController = require('../controllers/categorie_Ctrl');
// import du router d'express  pour permettre la navigation
const router = express.Router();

///routes
router.post('/register', auth, categorieController.create);
router.put('/update/:id', auth, categorieController.update);
router.delete('/delete/:id', auth, categorieController.delete);
router.get('/list', categorieController.fetchAll);
router.get('/detail/:id', categorieController.findById);

// exporter le router pour le rendre accessible
module.exports = router;
