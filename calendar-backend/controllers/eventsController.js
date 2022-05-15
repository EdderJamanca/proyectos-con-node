const {response}=require('express');
const eventos=require('./../models/Events');

const getEventos=async(req,res=response)=>{

    const events=await eventos.find()
                              .populate('user','nombre');
    return res.status(201).json({
        ok:true,
        events
    })
}

const crearEvento=async(req, res=response)=>{
    const evento= await new eventos(req.body);

    try {
        evento.user=req.uid;
        const guardarEvents= await evento.save();

        return res.status(201).json({
            ok:true,
            evento:guardarEvents
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Comuniquece con el administrador'
        })
    }

}

const actualizarEvento=async(req,res=response)=>{

    const eventoId=req.params.id;
    const uid=req.uid;
    try {

        const evento=await eventos.findById(eventoId);
        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }
        if(evento.user.toString() !==uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio de editar este evento'
            })
        }
        const nuevoEvento={
            ...req.body,
            user:uid
        }
        const eventoActualizar=await eventos.findByIdAndUpdate(eventoId,nuevoEvento,{new:true});

        res.status(201).json({
            ok:true,
            evento:eventoActualizar
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }


}

const eliminarEvento=async(req,res=response)=>{

    const eventoId=req.params.id;
    const uid=req.uid;
    try {

        const evento=await eventos.findById(eventoId);
        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }
        if(evento.user.toString() !==uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio de editar este evento'
            })
        }

        await eventos.findByIdAndDelete(eventoId);

        res.status(201).json({
            ok:true,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

}

module.exports={
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}