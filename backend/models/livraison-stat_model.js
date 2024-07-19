const db = require('../utils/database');

class LivraisonStatut {
    constructor(libelle, actif){
        this.libelle = libelle;
        this.actif = actif;
    }


    static findById(id) {
        return db.execute(
            `SELECT livraison_statut_id  as id,
                    livraison_statut_libelle as libelle,
                    livraison_statut_actif   as actif
             FROM livraison_statuts
             WHERE livraison_statut_id = "${id}"`
        );
    }

    static fetchAll() {
        return db.execute(
            `SELECT livraison_statut_id  as id,
                    livraison_statut_libelle as libelle,
                    livraison_statut_actif   as actif
             FROM livraison_statuts`
        );
    }

    static create(livraisonStatut) {
        return db.execute(
            "INSERT INTO livraison_statuts (livraison_statut_libelle, livraison_statut_actif) VALUES (?,?)",
            [livraisonStatut.libelle, livraisonStatut.actif]
        );
    }


    static update(livraisonStatut) {
        return db.execute(
            "UPDATE livraison_statuts SET livraison_statut_libelle=?, livraison_statut_actif=? WHERE livraison_statut_id = ?",
            [livraisonStatut.libelle, livraisonStatut.actif, livraisonStatut.id]
        );
    }

    static delete(id) {
        return db.execute(
            "UPDATE livraison_statuts SET livraison_statut_actif=0 WHERE livraison_statut_id=?",
            [id]
        );
    }


};


module.exports = LivraisonStatut;