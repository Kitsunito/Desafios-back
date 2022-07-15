const fs = require('fs');
/* Para resolver este desafío, el archivo contiene un objeto compuesto por dos keys:
1) Key que guarda en memoria el máximo ID almacenado (esto para no repetir IDs) en el caso de que se borre
algún elemento.
2) Key para almacenar la data del Contenedor */

class Contenedor {
    constructor(fileName){
        this.fileName = fileName;

        //Validamos que el archivo exista, en caso contrario, lo creamos.
        (async () => {
            await fs.promises.readFile(`./Desafio2/${this.fileName}`,'utf-8')
                .then( async (content) => {
                    content = JSON.parse(content);
                    //Si no encontramos el maxID, consideramos el archivo corrupto y lo formateamos de nuevo
                    if (!content.maxID){
                        const data = [];
                        const maxId = 0;
                        const contenido = {maxID: maxId, data: data}
                        await fs.promises.writeFile(`./Desafio2/${this.fileName}`,JSON.stringify(contenido));
                        console.log("El archivo estaba corrupto, se ha creado de nuevo.")
                    } 
                })
                .catch(async (error) => {
                    const data = [];
                    const maxId = 0;
                    const contenido = {maxID: maxId, data: data}
                    await fs.promises.writeFile(`./Desafio2/${this.fileName}`,JSON.stringify(contenido));
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
            let contenido =  JSON.parse(await fs.promises.readFile(`./Desafio2/${this.fileName}`,'utf-8'));
            const newID = contenido.maxID + 1;
            object.id = newID;
            contenido.maxID = newID;
            contenido.data = [...contenido.data, object];
            await fs.promises.writeFile(`./Desafio2/${this.fileName}`,JSON.stringify(contenido));
            return newID;
        } catch (error) {
            console.log(`Error al guardar: ${error}`);
        }
    }

    //Método para devolver un elemento según su ID
    async getById (id) {
        try {
            const contenido =  JSON.parse(await fs.promises.readFile(`./Desafio2/${this.fileName}`,'utf-8'));
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

    //Método para devolver todos los datos almacenados
    async getAll () {
        try {
            const contenido =  JSON.parse(await fs.promises.readFile(`./Desafio2/${this.fileName}`,'utf-8'));
            //Recorremos el array para identificar el objeto a devolver, en caso negativo, devolvemos null
            return contenido.data;
        } catch (error) {
            console.log(`Error al obtener los elementos: ${error}`);
        }
    }

    //Método para borrar un elemento según su ID
    async deleteById(id) {
        try {
            let contenido =  JSON.parse(await fs.promises.readFile(`./Desafio2/${this.fileName}`,'utf-8'));
            //Validamos que el id esté dentro de uno de los ID posibles para evitar recorrer un array
            //de forma innecesaria
            if (id <= contenido.maxID && id > 0){
                //Identificamos el índice del elemento
                const index = contenido.data.findIndex(object => object.id === id);
                //Si encontramos el indíce, es decir, es distinto de -1, entonces lo borramos
                // y subimos el contenido de nuevo al archivo sin este elemento.
                if (index !== -1){
                    contenido.data.splice(index,1);
                    await fs.promises.writeFile(`./Desafio2/${this.fileName}`,JSON.stringify(contenido));
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
            let contenido =  JSON.parse(await fs.promises.readFile(`./Desafio2/${this.fileName}`,'utf-8'));
            contenido.data = [];
            await fs.promises.writeFile(`./Desafio2/${this.fileName}`,JSON.stringify(contenido));
            console.log(`Se borraron todos los objetos presentes en el archivo.`);
            
        } catch (error) {
            console.log(`Error al borrar: ${error}`);
        }
    }
}



//Instanciamos el contenedor
const productos = new Contenedor("productos.txt");

//Mostramos los elementos que están guardados
productos.getAll().then(resultado => console.log(resultado));

//Instanciamos una variable para guardar el ID del próximo elemento
var idNuevoElemento;

//Cargamos un nuevo elemento
productos.save({
        title: "Rodillo",
        price: 200,
        thumbnail: './img/rodillo.png'
    }).then(resultado => {
        idNuevoElemento = resultado;
        console.log(`
                    Se cargó el nuevo elemento con ID: ${resultado}
                    `)
                
        //Mostramos el nuevo elemento
        productos.getById(idNuevoElemento).then(resultado=>console.log("\nNuevo elemento:\n",resultado,"\n"));
        //Borramos el nuevo elemento
        productos.deleteById(idNuevoElemento);        
                });

//Borramos todos los elementos
//productos.deteleAll();