const db = require('../utils/database');

class FactureStatut {
    constructor(libelle, actif){
        this.libelle = libelle;
        this.actif = actif;
    }


    static findById(id) {
        return db.execute(
            `SELECT facture_statut_id  as id,
                        facture_statut_libelle as libelle,
                        facture_statut_actif   as actif
                 FROM facture_statuts
                 WHERE facture_statut_id = "${id}"`
        );
    }

    static fetchAll() {
        return db.execute(
            `SELECT facture_statut_id  as id,
                        facture_statut_libelle as libelle,
                        facture_statut_actif   as actif
                FROM facture_statuts`
        );
    }

    static create(factureStatut) {
        return db.execute(
            "INSERT INTO facture_statuts (facture_statut_libelle, facture_statut_actif) VALUES (?,?)",
            [factureStatut.libelle, factureStatut.actif]
        );
    }


    static update(factureStatut) {
        return db.execute(
            "UPDATE facture_statuts SET facture_statut_libelle=?, facture_statut_actif=? WHERE facture_statut_id = ?",
            [factureStatut.libelle, factureStatut.actif, factureStatut.id]
        );
    }

    static delete(id) {
        return db.execute(
            "UPDATE facture_stauts SET facture_statut_actif=0 WHERE facture_statut_id=?",
            [id]
        );
    }


};

module.exports = FactureStatut;
