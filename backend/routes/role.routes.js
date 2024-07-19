//* script qui sert à renseigner les routes spécifiques aux utilisateurs et à associer pour chaque route une méthode du controlleur importé à exécuter
// il sera importé dans le fichier d'entrée index.js

/// imports de module et scripts nécessaires
// import d'express qui servira à importe le router
const express = require('express');

const auth = require('../middleware/auth');
// import du controlleur spécifique
const RoleController = require('../controllers/role.Ctrl');
// import du router d'express  pour permettre la navigation
const router = express.Router();


router.get('/list', RoleController.fetchAll);
router.get('/detail/:id', RoleController.findById);
router.post('/create', auth, RoleController.create);
router.put('/update/:id', auth, RoleController.update);
router.delete('/delete/:id', auth, RoleController.delete);


// exporter le router pour le rendre accessible
module.exports = router;
