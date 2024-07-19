const db = require('../utils/database');

class Facture {
    constructor(commandeId, statutId, adresseId, dateCreation, datePaiement, dateMaj, moyenPaiementId){
        this.commandeId = commandeId;
        this.statutId = statutId;
        this.adresseId = adresseId;
        this.dateCreation = dateCreation;
        this.datePaiement = datePaiement;
        this.dateMaj = dateMaj;
        this.moyenPaiementId = moyenPaiementId;
    }

    static findById(id) {
        return db.execute(
            `SELECT facture_id              as id,
                    commande_id                 as commandeId,
                    facture_statut_id           as statutId,
                    facture_adresse_id          as adresseId,
                    date_creation               as dateCreation,
                    date_paiement               as datePaiement,
                    date_maj                    as dateMaj, 
                    facture_moyen_paiement_id   as moyenPaiementId
             FROM factures
             WHERE facture_id = "${id}"`
        );
    }

    static fetchAll() {
        return db.execute(
            `SELECT facture_id              as id,
                    commande_id                 as commandeId,
                    facture_statut_id           as statutId,
                    facture_adresse_id          as adresseId,
                    date_creation               as dateCreation,
                    date_paiement               as datePaiement,
                    date_maj                    as dateMaj,
                    facture_moyen_paiement_id   as moyenPaiementId
             FROM factures
             ORDER BY date_creation DESC`
        );
    }

    static create(facture) {
        return db.execute(
            "INSERT INTO factures (commande_id, facture_statut_id, facture_adresse_id, date_creation, date_paiement, date_maj, facture_moyen_paiement_id ) VALUES (?,?,?,?,?,?,?)",
            [facture.commandeId, facture.statutId, facture.adresseId, facture.dateCreation, facture.datePaiement, facture.dateMaj, facture.moyenPaiementId]
        );
    }


    static update(facture) {
        return db.execute(
            "UPDATE factures SET commande_id=?, facture_statut_id=?, facture_adresse_id=?, date_creation=?, date_paiement=?, date_maj=?, facture_moyen_paiement_id=? WHERE facture_id = ?",
            [facture.commandeId, facture.statutId, facture.adresseId, facture.dateCreation, facture.datePaiement, facture.dateMaj, facture.moyenPaiementId, facture.id]
        );
    }

    static delete(id) {
        return db.execute(
            "UPDATE factures SET facture_actif=0 WHERE facture_id=?",
            [id]
        );
    }

    static findByAccount(utilisateurId){
        return db.execute(
            `SELECT facture_id            AS factureId,
                    factures.commande_id      AS commandeId,
                    facture_statut_id         AS statutId,
                    facture_adresse_id        AS adresseId,
                    date_creation             AS dateCreation,
                    date_paiement             AS datePaiement,
                    date_maj                  AS dateMaj,
                    facture_moyen_paiement_id AS moyenPaiementId
             FROM factures
                      INNER JOIN commandes ON factures.commande_id = commandes.commande_id
                      INNER JOIN utilisateurs ON commandes.commande_utilisateur_id = utilisateurs.utilisateur_id
             WHERE commandes.commande_utilisateur_id = "${utilisateurId}"
             ORDER BY date_creation DESC`
        );
    }
};


module.exports = Facture;

