/* 
    rutas de usuarios / auth
    host + /api/auth
*/
const {Router}=require('express');
const route=Router();
const { check } = require('express-validator');
const { validarToken } = require('../middleware/validar-jwt');

const  {
        crearUsuario,
        loginUsuario,revalidarToken
    }= require('./../controllers/authControllers');

    // validaciones 
const {
    validarCampodeRegistro,
    validarCampodelLogin
}=require('./../middleware/ValidarCampoMiddleware');



route.post('/new',[
            check('nombre','El nombre es obligatorio').not().isEmpty(),
            check('email','El email es obligatorio').isEmail(),
            check('password','El password debe de ser de 6 caracteres').isLength({min:6}),
            validarCampodeRegistro,
        ],crearUsuario);
        
route.post('/',[
    check('email','El email es obligatorio').isEmail(),
    check('password','El password debe de ser de 6 caracteres').isLength({min:6}),
    validarCampodelLogin,
],loginUsuario);

route.get('/renew',validarToken,revalidarToken);


module.exports =route;