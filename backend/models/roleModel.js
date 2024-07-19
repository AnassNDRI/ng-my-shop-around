
const db = require('../utils/database');

const Role = function (role){
    this.id = role.id;
    this.name = role.name;
    this.createdAt = role.createdAt;
    this.updatedAt = role.updatedAt
};




module.exports = Role; 