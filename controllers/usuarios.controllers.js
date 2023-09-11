const { response } = require("express");
const Usuario = require("../models/usuario");
//Para encriptar contraseñas
const bcryptjs = require("bcryptjs");

const usuarioGet = async (req, res = response) => {
  //http://localhost:8080/api/usuarios?q=hola&nombre=Jona&apiKey=123
  // const query = req.query;
  // const { q, nombre = "No name", apiKey } = query;

  //SI pongo el find solo me trae todos los usuario

  const { limit = 5, desde = 0 } = req.query;
  const query = { estado: true };

  //Para que las peticiones sean todas juntas se usa el PROMISE.ALL
  const [total, usuarios] = await Promise.all([
    //ME trae el total de los usuarios que esten en estado true
    Usuario.countDocuments(query),

    //LEEO los usuario de la base de datos
    //ME encontra los ususarios que estan en estado true
    Usuario.find(query)
      //DESDE es para que me traiga desde un determinado numero
      // http://localhost:8080/api/usuarios?desde=5
      .skip(Number(desde))

      //LIMIT es para que me traiga una cantidad especifica de usuario => los dos primeros
      // http://localhost:8080/api/usuarios?limit=1
      .skip(Number(limit)),
  ]);
  // MESCLANDO LOS DOS => http://localhost:8080/api/usuarios?desde=6&limit=1

  res.json({
    total,
    usuarios,
  });
};

const usuarioPost = async (req, res = response) => {
  //req lo que la persona esta solicitando (ingresando)
  // {"id": 1, "nombre": "Jona", "edad": 36} => esta seria la data que le envio por el body de postman en formato RAW - JSON
  const { nombre, correo, password, rol } = req.body;

  //Instancia de nuestro usuario del modelo
  const usuario = new Usuario({ nombre, correo, password, rol });

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

const usuarioPut = async (req, res = response) => {
  //req con params
  const id = req.params.id;

  const { _id, password, google, ...resto } = req.body;

  //Validamos id contra base de datos
  if (password) {
    //Encriptar la constraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    ok: true,
    mensaje: "Put API - controlador",
    usuario,
  });
};

const usuarioPatch = (req, res = response) => {
  res.json({
    ok: true,
    mensaje: "Patch API - controlador",
  });
};

const usuarioDelete = async (req, res = response) => {
  const { id } = req.params;

  //Borrar fisicamente el usuario
  // const usuarioBorrado = await Usuario.findByIdAndDelete(id);
  //Aca lo que hago es cambiar el estado en la base de datos => de true a false
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  res.json({
    ok: true,
    mensaje: "Delet API - controlador",
    usuario,
  });
};

module.exports = {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
  usuarioPatch,
};
