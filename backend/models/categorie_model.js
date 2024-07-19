const db = require('../utils/database');

class Categorie {
    constructor(libelle, actif){
        this.libelle = libelle;
        this.actif = actif;
    }

    static create(categorie){
        return db.execute(
            "INSERT INTO categories (categorie_libelle, categorie_actif) VALUES (?,?)", 
            [categorie.libelle, categorie.actif]
        );
    }

    static update (categorie){
        return db.execute(
            "UPDATE categories SET categorie_libelle=?, categorie_actif=? WHERE categorie_id = ?",
            [categorie.libelle, categorie.actif, categorie.id]
        );
    }

    static delete (id){
        return db.execute(
            "UPDATE categories SET categorie_actif=0 WHERE categorie_id=?",
            [id]
        );
    }

    static findById(id){
        return db.execute(
            `SELECT categorie_id AS id , 
                        categorie_libelle AS libelle, 
                        categorie_actif AS actif
            FROM categories
            WHERE categorie_id = "${id}"`
        );
    }

    static fetchAll(){
        return db.execute(
            `SELECT categorie_id        AS id ,
                        categorie_libelle   AS libelle,
                        categorie_actif     AS actif
            FROM categories
            WHERE categorie_actif = 1`
        );
    }
};

module.exports = Categorie;