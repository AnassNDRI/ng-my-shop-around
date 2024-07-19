//* script qui sert à renseigner les routes spécifiques aux utilisateurs et à associer pour chaque route une méthode du controlleur importé à exécuter
// il sera importé dans le fichier d'entrée index.js

/// imports de module et scripts nécessaires
// import d'express qui servira à importe le router
const express = require('express');

const auth = require('../middleware/auth');
// import du controlleur spécifique
const fournisseurController = require('../controllers/fournisseur_Ctrl');
// import du router d'express  pour permettre la navigation
const router = express.Router();

///routes
router.post('', auth, fournisseurController.create);
router.put('', auth, fournisseurController.update);
router.delete('/:id', auth, fournisseurController.delete);
router.get('/list', fournisseurController.fetchAll);
router.get('/:id', fournisseurController.findById);
router.get('/name', fournisseurController.findByname);

// exporter le router pour le rendre accessible
module.exports = router;
