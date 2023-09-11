const { Router } = require("express");
const {
  usuarioGet,
  usuarioPost,
  usuarioDelete,
  usuarioPut,
  usuarioPatch,
} = require("../controllers/usuarios.controllers");
//El check Validacion de correo
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  esRoleValido,
  existeEmail,
  existUsuarioPorId,
} = require("../helpers/db-validaciones");

const router = Router();

//GET => regresa esa data (es decir si yo voy al sitio web y pongo localhost:8080/api me muesta esa data)
router.get("/", usuarioGet);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existUsuarioPorId),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuarioPut
);

router.post(
  "/",
  [
    //Que el campo nombre no este vacio
    check("nombre", "El nombre es obligatorio").not().isEmpty(),

    //Que el campo password sea obligatorio y minimo 6 letras
    check("password", "El password es obligatorio y mas de 6 letras").isLength({
      min: 6,
    }),

    //Que el campo correo corresponda a un tipo de email
    check("correo", "El correo no es valido").isEmail(),

    //Que el campo ROL sea de tipo 'Admin_Role', 'User_Role'
    // check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),

    //Validar el campo ROL DESDE la base de datos => hay que crear una nueva colección en la BD

    //Custom es una validacion personalizada
    check("rol").custom(esRoleValido),

    //Validar el campo correo personalizado
    //Validar el campo correo DESDE la base de datos
    check("correo").custom(existeEmail),

    //Viene de los middlewares
    validarCampos,
  ],
  usuarioPost
);

router.patch("/", usuarioPatch);

router.delete(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existUsuarioPorId),
    validarCampos,
  ],
  usuarioDelete
);

module.exports = router;
