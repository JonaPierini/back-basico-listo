const { Schema, model } = require("mongoose");
//NOS SIRVE PARA LEER LA DATA DE LA BASE DE DATOS

//Tipos de ROL en la base de datos => ADMIN_ROLE --- USER_ROLE --- VENTAS_ROLE

const RoleSchema = Schema({
  //Aca adentro se pone la información que esta en la base de datos
  rol: {
    type: String,
    require: [true, "El rol es obligatorio"],
  },
});

module.exports = model("Role", RoleSchema);
