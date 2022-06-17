class Api {
    constructor() {
        this.products = [];
        this.maxID = 0;
    }

    getProducts(){
        return this.products;
    }

    save(object){
        this.maxID++;
        this.products.push({...object, id: this.maxID});
    }

    getProduct(id){
        //Validamos que el parámetro recibido sea númerico
        if (isNaN(id)){
            const err = new Error("El id debe ser un número");
            err.statusCode = 400;
            throw err;
        }

        //Buscamos el producto en el array
        const product = this.products.find((product) => product.id === id);

        //Validamos si se encontró el producto o no
        if (!product) {
            const error = new Error("El producto no existe");
            error.statusCode = 404;
            throw error;
        }
        return product;
    }

    updateProduct(id, newProduct){
        //Validamos que el id sea un número
        if (isNaN(id)) {
            const err = new Error("El id debe ser un número");
            err.statusCode = 400;
            throw err;
        }
        
        //Buscamos si el producto existe
        const product = this.products.find((product) => product.id === id);

        //Si no existe avisamos de esto
        if (!product) {
            const err = new Error("El producto no existe");
            err.statusCode = 404;
            throw err;
        }
        
        this.products = this.products.map((product) => {
            if (product.id === id)
                return {...newProduct,id};
            return product;
        });
    }

    deleteProduct(id) {
        //Validamos que el parámetro recibido sea númerico
        if (isNaN(id)) {
            const err = new Error("El id debe ser un número");
            err.statusCode = 400;
            throw err;
        }
    
        //Buscamos si el producto existe
        const product = this.products.find((product) => product.id === id);

        //Si no existe avisamos de esto
        if (!product) {
            const err = new Error("El producto no existe");
            err.statusCode = 404;
            throw err;
        }

        const editedProducts = this.products.filter((product) => product.id !== id);
    
        this.products = editedProducts;
    }
}

module.exports = Api;