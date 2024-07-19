const LivraisonStatut = require("../models/livraison-stat_model");


exports.findById = (req, res, next) => {

    const id = req.params.id;

    LivraisonStatut.findById(id)
        .then(([livraisonStatut, fields]) => {
            if(livraisonStatut.length === 0){
                return res.status(401).json({error: 'Statut de livraison non trouvé en DB'});
            }else{
                return res.status(200).json(livraisonStatut[0]);
            }})
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.fetchAll = (req, res, next) => {

    LivraisonStatut.fetchAll()
        .then((([livraisonStatuts, fields]) => {
            if(!livraisonStatuts[0]){
                return res.status(401).json({error: 'Pas de statut de livraison en DB'});
            }else{
                return res.status(200).json(livraisonStatuts);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.create = (req, res, next) => {

    const livraisonStatut = req.body;

    LivraisonStatut.create(livraisonStatut)
        .then((([livraisonStatut, fields]) => {
            if(!livraisonStatut){
                return res.status(401).json({error: 'Pas de statut de livraison créé en DB'});
            }else{
                return res.status(200).json(livraisonStatut);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.update = (req, res, next) => {

    const livraisonStatut = req.body;

    LivraisonStatut.update(livraisonStatut)
        .then((([livraisonStatut, fields]) => {
            if(!livraisonStatut){
                return res.status(401).json({error: 'Pas de statut de livraison en DB'});
            }else{
                return res.status(200).json(livraisonStatut);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.delete = (req, res, next) => {

    const id = req.params.id;

    LivraisonStatut.delete(id)
        .then((([livraisonStatut, fields]) => {
            if(!livraisonStatut){
                return res.status(401).json({error: 'Pas de statut de livraison correspondant en DB'});
            }else{
                return res.status(200).json(livraisonStatut);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};
