const AdresseType = require("../models/addr-typ_model");


exports.findById = (req, res, next) => {

    const adresseId = req.params.id;

    AdresseType.findById(adresseId)
        .then((([adresseType, fields]) => {
            if(adresseType.length === 0){
                return res.status(401).json({error: 'Pas  d adresse type  trouvé dans la DB'});
            }else{
                return res.status(200).json(adresseType[0]);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.fetchAll = (req, res, next) => {

    AdresseType.fetchAll()
        .then((([adresseType, fields]) => {
            if(!adresseType[0]){
                return res.status(401).json({error: 'Pas de type d adresse  en DB'});
            }else{
                return res.status(200).json(adresseType);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.create = (req, res, next) => {

    const adresseType = req.body;

    AdresseType.create(adresseType)
        .then((([adresseType, fields]) => {
            if(!adresseType){
                return res.status(401).json({error: 'Pas de type d adresse  créé en DB'});
            }else{
                return res.status(200).json(adresseType);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.update = (req, res, next) => {

    const adresseType = req.body;

    AdresseType.update(adresseType)
        .then((([adresseType, fields]) => {
            if(!adresseType){
                return res.status(401).json({error: 'Pas de statut de facture en DB'});
            }else{
                return res.status(200).json(adresseType);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.delete = (req, res, next) => {

    const id = req.params.id;

    AdresseType.delete(id)
        .then((([adresseType, fields]) => {
            if (!adresseType) {
                return res.status(401).json({error: 'N\'existe pas en DB'});
            } else {
                return res.status(200).json(adresseType);
            }
        }))
        .catch(error => {
            if (error) {
                return res.status(500).json({error});
            }
        });
}
