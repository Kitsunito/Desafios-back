const db = require('../dbConnections');

const createTableChat = async () => {
    try {
        await db.sqlite3Connection.schema.hasTable('chat').then(exists => {
            if (!exists){
                db.sqlite3Connection.schema.createTable('chat', chat => {
                    chat.increments("id").primary();
                    chat.string("mail").notNullable();
                    chat.string("message").notNullable();
                    chat.string("timeStamp").notNullable();
                }).then(console.log(`Se creó la tabla chat`));
            } else
                console.log(`La tabla chat ya estaba creada`);
        })
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

module.exports = createTableChat;