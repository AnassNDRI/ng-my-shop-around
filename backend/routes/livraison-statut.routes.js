//* script qui sert à renseigner les routes spécifiques aux utilisateurs et à associer pour chaque route une méthode du controlleur importé à exécuter
// il sera importé dans le fichier d'entrée index.js

/// imports de module et scripts nécessaires
// import d'express qui servira à importe le router
const express = require('express');

const auth = require('../middleware/auth');
// import du controlleur spécifique
const livraisonStatutController = require('../controllers/fact-stat_Ctrl');
// import du router d'express  pour permettre la navigation
const router = express.Router();


router.get('/list', livraisonStatutController.fetchAll);
router.get('/:id', livraisonStatutController.findById);
router.post('', auth, livraisonStatutController.create);
router.put('', auth, livraisonStatutController.update);
router.delete('/:id', auth, livraisonStatutController.delete);


// exporter le router pour le rendre accessible
module.exports = router;
