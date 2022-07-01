const fs = require('fs');

class Messages {
    constructor(fileName){
        this.fileName = fileName;

        //Validamos que el archivo exista, en caso contrario, lo creamos.
        (async () => {
            await fs.promises.readFile(`./Desafio6/${this.fileName}`,'utf-8')
                .then( async (content) => {
                    content = JSON.parse(content);
                    //Si no encontramos el maxID, consideramos el archivo corrupto y lo formateamos de nuevo
                })
                .catch(async (error) => {

                    const content = {}
                    await fs.promises.writeFile(`./Desafio6/${this.fileName}`,JSON.stringify(content));
                    console.log(`Se produjo el error ${error}. Se ha creado el archivo ${this.fileName}.`)
                });          
        })();
    }

    //Método para agregar un objeto
    async save(message) {
        try {
            //Buscamos el contenido almacenado en el archivo y escribimos el archivo de nuevo con este contenido
            let contenido =  JSON.parse(await fs.promises.readFile(`./Desafio6/${this.fileName}`,'utf-8'));
            contenido = [...contenido, message];
            await fs.promises.writeFile(`./Desafio6/${this.fileName}`,JSON.stringify(contenido));
        } catch (error) {
            console.log(`Error al guardar: ${error}`);
        }
    }

    //Método para devolver todos los mensajes
    async getAll () {
        try {
            const contenido =  JSON.parse(await fs.promises.readFile(`./Desafio6/${this.fileName}`,'utf-8'));
            return contenido;
        } catch (error) {
            console.log(`Error al obtener los elementos: ${error}`);
        }
    }
}

module.exports = Messages;