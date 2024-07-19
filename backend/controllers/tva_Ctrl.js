
const Tva = require("../models/tva_model");


exports.create = (req, res, next) => {
    const tva = req.body;

    Tva.create(tva)
    .then(([tva, fields]) => {
        if(!tva){
            return res.status(401).json({error: 'Tva non trouvée en DB'});
        }else{
            return res.status(200).json(tva);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.update = (req, res, next) => {
    const tva = req.body;

    Tva.update(tva)
    .then(([tva, fields]) => {
        if(!tva){
            return res.status(401).json({error: 'Tva non trouvée en DB'});
        }else{
            return res.status(200).json(tva);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.delete = (req, res, next) => {
    const tvaId = req.params.id;

    Tva.delete(tvaId)
    .then(([tva, fields]) => {
        if(!tva){
            return res.status(401).json({error: 'Tva non trouvée en DB'});
        }else{
            return res.status(200).json(tva);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.findById = (req, res, next) => {
    const tvaId = req.params.id;

    Tva.findById(tvaId)
    .then(([tva, fields]) => {
        if(tva.length === 0){
            return res.status(401).json({error: 'Tva non trouvée en DB'});
        }else{
            return res.status(200).json(tva)[0];
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.fetchAll = (req, res, next) => {
    Tva.fetchAll()
    .then(([tvas, fields]) => {
        if (!tvas[0]){
            return res.status(401).json({error: 'Tva non trouvée en DB'});
        }else{
            return res.status(200).json(tvas);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};
