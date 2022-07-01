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
const chatForm = document.getElementById('chat-form');
const mailInput = document.getElementById('mail');
const messageInput = document.getElementById('message');
const chatLogContainer = document.getElementById('chat-list');

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

const renderChat = async messages => {
    const hbsTemplate = await fetch('./hbs/chatLog.hbs');
    const plantilla = await hbsTemplate.text();

    chatLogContainer.innerHTML = "";

    if (messages) {
        messages.map(message => {
            const template = Handlebars.compile(plantilla);
            const time = new Date(message.timeStamp);
            message.timeStamp = time.toLocaleString();
            const html = template(message);
            chatLogContainer.innerHTML += html;
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

const submitMessageHandler = e => {
    e.preventDefault();

    const mail = mailInput.value;
    const message = messageInput.value;
    const timeStamp = new Date();

    socket.emit('client:message', {mail,timeStamp,message});
    messageInput.value = "";
}

//Load

productForm.addEventListener('submit', submitProductHandler);
socket.on('server:products', renderProducts);

chatForm.addEventListener('submit', submitMessageHandler);
socket.on('server:messages', renderChat);