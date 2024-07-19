const db = require('../utils/database');

class Commande {
    constructor(utilisateurId, totalCommande, statutId, dateCommande, livraisonId) {
        this.utilisateurId = utilisateurId;
        this.totalCommande = totalCommande;
        this.statut = statut;
        this.dateCommande = dateCommande;
        this.livraisonId = livraisonId;
    }

    static findById(id) {
        return db.execute(
            `SELECT commande_id         as id,
                    commande_utilisateur_id as utilisateurId,
                    commande_total          as totalCommande,
                    commande_statut         as statutId,
                    commande_date           as dateCommande,
                    commande_livraison_id   as livraisonId
             FROM commandes
             WHERE commande_id = "${id}"`
        );
    }

    static fetchAll() {
        return db.execute(
            `SELECT commande_id         as id,
                    commande_utilisateur_id as utilisateurId,
                    commande_total          as totalCommande,
                    commande_statut         as statutId,
                    commande_date           as dateCommande,
                    commande_livraison_id   as livraisonId
             FROM commandes
             ORDER BY commande_date DESC`
        );
    }

    static create(commande) {
        return db.execute(
            "INSERT INTO commandes (commande_utilisateur_id, commande_total, commande_statut, commande_date, commande_livraison_id) VALUES (?,?,?,?,?)",
            [commande.utilisateurId, commande.totalCommande, commande.statutId, commande.dateCommande, commande.livraisonId]
        );
    }


    static update(commande) {
        return db.execute(
            "UPDATE commandes SET commande_total=?, commande_statut=?, commande_date=? WHERE commande_id = ?",
            [commande.totalCommande, commande.statutId, commande.dateCommande, commande.id]
        );
    }

    static delete(id){
        return db.execute(
            "DELETE FROM commandes   WHERE commande_id=?",
            [id]
        );
    }


    static findByAccount(utilisateurId){
        return db.execute(
            `SELECT commande_id         as id,
                    commandes.commande_utilisateur_id as utilisateurId,
                    commande_total          as totalCommande,
                    commande_statut         as statutId,
                    commande_date           as dateCommande,
                    commande_livraison_id   as livraisonId
             FROM commandes
                      INNER JOIN utilisateurs ON utilisateurs.utilisateur_id = commandes.commande_utilisateur_id
             WHERE commandes.commande_utilisateur_id = "${utilisateurId}"
             ORDER BY commande_date DESC`
        );
    }
};


module.exports = Commande;
