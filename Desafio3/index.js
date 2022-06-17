//Inicializamos las dependencias
const fs = require('fs');
const express = require('express');
const app = express();
const port = 8080;

//Declaramos la clase contenedor
class Contenedor {
    constructor(fileName){
        this.fileName = fileName;

        //Validamos que el archivo exista, en caso contrario, lo creamos.
        (async () => {
            await fs.promises.readFile(`./Desafio3/Archivos/${this.fileName}`,'utf-8')
                .then( async (content) => {
                    content = JSON.parse(content);
                    //Si no encontramos el maxID, consideramos el archivo corrupto y lo formateamos de nuevo
                    if (!content.maxID){
                        const data = [];
                        const maxId = 0;
                        const contenido = {maxID: maxId, data: data}
                        await fs.promises.writeFile(`./Desafio3/${this.fileName}`,JSON.stringify(contenido));
                        console.log("El archivo estaba corrupto, se ha creado de nuevo.")
                    } 
                })
                .catch(async (error) => {
                    const data = [];
                    const maxId = 0;
                    const contenido = {maxID: maxId, data: data}
                    await fs.promises.writeFile(`./Desafio3/${this.fileName}`,JSON.stringify(contenido));
                    console.log(`Se produjo el error ${error}. Se ha creado el archivo ${this.fileName}.`)
                });          
        })();
    }

    //Método para agregar un objeto
    async save(object) {
        try {
            //Buscamos el contenido almacenado en el archivo, validamos el máximo id generado al momento
            //generamos un nuevo ID, actualizamos el contenido y escribimos el archivo de nuevo con este contenido
            //finalmente, devolvemos el ID que se generó.
            let contenido =  JSON.parse(await fs.promises.readFile(`./Desafio3/${this.fileName}`,'utf-8'));
            const newID = contenido.maxID + 1;
            object.id = newID;
            contenido.maxID = newID;
            contenido.data = [...contenido.data, object];
            await fs.promises.writeFile(`./Desafio3/${this.fileName}`,JSON.stringify(contenido));
            return newID;
        } catch (error) {
            console.log(`Error al guardar: ${error}`);
        }
    }

    //Método para devolver un elemento según su ID
    async getById (id) {
        try {
            const contenido =  JSON.parse(await fs.promises.readFile(`./Desafio3/Archivos/${this.fileName}`,'utf-8'));
            //Si el número es mayor que el id máximo o menor a 1, no lo buscamos
            if (id > contenido.maxID || id < 1){
                return null;
            } else {
                //Recorremos el array para identificar el objeto a devolver, en caso negativo, devolvemos null
                let object = contenido.data.find(obj => obj.id === id);
                if (object)
                    return object;
                else
                    return null;
            }
        } catch (error) {
            console.log(`Error al buscar el elemento id ${id}: ${error}`);
            return null;
        }
        
    }

    //Método para devolver un elemento aleatorio de los que están disponibles
    async getRandomProduct() {
        try {
            let contenido =  JSON.parse(await fs.promises.readFile(`./Desafio3/${this.fileName}`,'utf-8'));
            return contenido.data[Math.floor(Math.random()*contenido.data.length)];

        } catch (error) {
            console.log(`Error al intentar econtrar un elemento aleatoriamente: ${error}`);
            return null;
        }
    }

    //Método para devolver todos los datos almacenados
    async getAll () {
        try {
            const contenido =  JSON.parse(await fs.promises.readFile(`./Desafio3/${this.fileName}`,'utf-8'));
            //Recorremos el array para identificar el objeto a devolver, en caso negativo, devolvemos null
            return contenido.data;
        } catch (error) {
            console.log(`Error al obtener los elementos: ${error}`);
        }
    }

    //Método para borrar un elemento según su ID
    async deleteById(id) {
        try {
            let contenido =  JSON.parse(await fs.promises.readFile(`./Desafio3/${this.fileName}`,'utf-8'));
            //Validamos que el id esté dentro de uno de los ID posibles para evitar recorrer un array
            //de forma innecesaria
            if (id <= contenido.maxID && id > 0){
                //Identificamos el índice del elemento
                const index = contenido.data.findIndex(object => object.id === id);
                //Si encontramos el indíce, es decir, es distinto de -1, entonces lo borramos
                // y subimos el contenido de nuevo al archivo sin este elemento.
                if (index !== -1){
                    contenido.data.splice(index,1);
                    await fs.promises.writeFile(`./Desafio3/${this.fileName}`,JSON.stringify(contenido));
                    console.log(`Se borró el elemento id = ${id} exitosamente.`);
                } else {
                    console.log(`No se encontró el elemento id = ${id}.`)
                }
            } else {
                console.log(`El elemento id = ${id} no existe en la base de datos.`)
            }
        } catch (error) {
            console.log(`Error al buscar el elemento id ${id}: ${error}`);
        }
    }

    //Método para borrar todos los elementos
    //Dado que la consigna no lo especifica, en este caso se toma que el borrar todos los elementos
    //no implica reiniciar la base de datos, por lo que el id máximo generado se mantendrá.
    async deteleAll(id) {
        try {
            let contenido =  JSON.parse(await fs.promises.readFile(`./Desafio3/${this.fileName}`,'utf-8'));
            contenido.data = [];
            await fs.promises.writeFile(`./Desafio3/${this.fileName}`,JSON.stringify(contenido));
            console.log(`Se borraron todos los objetos presentes en el archivo.`);
            
        } catch (error) {
            console.log(`Error al borrar: ${error}`);
        }
    }
}

//Instanciamos el contenedor
const productos = new Contenedor("productos.txt");

//Endpoint inicial
app.get("/",(req, res) => {
    res.send(`  <H1>Desafío 3 - Curso de Backend</H1>
                <a href="./productos">Listado de Productos</a><br/>
                <a href="./productoRandom">Producto aleatorio</a>`)
})

//Endpoint para listado de productos
app.get("/productos",(req, res)=>{
    productos.getAll().then(resultado => res.send(resultado));
});

//Endpoint para producto aleatorio
app.get("/productoRandom", (req, res) => {
    productos.getRandomProduct().then(resultado => res.send(resultado));
});


//Iniciamos el servidor en el puerto indicado por parámetro
app.listen(port, (error) => {
    if (!error)
        console.log(`Servidor iniciado en puerto ${port}`);
    else
        console.warn(`Se produjo el error ${error}`);
})
