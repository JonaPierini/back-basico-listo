const { Router } = require("express");
const { usuarioGet, usuarioPost, usuarioDelete, usuarioPut, usuarioPatch } = require("../controllers/usuarios.controllers");

const router = Router();

//GET => regresa esa data (es decir si yo voy al sitio web y pongo localhost:8080/api me muesta esa data)
router.get("/", usuarioGet);

router.put("/:id", usuarioPut);

router.post("/", usuarioPost);

router.patch('/', usuarioPatch)

router.delete("/",usuarioDelete);

module.exports = router;
