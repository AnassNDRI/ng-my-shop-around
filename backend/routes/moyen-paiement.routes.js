//* script qui sert à renseigner les routes spécifiques aux utilisateurs et à associer pour chaque route une méthode du controlleur importé à exécuter
// il sera importé dans le fichier d'entrée index.js

/// imports de module et scripts nécessaires
// import d'express qui servira à importe le router
const express = require('express');

const auth = require('../middleware/auth');
// import du controlleur spécifique
const moyenPaiementController = require('../controllers/moyen-pay_Ctrl');
// import du router d'express  pour permettre la navigation
const router = express.Router();


router.get('/list', moyenPaiementController.fetchAll);
router.get('/detail/:id', moyenPaiementController.findById);
router.post('/register', auth, moyenPaiementController.create);
router.put('/update', auth,  moyenPaiementController.update);
router.delete('/delete/:id', auth,  moyenPaiementController.delete);


// exporter le router pour le rendre accessible
module.exports = router;
