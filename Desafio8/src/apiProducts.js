class apiProducts {
    constructor(db, table) {
        this.db = db;
        this.table = table;

        const createTable = require('./db/scripts/createTableProduct');
        createTable();
    }

    async getProducts(){
        try {
            const products = await this.db.from(this.table).select("*");
            return products;
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    async save(product){
        try {
            const id = await this.db(this.table).insert(product);
            return id[0];
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    async getProduct(id){
        try {
            //Validamos que el parámetro recibido sea númerico
            if (isNaN(id)){
                const error = new Error("El id debe ser un número");
                error.statusCode = 400;
                throw error;
            }

            //Buscamos el producto en la tabla
            const product = await this.db.from(this.table)
                                            .where({ id });

            //Validamos si se encontró el producto o no
            if (!product) {
                const error = new Error("El producto no existe");
                error.statusCode = 404;
                throw error;
            }
            return product;
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }
        

    async updateProduct(id, newProduct){
        //Validamos que el id sea un número
        try {
            if (isNaN(id)) {
                const err = new Error("El id debe ser un número");
                err.statusCode = 400;
                throw err;
            }
            
            //Buscamos si el producto existe
            const product = await this.db.from(this.table)
                                            .where("id", "=", id)
                                            .update(product);

            //Si no existe avisamos de esto
            if (!product) {
                const err = new Error("El producto no existe");
                err.statusCode = 404;
                throw err;
            }
            
            // return product;

        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    async deleteProduct(id) {
        try {
            //Validamos que el parámetro recibido sea númerico
            if (isNaN(id)) {
                const err = new Error("El id debe ser un número");
                err.statusCode = 400;
                throw err;
            }
    
            //Buscamos si el producto existe y lo eliminamos
            const product = await this.db.from(this.table)
                                            .where("id", "=", id)
                                            .del();

            //Si no existía el dato, avisamos de esto
            if (!product) {
                const err = new Error("El producto no existe");
                err.statusCode = 404;
                throw err;
            }
        } catch (error){
            console.log(`Error: ${error}`);
        }
    } 
}

module.exports = apiProducts;