const { respuesta_error } = require('../utils/responses');

const regex_correo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validar_registro = (req, res, next) => {
    const { nombre_usuario, correo, contrasena, confirmacion_contrasena, avatar } = req.body;

    if (!nombre_usuario || !correo || !contrasena || !confirmacion_contrasena || !avatar)
        return respuesta_error(res, "Todos los campos son obligatorios", 400);

    if (nombre_usuario.length < 5)
        return respuesta_error(res, "Nombre de usuario inválido. Mínimo 5 caracteres", 400);

    if (!regex_correo.test(correo))
        return respuesta_error(res, "Correo electrónico inválido", 400);

    if (contrasena.length < 5)
        return respuesta_error(res, "Contraseña inválida. Mínimo 5 caracteres", 400);

    if (contrasena !== confirmacion_contrasena)
        return respuesta_error(res, "Las contraseñas no coinciden", 400);

    next();
};

const validar_datos_adicionales = (req, res, next) => {
    const { edad, peso, altura } = req.body;

    if (edad == null || peso == null || altura == null)
        return respuesta_error(res, "Todos los campos son obligatorios", 400);

    if (edad < 10 || edad > 120)
        return respuesta_error(res, "Edad fuera de rango válida (10-120)", 400);

    if (peso < 20 || peso > 300)
        return respuesta_error(res, "Peso fuera de rango válido (20-300 kg)", 400);

    if (altura < 0.5 || altura > 2.5)
        return respuesta_error(res, "Altura fuera de rango válida (0.50 - 2.50 m)", 400);

    next();
};

const validar_editar_cuenta = (req, res, next) => {
    const { nombre_usuario, correo, avatar } = req.body;

    if (!nombre_usuario || !correo || !avatar)
        return respuesta_error(res, "Todos los campos son obligatorios", 400);

    if (nombre_usuario.length < 5)
        return respuesta_error(res, "Nombre de usuario inválido. Mínimo 5 caracteres", 400);

    if (!regex_correo.test(correo))
        return respuesta_error(res, "Correo electrónico inválido", 400);

    const { contrasena, edad, peso, altura } = req.body;

    if (contrasena && contrasena.length < 5)
        return respuesta_error(res, "Contraseña inválida. Mínimo 5 caracteres", 400);

    // Datos adicionales opcionales, pero si vienen se validan
    if (edad != null && (edad < 10 || edad > 120))
        return respuesta_error(res, "Edad fuera de rango válida (10-120)", 400);

    if (peso != null && (peso < 20 || peso > 300))
        return respuesta_error(res, "Peso fuera de rango válido (20-300 kg)", 400);

    if (altura != null && (altura < 0.5 || altura > 2.5))
        return respuesta_error(res, "Altura fuera de rango válida (0.50 - 2.50 m)", 400);

    next();
};

module.exports = {
    validar_registro, 
    validar_datos_adicionales,
    validar_editar_cuenta 
};