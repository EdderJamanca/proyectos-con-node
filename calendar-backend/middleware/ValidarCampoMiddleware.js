    const {response}=require('express');
    const { validationResult } = require('express-validator');
    // manejo de errores

    const validarCampodeRegistro=(req,res=response,next)=>{
        const errors=validationResult(req);

        if(!errors.isEmpty()){  
            return res.status(400).json({
                ok:false,
                errors:errors.mapped()
            })
        }
        next();
    }

    const validarCampodelLogin=(req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){  
            return res.status(400).json({
                ok:false,
                errors:errors.mapped()
            })
        }
        next();
    }
    const validarCampo=(req,res=response,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){  
            return res.status(400).json({
                ok:false,
                errors:errors.mapped()
            })
        }
        next();
    }
  

    module.exports={
        validarCampodeRegistro,
        validarCampodelLogin,
        validarCampo
    }