/*Consigna: 
1) Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. 
    El formato de los documentos debe estar en correspondencia con el que venimos utilizando 
    en el entregable con base de datos MariaDB. 
2) Definir las claves de los documentos en relación a los campos de las tablas de esa base. 
    En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos 
    (eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990). 
3) Listar todos los documentos en cada colección.
4) Mostrar la cantidad de documentos almacenados en cada una de ellas.
5) Realizar un CRUD sobre la colección de productos:
    a. Agregar un producto más en la colección de productos 
    b. Realizar una consulta por nombre de producto específico:
        i) Listar los productos con precio menor a 1000 pesos.
        ii) Listar los productos con precio entre los 1000 a 3000 pesos.
        iii) Listar los productos con precio mayor a 3000 pesos.
        iv) Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
    c. Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
    d. Cambiar el stock a cero de los productos con precios mayores a 4000 pesos. 
    e. Borrar los productos con precio menor a 1000 pesos 
6) Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. 
    Verificar que pepe no pueda cambiar la información.*/


// Creamos la bd
use ecommerce

//1 y 2
/*----Inserts iniciales----*/
//Productos
const productos = [{
    nombre: "Serrucho",
    precio: 3500,
    thumbnail: ""
},{
    nombre: "Clavos * 200",
    precio: 1000,
    thumbnail: "" 
},{
    nombre: "Martillo",
    precio: 150,
    thumbnail: ""
},{
    nombre: "Brocha",
    precio: 150,
    thumbnail: ""
},{
    nombre: "Nivel",
    precio: 200,
    thumbnail: ""
},{
    nombre: "Tornillos x 200",
    precio: 140,
    thumbnail: ""
},{
    nombre: "Alicate",
    precio: 125,
    thumbnail: ""
},{
    nombre: "Llave francesa",
    precio: 170,
    thumbnail: ""
},{
    nombre: "Llave inglesa",
    precio: 180,
    thumbnail: ""
},{
    nombre: "Pegamento",
    precio: 200,
    thumbnail: ""
}]
db.productos.insertMany(productos)

//Mensajes
const mensajes = [{
    mail: "hola@hola",
    message: "Hola!",
    timeStamp: ISODate()
},{
    mail: "hola@hola",
    message: "Cómo estás?",
    timeStamp: ISODate()
},{
    mail: "persona2@hola",
    message: "Bien. Y vos?",
    timeStamp: ISODate()
},{
    mail: "hola@hola",
    message: "Todo bien! Qué contás?",
    timeStamp: ISODate()
},{
    mail: "persona2@hola",
    message: "Acá",
    timeStamp: ISODate()
},{
    mail: "persona2@hola",
    message: "Haciendo el desafío de Coder. Vos?",
    timeStamp: ISODate()
},{
    mail: "hola@hola",
    message: "También!",
    timeStamp: ISODate()
},{
    mail: "persona2@hola",
    message: "Y? Cómo vas con eso?",
    timeStamp: ISODate()
},{
    mail: "persona2@hola",
    message: "ACá, renegando",
    timeStamp: ISODate()
},{
    mail: "hola@hola",
    message: "Ufff... yo también!",
    timeStamp: ISODate()
}]
db.mensajes.insertMany(mensajes)

//3 Listar todos los documentos en cada colección.
db.productos.find().pretty()
db.mensajes.find().pretty()

//4 Mostrar la cantidad de documentos almacenados en cada una de ellas.
db.productos.estimatedDocumentCount()
db.mensajes.estimatedDocumentCount()

// 5 Realizar un CRUD sobre la colección de productos:
    // a. Agregar un producto más en la colección de productos
db.productos.insertOne({nombre: "Listón de madera", precio: 3000, thumbnail: ""})

    // b. Realizar una consulta por nombre de producto específico:
db.productos.findOne({nombre: "Serrucho"})

        // i) Listar los productos con precio menor a 1000 pesos.
db.productos.find({"precio": {$lt: 1000}})
        // ii) Listar los productos con precio entre los 1000 a 3000 pesos.
db.productos.find({$and: [
    {"precio": {$lte: 3000}},
    {"precio": {$gte: 1000}}
]})
        // iii) Listar los productos con precio mayor a 3000 pesos.
db.productos.find({"precio": {$gt: 3000}})
        // iv) Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
db.productos.find().skip(2).limit(1).sort({"precio": 1})
    // c. Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
db.productos.updateMany({},{$set: {"stock": 100}})
    // d. Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.
db.productos.updateMany({"precio": {$gte: 4000}},{$set: {"stock": 0}})
    // e. Borrar los productos con precio menor a 1000 pesos 
db.productos.deleteMany({"precio": {$lt: 1000}})
// 6) Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. 
use admin
db.createUser(
    {
        user: "pepe",
        pwd: "asd456",
        roles: [{role: "read", db: "ecommerce"}]
    }
)
    // Verificar que pepe no pueda cambiar la información.
mongo -u pepe -p asd456
use ecommerce
db.productos.find()