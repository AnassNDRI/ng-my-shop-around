const db = require('../utils/database');

class Categ {

    constructor(categ_libel){

        this.categ_libel = categ_libel;

    }


    static create(categ){
        return db.execute(
            "INSERT INTO categories (categ_libel) VALUES (?)", [categ.categ_libel]
        );
    }

    static fetchAll(){
        return db.execute(
            'SELECT categ_id, categ_libel FROM categories'
        );
    }

    static findById(categ){
        return db.execute(
            'SELECT categ_id, categ_libel from categories where categ_id = @categ_id'
        );
    }
}

module.exports = Categ;

