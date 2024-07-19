const db = require("../utils/database");

class Ligne {

    constructor(commandeId, articleId, quantite, prixUnitaire, prixTotal){
        this.commandeId = commandeId;
        this.articleId = articleId;
        this.quantite = quantite;
        this.prixUnitaire = prixUnitaire;
        this.prixTotal = prixTotal;
    }



    static findById(id){
        return db.execute(
            `SELECT ligne_id as id,
                    commande_id as commandeId,
                    article_id as articleId,
                    ligne_quantite as quantite,
                    ligne_prix_unitaire as prixUnitaire,
                    ligne_prix_total as prixTotal
            FROM ligne
            WHERE ligne_id = "${id}"`
        );
    }

    static fetchAll (){
        return db.execute(
            `SELECT ligne_id as id, 
                commande_id as commandeId, 
                article_id as articleId, 
                ligne_quantite as quantite, 
                ligne_prix_unitaire as prixUnitaire, 
                ligne_prix_total as prixTotal
            FROM ligne`
        );
    }

    static create(ligne){
        return db.execute(
            "INSERT INTO ligne (commande_id, article_id, ligne_quantite, ligne_prix_unitaire, ligne_prix_total) VALUES (?,?,?,?,?)",
            [ligne.commandeId, ligne.articleId , ligne.quantite, ligne.prixUnitaire, ligne.prixTotal]
        );
    }

    static update(ligne){
        return db.execute(
            "UPDATE ligne SET ligne_quantite=?, ligne_prix_unitaire=?, ligne_prix_total=? WHERE ligne_id = ?",
            [ligne.quantite, ligne.prixUnitaire, ligne.prixTotal, ligne.id]
        );
    }

    static delete(id){
        return db.execute(
            "DELETE FROM ligne WHERE ligne_id = ?",
            [id]
        );
    }


    static findByArticle(article){
        return db.execute(
            `SELECT ligne_id, 
                    commande_id, 
                    article_id, 
                    ligne_quantite, 
                    ligne_prix_unitaire, 
                    ligne_prix_total
            FROM ligne LEFT JOIN articles 
            ON article_id = article_id 
            WHERE article = "${article}"`
        );
    }

};



module.exports = Ligne;