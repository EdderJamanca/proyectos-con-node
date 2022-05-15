// const express = require('express');
// const {response}=express();
const {response} = require('express');
const bcrypt = require('bcryptjs');
const usuarios=require('./../models/UsuarioModel');
const {generarJWT}=require('./../helpers/jwt');



const crearUsuario=async(req, res=response)=>{
    const {nombre,email,password}=req.body;
    try {
        // verificar q solo hay un email registrado
        let userEmail= await usuarios.findOne({email});
        if(userEmail){
           return res.status(400).json({
                ok:false,
                msg:'Un usario ya existe con este usuario'
            })
        }
        const user=new usuarios(req.body);
        // encriptando la contraseña
        const sal=bcrypt.genSaltSync();
       
        const passHas=bcrypt.hashSync(password,sal);
        user.password=passHas;

        await user.save();
        const token=await generarJWT(user.id,user.nombre);


        return res.status(200).json({
            ok:true,
            uid:user.id,
            nombre:user.nombre,
            token
        })

    } catch (error) {
        
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el Administrador'
        })
    }
    
}
const loginUsuario=async(req,res)=>{

    const {email,password}=req.body;

    const emailExiste= await usuarios.findOne({email});
    if(!emailExiste){
        return res.status(400).json({
            ok:false,
            msg:'No existe una cuenta con este Email'
        })
    }
 
    // confirmar pasword
        let verificandoPassword=password.trim()===emailExiste.password.trim();

        if(!verificandoPassword){
           return res.status(400).json({
                ok:false,
                msg:'El password Incorrecto'
            })
        }
    const token=await generarJWT(emailExiste.id,emailExiste.nombre);
    return res.status(201).json({
        ok:true,
        uid:emailExiste.id,
        nombre:emailExiste.nombre,
        token
    })
};

const revalidarToken=async(req,res)=>{

    const {uid,nombre}=req;
    console.log('id',uid);
    console.log('nombre',nombre);
    const nuevoToken=await generarJWT(uid,nombre);

    res.json({
        ok:true,
        uid,
        nombre,
        nuevoToken
    })
};

module.exports={
    crearUsuario,
    loginUsuario,
    revalidarToken
}