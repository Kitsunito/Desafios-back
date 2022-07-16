class ApiMessages {
    constructor(db, table) {
        this.db = db;
        this.table = table;

        const createTable = require("./db/scripts/createTableChat");
        createTable();
    };

    //Método para agregar un mensaje
    async save(message) {
        try {
            //Insertamos el mensaje en la tabla y lo devolvemos
            await this.db(this.table).insert(message);
            return message;
        } catch (error) {
            console.log(`Error al guardar: ${error}`);
        }
    }

    //Método para devolver todos los mensajes
    async getAll() {
        try {
            const messages = await this.db.from(this.table).select("*");
            return messages;
        } catch (error) {
            console.log(`Error al obtener los elementos: ${error}`);
        }
    }
}

module.exports = ApiMessages;