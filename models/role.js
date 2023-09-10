const { Schema, model } = require("mongoose");
//NOS SIRVE PARA LEER LA DATA DE LA BASE DE DATOS

const RoleSchema = Schema({
  //Aca adentro se pone la información que esta en la base de datos
  rol: {
    type: String,
    require: [true, "El rol es obligatorio"],
  },
});

module.exports = model("Role", RoleSchema);
