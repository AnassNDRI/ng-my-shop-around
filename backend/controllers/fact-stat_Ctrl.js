const FactureStatut = require("../models/fact-stat_model");


exports.findById = (req, res, next) => {

    const id = req.params.id;

    FactureStatut.findById(id)
        .then((([factureStatut, fields]) => {
            if(factureStatut.length === 0){
                return res.status(401).json({error: 'Statut de facture non trouvé en DB'});
            }else{
                return res.status(200).json(factureStatut[0]);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.fetchAll = (req, res, next) => {

    FactureStatut.fetchAll()
        .then((([factureStatuts, fields]) => {
            if(!factureStatuts[0]){
                return res.status(401).json({error: 'Pas de statut de facture en DB'});
            }else{
                return res.status(200).json(factureStatuts);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.create = (req, res, next) => {

    const factureStatut = req.body;

    FactureStatut.create(factureStatut)
        .then((([factureStatut, fields]) => {
            if(!factureStatut){
                return res.status(401).json({error: 'Pas de statut de facture créé en DB'});
            }else{
                return res.status(200).json(factureStatut);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.update = (req, res, next) => {

    const factureStatut = req.body;

    FactureStatut.update(factureStatut)
        .then((([factureStatut, fields]) => {
            if(!factureStatut){
                return res.status(401).json({error: 'Pas de statut de facture en DB'});
            }else{
                return res.status(200).json(factureStatut);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.delete = (req, res, next) => {

    const id = req.params.id;

    FactureStatut.delete(id)
        .then((([factureStatut, fields]) => {
            if(!factureStatut){
                return res.status(401).json({error: 'Pas de statut de facture correspondant en DB'});
            }else{
                return res.status(200).json(factureStatut);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};
