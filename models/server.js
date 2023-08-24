const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usuariosPath = '/api/usuarios'

    //Middlewares => funciones que se ejectuan cuando levantamos el servidor
    this.middlewares();
    //Rutas de mi aplicacion
    this.routes();
  }

  middlewares() {
    //Directorio publico
    this.app.use(express.static("public"));
    //Cors protege nuestro servidor
    this.app.use(cors());
    //Lectura y parse del body
    this.app.use(express.json())
  }

  routes() {
    //http://localhost:8080/api/usuarios
    this.app.use(this.usuariosPath, require('../routes/usuarios.routes'))
  }

  listen() {
    this.app.listen(this.port, () => console.log("Servidor corriendo"));
  }
}

module.exports = Server;
