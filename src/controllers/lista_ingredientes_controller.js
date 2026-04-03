// ================== Importacion de funciones de error o exito ================== 
const {respuesta_exito,
    respuesta_error,
    respuesta_error_servidor} = require('../utils/responses');


// ================== Importacion de modelos ==================
const {insertar_ingredientes, 
    insertar_un_ingrediente,
    listar_todos_ingredientes,
    lista_ingrediente_id,
    editar_estado_ingrediente,
    actualizar_ingrediente,
    eliminar_ingrediente} = require('../models/lista_ingredientes_model');


// ================== Funciones del controlador ==================

// Agregar nuevo ingrediente a la lista
const agregar_ingrediente = async (req, res) => {
    try {
        const {nombre} = req.body;
        const {id_publicacion} = req.params;
        const id_usuario = req.usuario.id_usuario;
        
        const ingrediente = await insertar_un_ingrediente({id_usuario, id_publicacion, nombre});

        return respuesta_exito(res, "Ingrediente agregado", 201, ingrediente);
    } catch (error) {
        return respuesta_error_servidor(res, error, "No se pudo agregar el ingrediente");
    }
}


// Obtener todos los ingredientes
const obtener_todos_ingredientes = async (req, res) => {
    try {
        const {id_publicacion} = req.params;
        const id_usuario = req.usuario.id_usuario;
        
        const ingredientes = await listar_todos_ingredientes({id_usuario, id_publicacion});

        return respuesta_exito(res, 'Lista de ingredientes', 200, ingredientes);
    } catch (error) {
        return respuesta_error_servidor(res, error, "No se pudo obtener los ingredientes");
    }
}


// Obtener un ingrediente
const obtener_id_ingrediente = async (req, res) => {
    try {
        const {id_ingrediente} = req.params;

        const ingrediente = await lista_ingrediente_id({id_ingrediente});

        return respuesta_exito(res, "Ingrediente", 200, ingrediente);
    } catch (error) {
        return respuesta_error_servidor(res, error, "No se pudo obtener el ingredeinte ");
    }
}


// Marcar checklist de un ingrediente
const marcar_obtenido = async (req, res) => {
    try {
        const {id_ingrediente} = req.params;

        const estado = await lista_ingrediente_id({id_ingrediente});

        if(estado[0].obtenido === 0){
            let marcar = 1;
            let ingrediente = await editar_estado_ingrediente({id_ingrediente, obtenido: marcar});
            return respuesta_exito(res, "Ingrediente marcado", 200, ingrediente);
        }
        else{
            let desmarcar = 0;
            let ingrediente = await editar_estado_ingrediente({id_ingrediente, obtenido: desmarcar});
            return respuesta_exito(res, "Ingrediente desmarcado", 200, ingrediente);
        }
    } catch (error) {
        return respuesta_error_servidor(res, error, "No se pudo marcar como obtenido");
    }
}


// Editar ingrediente
const editar_ingrediente = async (req, res) => {
    try {
        const {nombre} = req.body;
        const {id_ingrediente} = req.params;

        await actualizar_ingrediente({id_ingrediente, nombre});

        return respuesta_exito(res, "Ingrediente editado correctamente", 200);
        
    } catch (error) {
        return respuesta_error_servidor(res, error, "No se pudo editar el ingrediente");
    }
}


// Eliminar ingrediente
const borrar_ingrediente = async (req, res) => {
    try {
        const {id_ingrediente} = req.params;

        await eliminar_ingrediente({id_ingrediente});

        return respuesta_exito(res, "Ingrediente borrado", 200);
    } catch (error) {
        return respuesta_error_servidor(res, error, "No se pudo borrar el ingrediente");
    }
}




// ================== Exportar funciones ==================
module.exports = {
    agregar_ingrediente,
    obtener_todos_ingredientes,
    obtener_id_ingrediente,
    marcar_obtenido,
    editar_ingrediente,
    borrar_ingrediente
}