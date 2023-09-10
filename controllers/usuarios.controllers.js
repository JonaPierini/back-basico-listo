const { response } = require("express");
const Usuario = require("../models/usuario");
//Para encriptar contraseñas
const bcryptjs = require("bcryptjs");
const { validarCampos } = require("../middlewares/validar-campos");

const usuarioGet = (req, res = response) => {
  //http://localhost:8080/api/usuarios?q=hola&nombre=Jona&apiKey=123
  const query = req.query;
  const { q, nombre = "No name", apiKey } = query;
  res.json({
    ok: true,
    mensaje: "get API - controlador",
    q,
    nombre,
    apiKey,
  });
};

const usuarioPost = async (req, res = response) => {
  //req lo que la persona esta solicitando (ingresando)
  // {"id": 1, "nombre": "Jona", "edad": 36} => esta seria la data que le envio por el body de postman en formato RAW - JSON
  const { nombre, correo, password, rol } = req.body;

  //Instancia de nuestro usuario del modelo
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Verificar si el correcto existe
  const existeEmail = await Usuario.findOne({ correo: correo });
  if (existeEmail) {
    return res.status(400).json({
      msg: "El correo ya esta registrado",
    });
  }

  //Encriptar la constraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //para grabarlo en la base de datos
  await usuario.save();

  res.json({
    ok: true,
    mensaje: "Post API - controlador",
    usuario,
  });
};

const usuarioPut = (req, res = response) => {
  //req con params
  const id = req.params.id;
  res.json({
    ok: true,
    mensaje: "Put API - controlador",
    id,
  });
};

const usuarioPatch = (req, res = response) => {
  res.json({
    ok: true,
    mensaje: "Patch API - controlador",
  });
};

const usuarioDelete = (req, res = response) => {
  res.json({
    ok: true,
    mensaje: "Delet API - controlador",
  });
};

module.exports = {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
  usuarioPatch,
};
