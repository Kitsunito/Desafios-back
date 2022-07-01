//Socket
const socket = io();

//Products
const products = [];

//HTML Elements
const productForm = document.getElementById('productForm');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const thumbnailInput = document.getElementById('thumbnail');
const productContainer = document.getElementById('productsList');

//Render Functions
const renderProducts = async products => {
    this.products = products;
    const handlebarTemplate = await fetch('./hbs/productos.hbs');
    const plantilla = await handlebarTemplate.text();
    
    productContainer.innerHTML = "";

    if (!this.products) {
        productContainer.innerHTML = `<p>No hay productos cargados<p>`
    } else {
        this.products.forEach(product => {
            const card = Handlebars.compile(plantilla);
            const html = card(product);
            productContainer.innerHTML += html;
        })
    }
}

//Event Listeners
const submitProductHandler = e => {
    e.preventDefault();

    const title = nameInput.value;
    const price = priceInput.value;
    const thumbnail = thumbnailInput.value;

    socket.emit('client:product',{title, price, thumbnail});
}

productForm.addEventListener('submit', submitProductHandler);
socket.on('server:products', renderProducts);