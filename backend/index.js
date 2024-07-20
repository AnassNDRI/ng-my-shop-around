
//* Points d'entrée de l'API

/// import d'express (fonctionnement de l'api)
// npm install express
const express = require('express');

/// import des routes pour l'application
const utilisateurRoutes = require ('./routes/utilisateur.routes');
const ligneRoutes = require ('./routes/ligne.routes');
const commandeRoutes = require ('./routes/commande.routes');
const livraisonStatutRoutes = require ('./routes/livraison-statut.routes');
const livraisonRoutes = require ('./routes/livraison.routes');
const factureRoutes = require ('./routes/facture.routes');
const factureStatutRoutes = require ('./routes/facture-statut.routes');
const commandeStatutRoutes = require ('./routes/commande-statut.routes');
const adresseRoutes = require ('./routes/adresse.routes');
const adresseTypeRoutes = require ('./routes/adresse-type.routes');
const roleRoutes = require ('./routes/role.routes');
const articleRoutes = require('./routes/article.routes');
const tvaRoutes = require('./routes/tva.routes');
const categorieRoutes = require('./routes/categorie.routes');
const fournisseurRoutes = require('./routes/fournisseur.routes');
const marqueRoutes = require('./routes/marque.routes');
const moyenPaiementRoutes = require('./routes/moyen-paiement.routes');
const stockRoutes = require('./routes/stock.routes');


/// express app 

//initialisation d'express
const app = express();

//affectation du port d'écoute
const ports = process.env.PORT || 3000;

//parssage de la requête au format JSON --> lors de l'appel de l'api content-type: application/json
app.use(express.json());
//parssage de la requête encodée --> lors de l'appel de l'api content-type: content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.get('/test-db', async (req, res) => {
    try {
        const [rows, fields] = await pool.query('SELECT 1 + 1 AS solution');
        res.json({ message: 'Connexion réussie', result: rows[0].solution });
    } catch (error) {
        res.status(500).json({ message: 'Erreur de connexion à la base de données', error });
    }
});

//autorisations pour la communication interdomaine définition du Header http
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//association des routes aux racines URL
app.use('/utilisateurs', utilisateurRoutes);
app.use('/lignes', ligneRoutes);
app.use('/roles', roleRoutes);
app.use('/adresses', adresseRoutes);
app.use('/adressetypes', adresseTypeRoutes);
app.use('/commandes', commandeRoutes);
app.use('/livraisonstatuts', livraisonStatutRoutes);
app.use('/livraisons', livraisonRoutes);
app.use('/factures', factureRoutes);
app.use('/facturestatuts', factureStatutRoutes);
app.use('/commandestatuts', commandeStatutRoutes);
app.use('/articles', articleRoutes);
app.use('/tvas', tvaRoutes);
app.use('/categories', categorieRoutes);
app.use('/fournisseurs', fournisseurRoutes);
app.use('/marques', marqueRoutes);
app.use('/moyenpaiements', moyenPaiementRoutes);
app.use('/stocks', stockRoutes);
app.use('/roles', roleRoutes);



//définition du port d'écoute du serveur 
app.listen(ports, () => console.log(`écoute du server sur le port ${ports}`));




