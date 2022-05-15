

const {Router}=require('express');
const router=Router();
const {check}=require('express-validator');
const { validarToken } = require('../middleware/validar-jwt');
const {validarCampo}=require('./../middleware/ValidarCampoMiddleware');
const {isDate}=require('./../helpers/isDate');


const {     getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento }=require('./../controllers/eventsController');


//validar q todas las peticiones tengan el token
 router.use(validarToken);

// OBTENER EVENTOS
router.get('/',getEventos);

// CREAR UN EVENTO NUEVO
router.post('/',[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','La fecha de inicio es obligatorio').custom(isDate),
    check('end','La fecha de finalización es obligatorio').custom(isDate),
    validarCampo
],crearEvento);

// ACTUALIZAR EVENTO
router.put('/:id',actualizarEvento)

// eliminar Evento
router.delete('/:id',eliminarEvento);





module.exports=router;
