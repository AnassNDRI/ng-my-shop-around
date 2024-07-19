const Livraison = require("../models/livraison_model");


exports.findById = (req, res, next) => {

    const id = req.params.id;

    Livraison.findById(id)
        .then(([livraison, fields]) => {
            if(livraison.length === 0){
                return res.status(401).json({error: 'Livraison non trouvée en DB'});
            }else{
                return res.status(200).json(livraison[0]);
            }})
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.fetchAll = (req, res, next) => {

    Livraison.fetchAll()
        .then((([livraisons, fields]) => {
            if(!livraisons[0]){
                return res.status(401).json({error: 'Pas de livraison en DB'});
            }else{
                return res.status(200).json(livraisons);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.create = (req, res, next) => {

    const livraison = req.body;

    Livraison.create(livraison)
        .then((([livraison, fields]) => {
            if(!livraison){
                return res.status(401).json({error: 'Pas de livraison crée en DB'});
            }else{
                return res.status(200).json(livraison);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.update = (req, res, next) => {

    const livraison = req.body;

    Livraison.update(livraison)
        .then((([livraison, fields]) => {
            if(!livraison){
                return res.status(401).json({error: 'Pas de livraison en DB'});
            }else{
                return res.status(200).json(livraison);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.delete = (req, res, next) => {

    const id = req.params.id;

    Livraison.delete(id)
        .then((([livraison, fields]) => {
            if(!livraison){
                return res.status(401).json({error: 'Pas de livraison correspondante en DB'});
            }else{
                return res.status(200).json(livraison);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};
