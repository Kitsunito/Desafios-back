const db = require("../dbConnections");

const createTableProduct = async () => {
    try {
        await db.mysqlConnection.schema.hasTable('product').then(exists => {
            if (!exists) {
                db.mysqlConnection.schema.createTable("product", (product) => {
                product.increments("id").primary();
                product.string("title").notNullable();
                product.string("description").notNullable();
                product.string("thumbnail").notNullable();
                product.integer("price").notNullable();
                product.integer("stock").notNullable();
                }).then();
            }
        });

    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

module.exports = createTableProduct;