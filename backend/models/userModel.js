const db = require('../utils/database');

class User {
    constructor(username, email, password, role){
        this.username = username;
        this.email = email;
        this.password = password;
        //   this.role = role;
    }

    static findByEmail(email){
        return db.execute(
            `SELECT user_id AS userId , user_mdp, user_email FROM users  WHERE user_email = "${email}"`
        );
    }


    static create(user){
        return db.execute(
            "INSERT INTO users (user_email, user_name, user_mdp, user_role_id) VALUES (?,?,?, 1 )", [user.email, user.username, user.password]
        );
    }
  /*
    static update(user){
        return db.execute(

        );
    }  */

    static fetchAll(){
        return db.execute(
            'SELECT user_id AS userId , user_name, user_mdp, user_email FROM users'
        );
    }
}

module.exports = User;

