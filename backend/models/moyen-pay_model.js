const db = require('../utils/database');

class MoyenPaiement {
    constructor(libelle, actif){
        this.libelle = libelle;
        this.actif = actif;
    }

    static findById(id) {
        return db.execute(
            `SELECT moyen_paiement_id      as id,
                        moyen_paiement_libelle as libelle,
                        moyen_paiement_actif   as actif
             FROM moyens_paiement
             WHERE moyen_paiement_id  = "${id}"`
        );
    }

    static fetchAll() {
        return db.execute(
            `SELECT moyen_paiement_id  as id,
                    moyen_paiement_libelle as libelle,
                    moyen_paiement_actif   as actif
             FROM moyens_paiement`
        );
    }

    static create(moyenPaiement) {
        return db.execute(
            "INSERT INTO moyens_paiement (moyen_paiement_libelle, moyen_paiement_actif) VALUES (?,?)",
            [moyenPaiement.libelle, moyenPaiement.actif]
        );
    }


    static update(moyenPaiement) {
        return db.execute(
            "UPDATE moyens_paiement SET moyen_paiement_libelle=?, moyen_paiement_actif=? WHERE moyen_paiement_id = ?",
            [moyenPaiement.libelle, moyenPaiement.actif, moyenPaiement.id]
        );
    }

    static delete(id) {
        return db.execute(
            "UPDATE moyen_paiement SET moyen_paiement_actif=0 WHERE moyen_paiement_id=?",
            [id]
        );
    }
};

module.exports = MoyenPaiement;