//* script qui sert à renseigner les routes spécifiques aux utilisateurs et à associer pour chaque route une méthode du controlleur importé à exécuter
// il sera importé dans le fichier d'entrée index.js

/// imports de module et scripts nécessaires
// import d'express qui servira à importe le router
const express = require('express');

const auth = require('../middleware/auth');
// import du controlleur spécifique
const livraisonController = require('../controllers/livraison_Ctrl');
// import du router d'express  pour permettre la navigation
const router = express.Router();

// @todo ne pas oublier de rajouter 'auth'
// router.post('', auth, ligneController.create);
router.get('/list', livraisonController.fetchAll);
router.get('/:id',  livraisonController.findById);
router.post('', auth, livraisonController.create);
router.put('', auth, livraisonController.update);
router.delete('/:id', auth,  livraisonController.delete);


// exporter le router pour le rendre accessible
module.exports = router;
