const Commande = require("../models/comd_model");


exports.findById = (req, res, next) => {

    const id = req.params.id;

    Commande.findById(id)
        .then(([commande, fields]) => {
            if(commande.length === 0){
                return res.status(401).json({error: 'Commande non trouvée en DB'});
            }else{
                return res.status(200).json(commande[0]);
            }})
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.fetchAll = (req, res, next) => {

    Commande.fetchAll()
        .then((([commandes, fields]) => {
            if(!commandes[0]){
                return res.status(401).json({error: 'Pas de commande en DB'});
            }else{
                return res.status(200).json(commandes);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.create = (req, res, next) => {

    const commande = req.body;

    Commande.create(commande)
        .then((([commande, fields]) => {
            if(!commande){
                return res.status(401).json({error: 'Pas de commande crée en DB'});
            }else{
                return res.status(200).json(commande);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.update = (req, res, next) => {

    const commande = req.body;

    Commande.update(commande)
        .then((([commande, fields]) => {
            if(!commande){
                return res.status(401).json({error: 'Pas de commande en DB'});
            }else{
                return res.status(200).json(commande);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.delete = (req, res, next) => {

    const id = req.params.id;

    Commande.delete(id)
        .then((([commande, fields]) => {
            if (!commande) {
                return res.status(401).json({error: 'Pas de commande correspondante en DB'});
            } else {
                return res.status(200).json(commande);
            }
        }))
        .catch(error => {
            if (error) {
                return res.status(500).json({error});
            }
        });
};

exports.findByAccount = (req, res, next) => {

    const utilisateurId = req.headers.userId;
    console.log(utilisateurId);

    Commande.findByAccount(utilisateurId)
        .then((([commandes, fields]) => {
            if (!commandes[0]) {
                return res.status(401).json({error: 'Pas de commande correspondante en DB pour cet utilsiateur'});
            } else {
                return res.status(200).json(commandes);
            }
        }))
        .catch(error => {
            if (error) {
                return res.status(500).json({error});
            }
        });
};
