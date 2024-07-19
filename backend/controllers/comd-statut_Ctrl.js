const CommandeStatut = require("../models/comd-stat_model");


exports.findById = (req, res, next) => {

    const id = req.params.id;

    CommandeStatut.findById(id)
        .then((([commandeStatut, fields]) => {
            if(commandeStatut.length === 0){
                return res.status(401).json({error: 'Statut de commande non trouvé en DB'});
            }else{
                return res.status(200).json(commandeStatut[0]);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.fetchAll = (req, res, next) => {

    CommandeStatut.fetchAll()
        .then((([commandeStatuts, fields]) => {
            if(!commandeStatuts[0]){
                return res.status(401).json({error: 'Pas de statut de commande en DB'});
            }else{
                return res.status(200).json(commandeStatuts);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.create = (req, res, next) => {

    const commandeStatut = req.body;

    CommandeStatut.create(commandeStatut)
        .then((([commandeStatut, fields]) => {
            if(!factureStatut){
                return res.status(401).json({error: 'Pas de statut de commande créé en DB'});
            }else{
                return res.status(200).json(commandeStatut);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.update = (req, res, next) => {

    const commandeStatut = req.body;

    CommandeStatut.update(commandeStatut)
        .then((([commandeStatut, fields]) => {
            if(!commandeStatut){
                return res.status(401).json({error: 'Pas de statut de commande en DB'});
            }else{
                return res.status(200).json(commandeStatut);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.delete = (req, res, next) => {

    const id = req.params.id;

    CommandeStatut.delete(id)
        .then((([commandeStatut, fields]) => {
            if(!commandeStatut){
                return res.status(401).json({error: 'Pas de statut de commande correspondant en DB'});
            }else{
                return res.status(200).json(commandeStatut);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};
