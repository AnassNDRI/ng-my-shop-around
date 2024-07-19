//* script qui sert à renseigner les routes spécifiques aux utilisateurs et à associer pour chaque route une méthode du controlleur importé à exécuter
// il sera importé dans le fichier d'entrée index.js

/// imports de module et scripts nécessaires
// import d'express qui servira à importe le router
const express = require('express');

const auth = require('../middleware/auth');
// import du controlleur spécifique
const factureController = require('../controllers/fact_Ctrl');
// import du router d'express  pour permettre la navigation
const router = express.Router();

// routes
router.get('/utilisateurs', auth, factureController.findByAccount);
router.get('/list', auth, factureController.fetchAll);
router.get('/detail/:id', auth, factureController.findById);
router.post('/register', auth, factureController.create);
router.put('/update', auth, factureController.update);
router.delete('/delete/:id', auth, factureController.delete);


// exporter le router pour le rendre accessible
module.exports = router;
