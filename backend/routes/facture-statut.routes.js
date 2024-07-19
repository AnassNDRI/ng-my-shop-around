//* script qui sert à renseigner les routes spécifiques aux utilisateurs et à associer pour chaque route une méthode du controlleur importé à exécuter
// il sera importé dans le fichier d'entrée index.js

/// imports de module et scripts nécessaires
// import d'express qui servira à importe le router
const express = require('express');

const auth = require('../middleware/auth');
const factureStatutController = require('../controllers/fact-stat_Ctrl');
const router = express.Router();

router.get('/list', factureStatutController.fetchAll);
router.get('/:id', factureStatutController.findById);
router.post('', auth, factureStatutController.create);
router.put('', auth, factureStatutController.update);
router.delete('/:id', auth, factureStatutController.delete);


// exporter le router pour le rendre accessible
module.exports = router;
