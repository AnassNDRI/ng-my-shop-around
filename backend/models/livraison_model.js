const db = require('../utils/database');

class Livraison {
    constructor(dateLivraison, statutId, adresseId){
        this.dateLivraison = dateLivraison;
        this.statutId = statutId;
        this.adresseId = adresseId;
    }

    static findById(id) {
        return db.execute(
            `SELECT livraison_id  as id,
                    livraison_date    as dateLivraison,
                    livraison_statut  as statutId,
                    livraison_adresse as adresseId
             FROM livraisons
             WHERE livraison_id = "${id}"`
        );
    }

    static fetchAll() {
        return db.execute(
            `SELECT livraison_id  as id,
                    livraison_date    as dateLivraison,
                    livraison_statut  as statutId,
                    livraison_adresse as adresseId
             FROM livraisons`
        );
    }

    static create(livraison) {
        return db.execute(
            "INSERT INTO livraisons (livraison_date, livraison_statut, livraison_adresse) VALUES (?,?,?)",
            [livraison.dateLivraison, livraison.statutId, livraison.adresseId]
        );
    }


    static update(livraison) {
        return db.execute(
            "UPDATE livraisons SET livraison_date=?, livraison_statut=?, livraison_adresse=? WHERE livraison_id = ?",
            [livraison.dateLivraison, livraison.statutId, livraison.adresseId, livraison.id]
        );
    }

    static delete(id) {
        return db.execute(
            "UPDATE livraisons SET livraison_actif=0 WHERE livraison_id=?",
            [id]
        );
    }

};

module.exports = Livraison;