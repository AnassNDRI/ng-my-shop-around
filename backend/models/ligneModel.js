const db = require('../utils/database');

class Cmd {
    constructor(comd_user_id, comd_total, comd_statut, comd_date ){


        this.comd_user_id = comd_user_id;
        this.comd_total   = comd_total;
        this.comd_statut  = comd_statut;
        this.comd_date    = comd_date;
    }

    static findByEmail(email){
        return db.execute(
            `SELECT user_id AS userId , user_mdp, user_email FROM users  WHERE user_email = "${email}"`
        );
    }


    static create(cmd){
        return db.execute(
            "INSERT INTO commandes (comd_user_id, comd_total, comd_statut, comd_date) VALUES (?,?,?,?)", [cmd.comd_user_id, cmd.comd_total, cmd.comd_statut, cmd.comd_date]
        );
    }

    static fetchAll(){
        return db.execute(
            'SELECT comd_id, comd_user_id, comd_total, comd_statut, comd_date FROM commandes'
        );
    }
}

module.exports = Cmd;

