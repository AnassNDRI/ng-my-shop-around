const db = require('../utils/database');

class Marque {
    constructor(libelle, actif){
        this.libelle = libelle;
        this.actif = actif;
    }
    static create (marque){
        return db.execute(
            "INSERT INTO marques (marque_libelle, marque_actif) VALUES (?,?)", 
            [marque.libelle, marque.actif]
        );
    }

    static update (marque){
        return db.execute(
            "UPDATE marques SET marque_libelle=?, marque_actif=? WHERE marque_id = ?",
            [marque.libelle, marque.actif, marque.id]
        );
    }

    static delete (id){
        return db.execute(
            "UPDATE marques SET marque_actif=0 WHERE marque_id=?",
            [id]
        );
    }

    static findById(id){
        return db.execute(
            `SELECT marque_id        AS id, 
                        marque_libelle   AS libelle,
                        marque_actif     AS actif
            FROM marques
            WHERE marque_id = "${id}"`
        );
    }

    static fetchAll(){
        return db.execute(
            `SELECT marque_id    AS id,
                    marque_libelle   AS libelle,
                    marque_actif     AS actif
            FROM marques
            WHERE marque_actif = 1`
        );
    }
};

module.exports = Marque;
