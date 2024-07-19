const Role = require("../models/role_model");


exports.findById = (req, res, next) => {

    const id = req.params.id;

    Role.findById(id)
        .then((([role, fields]) => {
            if(role.length === 0){
                return res.status(401).json({error: 'Role non trouvée en DB'});
            }else{
                return res.status(200).json(role[0]);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});}
        });
};

exports.fetchAll = (req, res, next) => {

    Role.fetchAll()
        .then((([roles, fields]) => {
            if(!roles[0]){
                return res.status(401).json({error: 'Pas de role en DB'});
            }else{
                return res.status(200).json(roles);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.create = (req, res, next) => {

    const role= req.body;

    Role.create(role)
        .then((([role, fields]) => {
            if(!rolee){
                return res.status(401).json({error: 'Pas de role créé en DB'});
            }else{
                return res.status(200).json(role);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.update = (req, res, next) => {

    const role = req.body;

    Role.update(role)
        .then((([role, fields]) => {
            if(!role){
                return res.status(401).json({error: 'Pas de role en DB'});
            }else{
                return res.status(200).json(role);
            }}))
        .catch(error => {
            if(error){
                return res.status(500).json({error});
            }
        });
};

exports.delete = (req, res, next) => {

    const id = req.params.id;

    Role.delete(id)
        .then((([role, fields]) => {
            if (!role) {
                return res.status(401).json({error: 'Pas de role correspondant en DB'});
            } else {
                return res.status(200).json(role);
            }
        }))
        .catch(error => {
            if (error) {
                return res.status(500).json({error});
            }
        });
}
