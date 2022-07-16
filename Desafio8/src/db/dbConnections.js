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


//Conexión a SQLite3 para chats
const configSQLite3 = {
    client: "sqlite3",
    connection: {filename: `${path.join(__dirname + "/chat.sqlite")}`},
    useNullAsDefault: true
}

const sqlite3Connection = knex(configSQLite3);



module.exports = { mysqlConnection,  sqlite3Connection};