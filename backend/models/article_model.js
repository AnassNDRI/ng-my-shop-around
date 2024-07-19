const db = require('../utils/database');

class Article {
    constructor(intitule, codeBarre, prix, tvaId, marqueId, categorieId, description, url, actif, fournisseurId){
        this.intitule = intitule;
        this.codeBarre = codeBarre;
        this.prix = prix;
        this.tvaId = tvaId;
        this.marqueId = marqueId;
        this.categorieId = categorieId;
        this.description = description;
        this.url = url;
        this.actif = actif;
        this.fournisseurId = fournisseurId;
    }

    static findById(id){
        return db.execute(
            `SELECT article_id               AS id,
                    article_intitule         AS intitule,
                    article_code_barre       AS codeBarre,
                    article_prix             AS prix,
                    article_tva              AS tvaId,
                    article_marque           AS marqueId,
                    article_categorie        AS categorieId,
                    article_description      AS description,
                    article_url              AS url,
                    article_actif            AS actif,
                    article_fournisseur_id   AS fournisseurId
                   
            FROM articles
            WHERE article_id = "${id}"`
        );
    }

    static create (article){
        console.log(article);
        return db.execute(
            "INSERT INTO articles (article_intitule, article_code_barre, article_prix, article_tva, article_marque, article_categorie, article_description, article_url,  article_actif, article_fournisseur_id) VALUES (?,?,?,?,?,?,?,?,?,?)",
            [article.intitule, article.codeBarre, article.prix ,article.tvaId, article.marqueId, article.categorieId, article.description, article.url, article.actif, article.fournisseurId]
        );
    }

    static update (article){
        return db.execute(
            "UPDATE articles SET article_intitule=?, article_code_barre=?, article_prix=?, article_tva=?, article_marque=?, article_categorie=?, article_description=?, article_url=?,  article_actif=?, article_fournisseur_id=? WHERE article_id = ?",
            [article.intitule, article.codeBarre, article.prix ,article.tvaId, article.marqueId, article.categorieId, article.description, article.url, article.actif, article.fournisseurId, article.id]
        );
    }

    static delete(id) {
        return db.execute(
            "UPDATE articles SET article_actif=0 WHERE article_id=?",
            [id]
        );
    }

    static fetchAll(){
        return db.execute(
            `SELECT article_id              AS id ,
                    article_intitule            AS intitule, 
                    article_code_barre          AS codeBarre, 
                    article_prix                AS prix,
                    article_tva                 AS tvaId, 
                    article_marque              AS marqueId, 
                    article_categorie           AS categorieId,
                    article_description         AS description, 
                    article_url                 AS url,
                    article_actif               AS actif,
                    article_fournisseur_id      AS fournisseurId        
            FROM articles
            WHERE article_actif = 1`
        );
    }
    static findByCateg(){
        return db.execute(
            `SELECT *       
            FROM articles
            WHERE article_categorie  = 1`
        );
    }

    
};

module.exports = Article;
