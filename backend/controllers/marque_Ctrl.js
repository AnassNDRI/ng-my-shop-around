const Marque = require("../models/marque_model");


exports.create = (req, res, next) => {
    const marque = req.body;

    Marque.create(marque)
    .then(([marque, fields]) => {
        if(!marque){
            return res.status(401).json({error: 'Marque non trouvée en DB'});
        }else{
            return res.status(200).json(marque);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.update = (req, res, next) => {
    const marque = req.body;

    Marque.update(marque)
    .then(([marque, fields]) => {
        if(!marque){
            return res.status(401).json({error: 'Marque non trouvée en DB'});
        }else{
            return res.status(200).json(marque);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.delete = (req, res, next) => {
    const marqueId = req.params.id;

    Marque.delete(marqueId)
    .then(([marque, fields]) => {
        if (!marque){
            return res.status(401).json({error: 'Marque non trouvée en DB'});
        }else{
            return res.status(200).json(marque);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.findById = (req, res, next) => {
    const marqueId = req.params.id;

    Marque.findById(marqueId)
    .then(([marque, fields]) => {
        if (marque.length === 0){
            return res.status(401).json({error: 'Marque non trouvée en DB'});
        }else{
            return res.status(200).json(marque[0]);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.fetchAll = (req, res, next) => {
    Marque.fetchAll()
    .then(([marques, fields]) => {
        if (!marques[0]){
            return res.status(401).json({error: 'Marques non trouvées en DB'});
        }else{
            return res.status(200).json(marques);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};
