const db = require('../utils/database');

class Product {
    constructor(prodName, prodPrix, prodCateg, prodDespt){
        this.prodName = prodName;
        this.prodPrix = prodPrix;
        this.prodCateg = prodCateg;
        this.prodDespt = prodDespt;
    }


    static create(product){
        return db.execute(
            "INSERT INTO products (Prod_name, Prod_Prix, Prod_categ, Prod_despt) VALUES (?,?,?,?)", [product.prodName, product.prodPrix, product.prodCateg, product.prodDespt]
        );
    }

    static fetchAll(){
        return db.execute(
            'SELECT Prod_id , Prod_name, Prod_Prix, Prod_categ, Prod_despt FROM products'
        );
    }
}

module.exports = Product;

