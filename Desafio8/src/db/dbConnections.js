const knex = require("knex");
const path = require("path");

//Conexión a MariaDB para Productos
const configMySQL = {
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "desafios",
    },
    pool: { min: 0, max: 7 },
};

const mysqlConnection = knex(configMySQL);


module.exports = { mysqlConnection };