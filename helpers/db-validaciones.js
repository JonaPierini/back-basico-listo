const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
  }
};

const existeEmail = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo: correo });
  if (existeEmail) {
    throw new Error(
      `El correo ${correo} ya esta registrado en la base de datos`
    );
  }
};

const existUsuarioPorId = async (id) => {
  const existeUsuarioPorId = await Usuario.findById(id);
  if (!existeUsuarioPorId) {
    throw new Error(`El id ${id} no existe en la base de datos`);
  }
};

module.exports = {
  esRoleValido,
  existeEmail,
  existUsuarioPorId,
};
