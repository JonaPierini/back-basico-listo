const { validationResult } = require("express-validator");
const validarCampos = (req, res, next) => {
  //Verificar todos los datos que estan en el post => correo, nombre, password, rol
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  //Si no hay errores se ejuecta
  next();
};

module.exports = {
  validarCampos,
};
