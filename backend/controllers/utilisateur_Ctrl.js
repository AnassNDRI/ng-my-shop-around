
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Utilisateur = require("../models/utilisateur_model");
const Role = require("../models/role_model");



exports.register = (req, res, next) => {

    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email.toLowerCase();
    const mdp = req.body.mdp;
    const dateNaissance = req.body.dateNaissance;
    const telephone = req.body.telephone;
    const gsm = req.body.gsm;
    const role = 2;
    const actif = true;

    bcrypt.hash(mdp, 10)
    .then((encryptedPassword) => {
        console.log(encryptedPassword)
        const utilisateur = new Utilisateur(
                        nom,
                        prenom,
                        email,
                        encryptedPassword,
                        dateNaissance,
                        role,
                        telephone,
                        gsm,
                        actif
        )
        //console.log(utilisateur)
        Utilisateur.create(utilisateur)
        .then(([rows, fields])=>{
            Role.findById(utilisateur.roleId).then(([role, fields]) => {

                const isAdmin =  role[0].actif && role[0].libelle == 'admin';
                const isEmploye =  role[0].actif && role[0].libelle == 'employe';

                res.status(200).json({
                    id: rows.insertId,
                    jwt: jwt.sign(
                        {id: rows.insertId, admin: isAdmin, employe: isEmploye},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '3h'}
                    )
                });

            });

        })
        .catch(error => {
            console.error(error);
            if(error){
                res.status(500).json({error});
            }
        });
    })
    .catch(error => {
        console.error(error);
        if(error){
            res.status(500).json({error});
        }    
    });
};

exports.login = (req, res, next) => {
    const email = req.body.email.toLowerCase();
    const mdp = req.body.mdp;
    Utilisateur.findByEmail(email)
    .then((([utilisateur, fields]) => {
        if(!utilisateur[0]){
            return res.status(401).json({error: 'Utilisateur inconnu de la DB'});
        }
        Role.findById(utilisateur[0].roleId).then(([role, fields]) => {

            const isAdmin =  role[0].actif && role[0].libelle === 'admin';
            const isEmploye =  role[0].actif && role[0].libelle === 'employe';
            const isClient =  role[0].actif && role[0].libelle === 'client';

            bcrypt.compare(mdp, utilisateur[0].mdp)
                .then((valid) => {
                    if(!valid){
                        return res.status(401).json({error: 'Accès non authorisé'});
                    }
                    res.status(200).json({
                        jwt: jwt.sign(
                            {id: utilisateur[0].id, admin: isAdmin, employe: isEmploye, client: isClient },
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '10h'}
                        )
                    });
                })
                .catch(error => {
                    if(error){
                        return res.status(500).json({ error });
                    }
                });
        });

    }))
    .catch(error => {
        if(error){
            return res.status(500).json({error});
        }    
    });

};


exports.fetchAll = (req, res, next) => {
    Utilisateur.fetchAll()
        .then(([utilisateurs, fields]) => {
            if (!utilisateurs[0]){
                return res.status(401).json({error: 'Utilisateur(s) non trouvé(s) en DB'});
            }else{
                return res.status(200).json(utilisateurs);
            }
        })
        .catch(error => {
            if (error){
                return res.status(500).json({error});
            }
        });
};


exports.create = (req, res, next) => {
    const utilisateur = req.body;

    Utilisateur.create(utilisateur)
        .then(([utilisateur, fields]) => {
            if (!utilisateur){
                return res.status(401).json({error : 'Utilisateur non trouvé en DB'});
            }else{
                return res.status(200).json(utilisateur);
            }
        })
        .catch(error => {
            if (error){
                return res.status(500).json({error});
            }
        });
};


exports.update = (req, res, next) => {
    const utilisateur = req.body;

    Utilisateur.update(utilisateur)
        .then(([utilisateur, fields])=> {
            if (!utilisateur){
                return res.status(401).json({error: 'Utilisateur non trouvé en DB'});
            }else{
                return res.status(200).json(utilisateur);
            }
        })
        .catch(error => {
            if (error){
                return res.status(500).json({error});
            }
        });
};

exports.findById = (req, res, next) => {
    const utilisateurId = req.params.id;

    Utilisateur.findById(utilisateurId)
        .then(([utilisateur, fields]) => {
            if (utilisateur.length === 0){
                return res.status(401).json({error: 'Utilisateur non trouvé en DB'});
            } else{
                return res.status(200).json(utilisateur[0]);
            }
        })
        .catch(error => {
            if (error){
                return res.status(500).json({error});
            }
        });
};

exports.account = (req, res, next) => {
    const utilisateurId = req.headers.userId;
    console.log(utilisateurId);

    Utilisateur.findById(utilisateurId)
        .then(([utilisateur, fields]) => {
            if (utilisateur.length === 0){
                return res.status(401).json({error: 'Compte non trouvé en DB'});
            } else{
                return res.status(200).json(utilisateur[0]);
            }
        })
        .catch(error => {
            if (error){
                return res.status(500).json({error});
            }
        });
};

exports.delete = (req, res, next) => {
    const utilisateurId = req.params.id;

    Utilisateur.delete(utilisateurId)
        .then(([utilisateur, fields]) => {
            if (utilisateur.length === 0){
                return res.status(401).json({error: 'Utilisateur non trouvée en DB'});
            }else{
                return res.status(200).json(utilisateur[0]);
            }
        })
        .catch(error => {
            if (error) {
                return res.status(500).json(error);
            }
        });
};
