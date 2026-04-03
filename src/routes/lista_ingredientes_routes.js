const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares');
const upload = require('../middlewares/upload');


// ================== Importacion de Controladores ==================
const {
    agregar_ingrediente,
    obtener_todos_ingredientes,
    obtener_id_ingrediente,
    marcar_obtenido,
    editar_ingrediente,
    borrar_ingrediente} = require('../controllers/lista_ingredientes_controller');


// ================== Rutas ==================

// Agregar un ingrediente
router.post('/agregar/:id_publicacion', auth, agregar_ingrediente);
// Otbener todos los ingredientes de una publicacion
router.get('/todos/:id_publicacion', auth, obtener_todos_ingredientes);
// Obtener un ingrediente por id
router.get('/uno/:id_ingrediente', auth, obtener_id_ingrediente);
// Marcar checklist del ingrediente
router.post('/marcar/:id_ingrediente', auth, marcar_obtenido);
// Editar ingrediente
router.put('/editar/:id_ingrediente', auth, editar_ingrediente);
// borrar ingrediente
router.delete('/eliminar/:id_ingrediente', auth, borrar_ingrediente);



// ================== Exportar funciones ==================
module.exports = router;