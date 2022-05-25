class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    //Devuelve el nombre completo del usuario
    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    //Añade una mascota al array de mascotas del usuario
    addMascota(nombreMascota) {
        this.mascotas = [...this.mascotas, nombreMascota];
    }

    //Devuelve la cantidad de mascotas del usuario
    countMascotas() {
        return this.mascotas.length;
    }

    //Añade un libro a la colección de libros
    addBook(nombre, autor) {
        let book = {
            'nombre': nombre,
            'autor': autor
        }
        this.libros = [...this.libros, book];
    }

    //Listamos los títulos de los libros
    getBookNames() {
        return this.libros.map(book => book.nombre)
    }
}

//Instanciamos el usuario
const usuario = new Usuario("Pablo", "Quiña", [], ["Lucian"]);

//Por consola, mostramos el resultado de getFullName
console.log("usuario.getFullName() = ", usuario.getFullName());

//Añadimos una mascota con el método addMascota
usuario.addMascota("Sabrina");

//Por consola, mostramos el resultado de countMascotas
console.log("usuario.countMascotas() = ", usuario.countMascotas());

//Añadimos tres libros
usuario.addBook("Ética Promiscua", "Dossie Easton, Janet W. Hardy");
usuario.addBook("Harry Potter y la Orden del Fénix", "J. K. Rowling");
usuario.addBook("La Meta", "Eliyahu M. Goldratt");

//Por consola, mostramos el resultado de getBookNames
console.log("usuario.getBookNames() = ", usuario.getBookNames());f