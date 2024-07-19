//* script qui sert à renseigner les routes spécifiques aux utilisateurs et à associer pour chaque route une méthode du controlleur importé à exécuter
// il sera importé dans le fichier d'entrée index.js

/// imports de module et scripts nécessaires
// import d'express qui servira à importe le router
const express = require('express');

const auth = require('../middleware/auth');
// import du controlleur spécifique
const commandeStatutController = require('../controllers/comd-statut_Ctrl');
// import du router d'express  pour permettre la navigation
const router = express.Router();


router.get('/list', commandeStatutController.fetchAll);
router.get('/detail/:id', commandeStatutController.findById);
router.post('/register', auth, commandeStatutController.create);
router.put('/upadte', auth,  commandeStatutController.update);
router.delete('/delete/:id', auth,  commandeStatutController.delete);


// exporter le router pour le rendre accessible
module.exports = router;
