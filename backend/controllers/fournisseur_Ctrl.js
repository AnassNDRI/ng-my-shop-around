const Fournisseur = require("../models/fournisseur_model");


exports.create = (req, res, next) => {
    const fournisseur = req.body;

    Fournisseur.create(fournisseur)
    .then(([fournisseur, fields]) => {
        if (!fournisseur){
            return res.status(401).json({error : 'Fournisseur non trouvé en DB'});
        }else{
            return res.status(200).json(fournisseur);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.update = (req, res, next) => {
    const fournisseur = req.body;

    Fournisseur.update(fournisseur)
    .then(([fournisseur, fields])=> {
        if (!fournisseur){
            return res.status(401).json({error: 'Fournisseur non trouvé en DB'});
        }else{
            return res.status(200).json(fournisseur);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.delete = (req, res, next) => {
    const fournisseurId = req.params.id;

    Fournisseur.delete(fournisseurId)
    .then(([fournisseur, fields]) => {
        if (fournisseur.length === 0){
            return res.status(401).json({error: 'Fournisseur non trouvé en DB'});
        }else{
            return res.status(200).json(fournisseur[0]);
        }
    })
    .catch(error => {
        if (error) {
            return res.status(500).json(error);
        }
    });
};

exports.findById = (req, res, next) => {
    const fournisseurId = req.params.id;

    Fournisseur.findById(fournisseurId)
    .then(([fournisseur, fields]) => {
        if (fournisseur.length === 0){
            return res.status(401).json({error: 'Fournisseur non trouvé en DB'});
        }else{
            return res.status(200).json(fournisseur[0]);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.findByname = (req, res, next) => {
    const fournisseurName = req.params.name;

    Fournisseur.findByName(fournisseurName)
    .then(([fournisseur, fields]) => {
        if (!fournisseur){
            return res.status(401).json({error: 'Fournisseur non trouvé en DB'});
        }else{
            return res.status(200).json(fournisseur);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.fetchAll = (req, res, next) => {
    Fournisseur.fetchAll()
    .then(([fournisseurs, fields]) => {
        if (!fournisseurs[0]){
            return res.status(401).json({error: 'Fournisseur(s) non trouvé(s) en DB'});
        }else{
            return res.status(200).json(fournisseurs);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};
