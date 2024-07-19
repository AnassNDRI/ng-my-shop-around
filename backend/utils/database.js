//* script pour réaliser la connexion avec la base de données mySql
//* le fichier est importé dans les différents fichiers présents dans le dossier models

//import de la lib mysql2 pour permettre la connexion
//npm install mysql2
const mysql = require('mysql2');

//récupération du fichier JSON de config où se trouvent les params de connexion à la DB
const config = require('../config/db.json');

//création de la connexion à la DB avec passage des params contenus dans le fichier config.json
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
});


// export du module de connexion pour le rendre accessible dans les autres fichiers JS
module.exports = pool.promise();
