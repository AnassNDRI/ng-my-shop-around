const db = require('../utils/database');

class Tva{
    constructor(pct, libelle){
        this.pct = pct;
        this.libelle = libelle;
    }

    static create (tva){
        return db.execute(
            "INSERT INTO tva (tva_pct, tva_libelle) VALUES (?,?)",
            [tva.pct, tva.libelle]
        );
    }

    static update (tva){
        return db.execute(
            "UPDATE tva SET tva_pct=?, tva_libelle=? WHERE tva_id = ?",
            [tva.pct, tva.libelle, tva.id]
        );
    }

    static delete (id){
        return db.execute(
            "UPDATE tva SET tva_actif=0 WHERE tva_id=?",
            [id]
        );
    }

    static findById(id){
        return db.execute(
            `SELECT tva_id   AS id,
                        tva_pct  AS pct,
                    tva_libelle  AS libelle
            FROM tva
            WHERE tva_id = "${id}"`
        );
    }

    static fetchAll(){
        return db.execute(
            `SELECT tva_id   AS id,
                        tva_pct  AS pct,
                        tva_libelle  AS libelle
            FROM tva`
        );
    }
};

module.exports = Tva;