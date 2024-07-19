//* script qui sert à renseigner les routes spécifiques aux utilisateurs et à associer pour chaque route une méthode du controlleur importé à exécuter
// il sera importé dans le fichier d'entrée index.js

/// imports de module et scripts nécessaires
// import d'express qui servira à importe le router
const express = require('express');

const auth = require('../middleware/auth');
// import du controlleur spécifique
const articleController = require('../controllers/article_Ctrl');
// import du router d'express  pour permettre la navigation
const router = express.Router();

///routes
router.post('/register', auth, articleController.create);
router.put('/update/:id', auth,  articleController.update);
router.delete('/delete/:id', auth, articleController.delete);
router.get('/list', articleController.fetchAll);
router.get('/detail/:id', articleController.findById);



// exporter le router pour le rendre accessible
module.exports = router;
