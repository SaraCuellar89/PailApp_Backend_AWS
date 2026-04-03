const express = require('express');
const router = express.Router();
const {auth} = require('../middlewares/index');
const {limite_recuperacion, limite_inicio_sesion} = require('../middlewares/limites');
const {validar_registro, 
    validar_datos_adicionales,
    validar_editar_cuenta} = require('../validators/validaciones_usuario'); // Validaciones de campos


// ================== Importacion de Controladores ==================
const {registrar_usuarios, 
    iniciar_sesion,
    iniciar_sesion_google,
    informacion_usuario_token, 
    editar_cuenta,
    eliminar_cuenta,
    solicitar_recuperacion,
    restablecer_contraseña,
    registrar_datos_adicionales} = require("../controllers/usuarios_controller")


// ================== Rutas ==================

// Registrar un usuario
router.post('/registrar', validar_registro, registrar_usuarios);
// Registrar datos adicionales del usuario (edad, peso, altura)
router.put('/registrar_datos_adicionales', auth, validar_datos_adicionales, registrar_datos_adicionales);
// Iniciar sesion
router.post('/iniciar_sesion', limite_inicio_sesion, iniciar_sesion);
// Iniciar sesion Google
router.post('/iniciar_sesion_google', iniciar_sesion_google);
// Buscar informacion de un usuario en sesion por medio del token
router.get('/usuario_logueado', auth, informacion_usuario_token);
// Editar la informacion de la cuenta
router.put('/editar_cuenta', auth, validar_editar_cuenta, editar_cuenta);
// Eliminar la cuenta
router.delete('/eliminar_cuenta', auth, eliminar_cuenta);

// Solicitar restablecimiento de contraseña
router.post('/contrasena_olvidada', limite_recuperacion, solicitar_recuperacion);
// REstablecer contraseña
router.post('/contrasena_olvidada/:token', restablecer_contraseña);



// ================== Exportar funciones ==================
module.exports = router;