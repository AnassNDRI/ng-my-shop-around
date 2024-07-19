//* script qui sert à renseigner les routes spécifiques aux utilisateurs et à associer pour chaque route une méthode du controlleur importé à exécuter
// il sera importé dans le fichier d'entrée index.js

/// imports de module et scripts nécessaires
// import d'express qui servira à importe le router
const express = require('express');

const auth = require('../middleware/auth');
// import du controlleur spécifique
const utilisateurController = require('../controllers/utilisateur_Ctrl');
// import du router d'express  pour permettre la navigation
const router = express.Router();


///routes
//route de création d'un utilisateur
// verbe http (POST)
//params : le bout d'url, le controlleur et sa méthode
//router.post('/', userController.createUser);


router.post('/register', utilisateurController.register);
router.post('/login', utilisateurController.login);
router.post('', auth, utilisateurController.create);
router.put('/update/:id', auth,  utilisateurController.update);
router.get('/list', utilisateurController.fetchAll);
router.get('/account', auth,  utilisateurController.account);
router.get('/detail/:id', auth,   utilisateurController.findById);
router.delete('/delete/:id', auth, utilisateurController.delete);

// exporter le router pour le rendre accessible
module.exports = router;
