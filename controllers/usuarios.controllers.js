const {response} = require('express')

const usuarioGet = (req, res = response) => {
    //http://localhost:8080/api/usuarios?q=hola&nombre=Jona&apiKey=123
    const query = req.query
    const {q, nombre = 'No name', apiKey} = query
    res.json({
      ok: true,
      mensaje: "get API - controlador",
      q, 
      nombre, 
      apiKey
    });
  }

const usuarioPost = (req, res = response) => {
    //req lo que la persona esta solicitando
    // {"id": 1, "nombre": "Jona", "edad": 36} => esta seria la data que le envio por el body de postman en formato JSON
    const body = req.body;
    res.json({
      ok: true,
      mensaje: "Post API - controlador",
      body
    });
  }

const usuarioPut = (req, res = response) => {
    //req con params
    const id = req.params.id
    res.json({
      ok: true,
      mensaje: "Put API - controlador",
      id
    });
  }

  const usuarioPatch = (req, res = response) => {
    res.json({
      ok: true,
      mensaje: "Patch API - controlador",
    });
  }


const usuarioDelete = (req, res = response) => {
    res.json({
      ok: true,
      mensaje: "Delet API - controlador",
    });
  }

  module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete, 
    usuarioPatch
  }