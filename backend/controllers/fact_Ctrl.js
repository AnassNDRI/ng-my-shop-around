const Facture = require("../models/facture_model");


exports.findById = (req, res, next) => {

    const id = req.params.id;

    Facture.findById(id)
        .then((([facture, fields]) => {
            if(facture.length === 0){
                return res.status(401).json({error: 'Facture non trouvée en DB'});
            }else{
                return res.status(200).json(facture[0]);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.fetchAll = (req, res, next) => {

    Facture.fetchAll()
        .then((([factures, fields]) => {
            if(!factures[0]){
                return res.status(401).json({error: 'Pas de facture en DB'});
            }else{
                return res.status(200).json(factures);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.create = (req, res, next) => {

    const facture = req.body;

    Facture.create(facture)
        .then((([facture, fields]) => {
            if(!facture){
                return res.status(401).json({error: 'Pas de facture créée en DB'});
            }else{
                return res.status(200).json(facture);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.update = (req, res, next) => {

    const facture = req.body;

    Facture.update(facture)
        .then((([facture, fields]) => {
            if(!facture){
                return res.status(401).json({error: 'Pas de facture en DB'});
            }else{
                return res.status(200).json(facture);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.delete = (req, res, next) => {

    const id = req.params.id;

    Facture.delete(id)
        .then((([facture, fields]) => {
            if(!facture){
                return res.status(401).json({error: 'Pas de facture correspondante en DB'});
            }else{
                return res.status(200).json(facture);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.findByAccount = (req, res, next) => {

    const utilisateurId = req.headers.userId;
    console.log(utilisateurId);

    Facture.findByAccount(utilisateurId)
        .then((([factures, fields]) => {
            if(!factures[0]){
                return res.status(401).json({error: 'Pas de facture correspondante en DB pour cet utilisateur'});
            }else{
                return res.status(200).json(factures);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};
