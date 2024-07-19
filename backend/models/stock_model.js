const db = require('../utils/database');

class Stock {
    constructor(articleId, quantite, mouvement, entrepot, dateMouvement){
            this.articleId = articleId;
            this.quantite = quantite;
            this.mouvement = mouvement;
            this.entrepot = entrepot;
            this.dateMouvement = dateMouvement;
        
    }

    static findById(stockId){
        return db.execute(
            `SELECT stock_id         AS id , 
                    stock_article_id     AS articleId,
                    stock_quantite       AS quantite, 
                    stock_mouvement      AS mouvement, 
                    stock_entrepot       AS entrepot,
                    stock_date_mouvement AS dateMouvement                    
            FROM stocks
            WHERE stock_id = "${stockId}"`
        );
    }

    static findByArticleId(articleId){
        return db.execute(
            `SELECT stock_id         AS id , 
                    stock_article_id     AS articleId,
                    stock_quantite       AS quantite,
                    stock_mouvement      AS mouvement,
                    stock_entrepot       AS entrepot,
                    stock_date_mouvement AS dateMouvement
             FROM stocks LEFT JOIN articles
            ON stocks_article_id = articles_id
            WHERE sotcks_article_id = "${articleId}"`
        );
    }

    static create(stock){
        return db.execute(
            "INSERT INTO stocks (stock_article_id, stock_quantite, stock_mouvement, stock_entrepot, stock_date_mouvement) VALUES (?,?,?,?,?)",
            [stock.articleId, stock.quantite, stock.mouvement, stock.entrepot, stock.dateMouvement]
        );
    }

    static update(stock){
        return db.execute(
            "UPDATE stocks SET stock_article_id=?, stock_quantite=?, stock_mouvement=?, stock_entrepot=?, stock_date_mouvement=? WHERE stock_id = ?",
            [stock.articleId, stock.quantite, stock.mouvement, stock.entrepot, stock.dateMouvement, stock.id]
        );
    }

    static delete(id){
        return db.execute(
            "DELETE FROM stocks WHERE stock_id = ?",
            [id]
        );
    }

    static fetchAll(){
        return db.execute(
            `SELECT stock_id            AS id, 
                        stock_article_id    AS articleId, 
                        stock_quantite      AS quantite, 
                        stock_mouvement     AS mouvement,
                        stock_entrepot      AS entrepot,
                        stock_date_mouvement AS dateMouvement
            FROM stocks`
        );
    }
};

module.exports = Stock;