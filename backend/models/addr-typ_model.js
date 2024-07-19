const db = require('../utils/database');

class AdresseType {
    constructor(libelle, actif){
        this.libelle = libelle;
        this.actif = actif;
    }

    static findById(id) {
        return db.execute(
            `SELECT adresse_type_id  as id,
                        adresse_type_libelle as libelle,
                        adresse_type_actif   as actif
             FROM adresse_type
             WHERE adresse_type_id  = "${id}"`
        );
    }

    static fetchAll() {
        return db.execute(
            `SELECT adresse_type_id      as id,
                        adresse_type_libelle as libelle,
                        adresse_type_actif   as actif
             FROM adresse_type`
        );
    }

    static create(AdresseType ){
        return db.execute(
            "INSERT INTO  adresse_type (adresse_type_libelle, adresse_type_actif) VALUES (?,?)",
            [AdresseType.libelle, AdresseType.actif]
        );
    }


    static update(AdresseType) {
        return db.execute(
            "UPDATE adresse_type SET adresse_type_libelle=?, adresse_type_actif=? WHERE adresse_type_id = ?",
            [AdresseType.libelle, AdresseType.actif, AdresseType.id]
        );
    }

    static delete(id) {
        return db.execute(
            "UPDATE adresse_type SET adresse_type_actif=0 WHERE adresse_type_id=?",
            [id]
        );
    }


};

module.exports = AdresseType;
