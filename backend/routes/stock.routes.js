//* script qui sert à renseigner les routes spécifiques aux utilisateurs et à associer pour chaque route une méthode du controlleur importé à exécuter
// il sera importé dans le fichier d'entrée index.js

/// imports de module et scripts nécessaires
// import d'express qui servira à importe le router
const express = require('express');

const auth = require('../middleware/auth');
// import du controlleur spécifique
const stockController = require('../controllers/stock.Ctrl');
// import du router d'express  pour permettre la navigation
const router = express.Router();

///routes
router.post('', auth, stockController.create);
router.put('', auth, stockController.update);
router.delete('/:id', auth, stockController.delete);
router.get('/list', auth, stockController.fetchAll);
router.get('/:id',  auth, stockController.findById);

// exporter le router pour le rendre accessible
module.exports = router;
