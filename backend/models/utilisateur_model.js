const db = require('../utils/database');

class Utilisateur {
    constructor(nom, prenom, email, mdp, dateNaissance, roleId, telephone, gsm, actif){
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.mdp = mdp;
        this.dateNaissance = dateNaissance;
        this.roleId = roleId;
        this.telephone = telephone;
        this.gsm = gsm;
        this.actif = actif;
    }

    static findByEmail(email){
        return db.execute(
            `SELECT utilisateur_id   AS id, 
                        utilisateur_mdp  AS mdp,
                        utilisateur_email AS email,
                        utilisateur_role_id AS roleId
                        
                FROM utilisateurs  
                WHERE utilisateur_email = "${email}"`
        );
    }


    static findById(id){
        return db.execute(
            `SELECT utilisateur_id          AS id,
                    utilisateur_nom             AS nom,
                    utilisateur_prenom          AS prenom,
                    utilisateur_email           AS email,
                    utilisateur_mdp             AS mdp,
                    utilisateur_date_naissance  AS dateNaissance,
                    utilisateur_role_id         AS roleId,
                    utilisateur_telephone       AS telephone,
                    utilisateur_gsm             AS gsm,
                    utilisateur_actif           AS actif
            FROM utilisateurs
            WHERE utilisateur_id = "${id}"`
        );
    }


    static create(utilisateur){

        console.log(utilisateur);
        return db.execute(
            "INSERT INTO utilisateurs (utilisateur_email, utilisateur_nom, utilisateur_prenom, utilisateur_mdp, utilisateur_date_naissance, utilisateur_role_id, utilisateur_telephone, utilisateur_gsm, utilisateur_actif) VALUES (?,?,?,?,?,?,?,?,?)",
            [utilisateur.email,
                utilisateur.nom, utilisateur.prenom, utilisateur.mdp,
                utilisateur.dateNaissance, utilisateur.roleId, utilisateur.telephone,
                utilisateur.gsm, utilisateur.actif]
        );
    }

    static update (utilisateur){
        return db.execute(
            "UPDATE utilisateurs SET utilisateur_nom=?, utilisateur_prenom=?, utilisateur_email=?, utilisateur_mdp=?, utilisateur_date_naissance=?, utilisateur_role_id=?, utilisateur_telephone=?, utilisateur_gsm=?, utilisateur_actif=? WHERE utilisateur_id = ?",
            [ utilisateur.nom, utilisateur.prenom, utilisateur.email, utilisateur.mdp, utilisateur.dateNaissance, utilisateur.roleId, utilisateur.telephone, utilisateur.gsm, utilisateur.actif, utilisateur.id]
        );
    }

    static delete(id){
        return db.execute(
            "UPDATE utilisateurs SET utilisateur_actif=0  WHERE utilisateur_id=?",
            [id]
        );
    }



    static fetchAll(){
        return db.execute(
            `SELECT utilisateur_id              AS id, 
                        utilisateur_nom             AS nom,
                        utilisateur_prenom          AS prenom,
                        utilisateur_email           AS email,
                        utilisateur_mdp             AS mdp,
                        utilisateur_date_naissance  AS dateNaissance,
                        utilisateur_role_id         AS roleId,
                        utilisateur_telephone       AS telephone,
                        utilisateur_gsm             AS gsm,
                        utilisateur_actif           AS actif
            FROM utilisateurs
            WHERE utilisateur_actif=1`
        );
    }
};

module.exports = Utilisateur;

