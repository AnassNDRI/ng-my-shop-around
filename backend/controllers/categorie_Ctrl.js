const Categorie = require("../models/categorie_model");


exports.create = (req, res, next) => {
    const categorie = req.body;

    Categorie.create(categorie)
    .then(([categorie, fields]) => {
        if(!categorie){
            return res.status(401).json({error: 'Catégorie non trouvée en DB'});
        }else{
            return res.status(200).json(categorie);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.update = (req, res, next) => {
    const categorie = req.body;

    Categorie.update(categorie)
    .then(([categorie, fields]) => {
        if (!categorie){
            return res.status(401).json({error: 'Catégorie non trouvée en DB'});
        }else{
            return res.status(200).json(categorie);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.delete = (req, res, next) => {
    const categorieId = req.params.id;

    Categorie.delete(categorieId)
    .then(([categorie, fields]) => {
        if (categorie.length === 0){
            return res.status(401).json({error: 'Catégorie non trouvée en DB'});
        }else{
            return res.status(200).json(categorie[0]);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.findById = (req, res, next) => {
    const categorieId = req.params.id;

    Categorie.findById(categorieId)
    .then(([categorie, fields]) => {
        if (categorie.length === 0){
            return res.status(401).json({error: 'Catégorie non trouvée en DB'});
        }else{
            return res.status(200).json(categorie[0]);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.fetchAll = (req, res, next) => {
    Categorie.fetchAll()
    .then(([categories, fields]) => {
        if (!categories[0]){
            return res.status(401).json({error: 'Catégorie(s) non trouvée(s) en DB'});
        }else{
            return res.status(200).json(categories);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};
