const Ligne = require("../models/ligne_model");


exports.findById = (req, res, next) => {

    const id = req.params.id;

    Ligne.findById(id)
        .then(([ligne, fields]) => {
            if(ligne.length === 0 ){
                return res.status(401).json({error: 'Ligne non trouvée en DB'});
            }else{
                return res.status(200).json(ligne[0]);
            }})
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.fetchAll = (req, res, next) => {

    Ligne.fetchAll()
        .then((([lignes, fields]) => {
            if(!lignes[0]){
                return res.status(401).json({error: 'Pas de ligne en DB'});
            }else{
                return res.status(200).json(lignes);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.create = (req, res, next) => {
console.log(req);
    const ligne = req.body;

    Ligne.create(ligne)
        .then((([ligne, fields]) => {
            if(!ligne){
                return res.status(401).json({error: 'Pas de ligne crée en DB'});
            }else{
                return res.status(200).json(ligne);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.update = (req, res, next) => {

    const ligne = req.body;

     Ligne.update(ligne)
          .then((([ligne, fields]) => {
             if(!ligne){
                  return res.status(401).json({error: 'Pas de ligne en DB'});
             }else{
                 return res.status(200).json(ligne);
              }}))
          .catch(error => {
              if(error){
                  return res.status(500).json({error});
                }
            });
};

exports.delete = (req, res, next) => {

    const id = req.params.id;

    Ligne.delete(id)
        .then((([ligne, fields]) => {
            if(!ligne){
                return res.status(401).json({error: 'Pas de ligne correspondante en DB'});
            }else{
                return res.status(200).json(ligne);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};
