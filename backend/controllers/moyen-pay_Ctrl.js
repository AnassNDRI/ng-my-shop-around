const MoyenPaiement = require("../models/moyen-pay_model");


exports.findById = (req, res, next) => {

    const id = req.params.id;

    MoyenPaiement.findById(id)
        .then((([moyenPaiement, fields]) => {
            if(moyenPaiement.length === 0){
                return res.status(401).json({error: 'Moyen de paiement  non trouvé en DB'});
            }else{
                return res.status(200).json(moyenPaiement[0]);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.fetchAll = (req, res, next) => {

    MoyenPaiement.fetchAll()
        .then((([moyenPaiements, fields]) => {
            if(!moyenPaiements[0]){
                return res.status(401).json({error: 'Pas de moyen de paiement  en DB'});
            }else{
                return res.status(200).json(moyenPaiements);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.create = (req, res, next) => {

    const moyenPaiement = req.body;

    MoyenPaiement.create(moyenPaiement)
        .then((([moyenPaiement, fields]) => {
            if(!moyenPaiement){
                return res.status(401).json({error: 'Pas de moyen de paiement  créé en DB'});
            }else{
                return res.status(200).json(moyenPaiement);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.update = (req, res, next) => {

    const moyenPaiement = req.body;

    MoyenPaiement.update(moyenPaiement)
        .then((([moyenPaiement, fields]) => {
            if(!facture){
                return res.status(401).json({error: 'Pas de moyen de paiement en DB'});
            }else{
                return res.status(200).json(moyenPaiement);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.delete = (req, res, next) => {

    const id = req.params.id;

    MoyenPaiement.delete(id)
        .then((([moyenPaiement, fields]) => {
            if(!moyenPaiement){
                return res.status(401).json({error: 'Pas de moyen de paiement correspondant en DB'});
            }else{
                return res.status(200).json(moyenPaiement);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};
