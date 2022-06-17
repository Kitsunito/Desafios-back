const express = require("express");
const app = express();
const routes = require("./src/routes");
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(__dirname + "/public"));

app.use("/api", routes);

app.listen(port, (error) => {
    if (error)
        console.warn(`Se produjo un error al inicializar el servidor: ${error}`);
    else
        console.log(`El servidor está escuchando el puerto ${port}`);
});