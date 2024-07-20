const mysql = require('mysql2');
const config = require('../config/db.json');

const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
});

// Test de connexion
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
    } else {
        console.log('Connecté à la base de données MySQL');
        connection.release();
    }
});

module.exports = pool.promise();
