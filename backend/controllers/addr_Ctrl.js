
const Adresse = require("../models/addr_model");


exports.findById = (req, res, next) => {

    const id = req.params.id;

     Adresse.findById(id)
            .then((([adresse, fields]) => {
            if(adresse.length === 0){
                return res.status(401).json({error: 'Adresse non trouvée en DB'});
            }else{
                return res.status(200).json(adresse[0]);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.fetchAll = (req, res, next) => {

    Adresse.fetchAll()
        .then((([adresse, fields]) => {
            if(!adresse[0]){
                return res.status(401).json({error: 'Pas d adresse en DB'});
            }else{
                return res.status(200).json(adresse);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.create = (req, res, next) => {

    const adresse = req.body;

    Adresse.create(adresse)
        .then((([adresse, fields]) => {
            if(!adresse){
                return res.status(401).json({error: 'Pas d adresse créée en DB'});
            }else{
                return res.status(200).json(adresse);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.update = (req, res, next) => {

    const adresse = req.body;

    Adresse.update(adresse)
        .then((([adresse, fields]) => {
            if(!adresse){
                return res.status(401).json({error: 'Pas d adresse en DB'});
            }else{
                return res.status(200).json(adresse);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.delete = (req, res, next) => {

    const id = req.params.id;

    Adresse.delete(id)
        .then((([adresse, fields]) => {
            if(!adresse){
                return res.status(401).json({error: 'Pas d adresse correspondante en DB'});
            }else{
                return res.status(200).json(adresse);
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

    Adresse.findByAccount(utilisateurId)
        .then((([adresses, fields]) => {
            if (!adresses[0]) {
                return res.status(401).json({error: 'Pas d\'adresse correspondante en DB pour cet utilisateur'});
            } else {
                return res.status(200).json(adresses);
            }
        }))
        .catch(error => {
            if (error) {
                return res.status(500).json({error});
            }
        });
}
