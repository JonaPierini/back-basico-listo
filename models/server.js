const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usuariosPath = '/api/usuarios'
    
    // Conectar a base de datos
    this.conectarDb()
    
    //Middlewares => funciones que se ejectuan cuando levantamos el servidor
    this.middlewares();
    
    //Rutas de mi aplicacion
    this.routes();
  }

  async conectarDb(){
    await dbConnection()
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
