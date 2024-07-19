const db = require('../utils/database');

class Fournisseur {
    constructor(nom, adresse, tva, tel, email, actif){
        this.nom = nom;
        this.adresse = adresse;
        this.tva = tva;
        this.tel = tel;
        this.email = email;
        this.actif = actif;
    }

    static findById (id){
        return db.execute(
            `SELECT fournisseur_id      AS id , 
                        fournisseur_nom     AS nom, 
                        fournisseur_adresse AS adresse, 
                        fournisseur_tva     AS tva, 
                        fournisseur_tel     AS tel, 
                        fournisseur_email   AS email, 
                        fournisseur_actif   AS actif 
            FROM fournisseurs
            WHERE fournisseur_id = "${id}"`
        );
    }

    static findByName (name){
        return db.execute(
            `SELECT fournisseur_id      AS id ,
                        fournisseur_nom     AS nom,
                        fournisseur_adresse AS adresse,
                        fournisseur_tva     AS tva,
                        fournisseur_tel     AS tel,
                        fournisseur_email   AS email,
                        fournisseur_actif   AS actif
             FROM fournisseurs
            WHERE fournisseur_nom = "${name}"`
        );
    }

    static create(fournisseur){
        return db.execute(
            "INSERT INTO fournisseurs (fournisseur_nom, fournisseur_adresse, fournisseur_tva, fournisseur_tel, fournisseur_email, fournisseur_actif) VALUES (?,?,?,?,?,?)", 
            [fournisseur.nom, fournisseur.adresse, fournisseur.tva, fournisseur.tel, fournisseur.email, fournisseur.actif]
        );
    }

    static update(fournisseur){
        return db.execute(
            "UPDATE fournisseurs SET fournisseur_nom=?, fournisseur_adresse=?, fournisseur_tva=?, fournisseur_tel=?, fournisseur_email=?, fournisseur_actif=? WHERE fournisseur_id = ?",
            [fournisseur.nom, fournisseur.adresse, fournisseur.tva, fournisseur.tel, fournisseur.email, fournisseur.actif, fournisseur.id]
        );
    }

    static delete(id){
        return db.execute(
            "UPDATE fournisseurs SET fournisseur_actif=0 WHERE fournisseur_id=?",
            [id]
        );
    }

    static fetchAll (){
        return db.execute(
            `SELECT fournisseur_id  AS id,
                    fournisseur_nom     AS nom,
                    fournisseur_adresse AS adresse,
                    fournisseur_tva     AS tva,
                    fournisseur_tel     AS tel,
                    fournisseur_email   AS email,
                    fournisseur_actif   AS actif
            FROM fournisseurs
            WHERE fournisseur_actif = 1`
        );
    }
};

module.exports = Fournisseur;