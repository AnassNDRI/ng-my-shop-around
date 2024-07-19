const db = require('../utils/database');

class Adresse {
    constructor(utilisateurId, rue, numero, boite, codePostal, ville, pays, adresseTypeId){
        this.utilisateurId = utilisateurId;
        this.nom_utilisateur = nom_utilisateur ;
        this.rue = rue ;
        this.numero = numero;
        this.boite = boite;
        this.codePostal = codePostal;
        this.ville = ville;
        this.pays=pays;
        this.adresseTypeId = adresseTypeId;
    }

    static findById(id) {
        return db.execute(
            `SELECT adresse_id                 AS id,
                    utilisateur_id             AS utilisateurId,
                    adresse_rue                AS rue,
                    adresse_numero             AS numero,
                    adresse_boite              AS boite,
                    adresse_cp                 AS codePostal,
                    adresse_ville              AS ville,
                    adresse_pays               AS pays,
                    adresse_type               AS adresseTypeId
             FROM adresses
             WHERE adresse_id = "${id}"`
        );
    }

    static fetchAll() {
        return db.execute(
            ` SELECT adresse_id                AS id,
                        utilisateur_id             AS utilisateurId,
                        adresse_rue                AS rue,
                        adresse_numero             AS numero ,
                        adresse_boite              AS boite,
                        adresse_cp                 AS codePostal,
                        adresse_ville              AS ville ,
                        adresse_pays               AS pays,
                        adresse_type               AS adresseTypeId
                    FROM adresses`
        );
    }

    static create(adresse) {
        return db.execute(
            "INSERT INTO adresses (utilisateur_id,adresse_rue,adresse_numero,adresse_boite,adresse_cp,adresse_ville,adresse_pays, adresse_type) VALUES (?,?,?,?,?,?,?,?)",
            [adresse.utilisateurId, adresse.rue, adresse.numero, adresse.boite, adresse.codePostal, adresse.ville, adresse.pays, adresse.adresseTypeId]
        );
    }


    static update(adresse) {
        return db.execute(
            "UPDATE adresses SET  `utilisateur_id`=?,`adresse_rue`=?,`adresse_numero`=?,`adresse_boite`=?,`adresse_cp`=?,`adresse_ville`=?,`adresse_pays`=?, `adresse_type`=? where `adresse_id`=?",
            [ adresse.utilisateurId, adresse.rue, adresse.numero, adresse.boite, adresse.codePostal, adresse.ville, adresse.pays, adresse.adresseTypeId, adresse.id]
        );
    }

    static delete(id) {
        return db.execute(
            "DELETE FROM adresses WHERE adresse_id = ?",
            [id]
        );
    }

    static findByAccount(utilisateurId){
        return db.execute(
            `SELECT adresse_id     AS id,
                        adresses.utilisateur_id AS utilisateurId,
                        adresse_rue    AS rue,
                        adresse_numero AS numero,
                        adresse_boite  AS boite,
                        adresse_cp     AS codePostal,
                        adresse_ville  AS ville,
                        adresse_pays   AS pays,
                        adresse_type   AS adresseTypeId
             FROM adresses
                      INNER JOIN utilisateurs ON utilisateurs.utilisateur_id = adresses.utilisateur_id 
             WHERE adresses.utilisateur_id = "${utilisateurId}"`
        );
    }

};

module.exports = Adresse;

