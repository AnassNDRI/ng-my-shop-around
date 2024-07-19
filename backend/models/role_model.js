

const db = require('../utils/database');

class Role {
    constructor (libelle,actif)
    {
        this.libelle  = libelle;
        this.actif = actif;
   }

    static findById(id) {
        return db.execute(
            `SELECT  role_id      as id,
                         role_libelle as libelle,
                         role_actif   as actif
             FROM roles
             WHERE role_id = "${id}"`
        );
    }

    static fetchAll() {
        return db.execute(
            `SELECT  role_id      as id,
                         role_libelle as libelle,
                         role_actif   as actif
             FROM roles`
        );
    }

    static create(role) {
        return db.execute(
            "INSERT INTO roles (role_libelle, role_actif) VALUES (?,?)",
            [role.libelle, role.actif]
        );
    }


    static update(role) {
        return db.execute(
            "UPDATE roles SET role_libelle=?, role_actif=? WHERE role_id = ?",
            [role.libelle, role.actif, role.id]
        );
    }

    static delete (id){
        return db.execute(
            "DELETE FROM roles WHERE role_id=?",
            [id]
        );
    }
};


module.exports = Role; 
