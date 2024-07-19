                                                                                                                                                                                                                                                                                            const db = require('../utils/database');
class CommandeStatut {
    constructor(libelle, actif){
        this.libelle = libelle;
        this.actif = actif;
    }

    static findById(id) {
        return db.execute(
            `SELECT commande_statut_id  as id,
                    commande_statut_libelle as libelle,
                    commande_statut_actif   as actif
             FROM commande_statuts
             WHERE commande_statut_id = "${id}"`
        );
    }

    static fetchAll() {
        return db.execute(
            `SELECT commande_statut_id  as id,
                    commande_statut_libelle as libelle,
                    commande_statut_actif   as actif
             FROM commande_statuts`
        );
    }

    static create(commandeStatut) {
        return db.execute(
            "INSERT INTO commande_statuts (commande_statut_libelle, commande_statut_actif) VALUES (?,?)",
            [commandeStatut.libelle, commandeStatut.actif]
        );
    }


    static update(commandeStatut) {
        return db.execute(
            "UPDATE commande_statuts SET commande_statut_libelle=?, commande_statut_actif=? WHERE commande_statut_id = ?",
            [commandeStatut.libelle, commandeStatut.actif, commandeStatut.id]
        );
    }

    static delete(id) {
        return db.execute(
            "UPDATE commande_statuts SET commande_statut_actif=0 WHERE commande_statut_id=?",
            [id]
        );
    }


};

module.exports = CommandeStatut;