const {response} = require('express')
const Event = require('../models/EventModel')


//Crear Evento
const createEvent = async(req, res = response)=>{
    
    console.log(req.body);
    const event = new Event(req.body);

    try {
        event.user = req.uid
        const eventDB = await event.save()
        res.status(200).json({
            ok: true,
            msg: 'Evento OK',
            eventDB
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Admin'
        })
        
    }



}

//Obtener Eventos
const getEvent = async(req, res = response)=>{


    let consulta = await Event.find({}).populate('user', 'name')

    res.json({
        ok: true,
        consulta
    })
    
    // .exec((error, event)=>{

    //     if(error || !event){
    //         return res.status(404).json({
    //             ok: false,
    //             msg: "No hay eventos creados"
    //         })
    //     }

    //     return res.status(200).json({
    //         ok: true,
    //         msg: 'Eventos disponibles',
    //         consulta
    //     })
    // })}}

    

}

//Editar / Actualizar eventos
const actEvent = async(req, res = response)=>{

    const id = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Event.findById(id)

        if (!evento){
            res.status(404).json({
                ok: false,
                msg: 'No exite evento con ese ID'
            })
        }

        if(evento.user.toString() !== uid){
            res.status(401).json({
                ok: false,
                msg: 'Usuario no puede editar Evento'
            })
        }

    
        const nuevoEvento ={
            ...req.body,
            user:uid
        }
        
        const eventoAct = await Event.findByIdAndUpdate(id, nuevoEvento, {new:true});
        res.json({
            ok: true,
            msg: 'Desde act Event',
            evento: eventoAct
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }


}
//Delete event
const deleteEvent = async (req, res = response)=>{

    const id = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Event.findById(id)

        if (!evento){
            return res.status(404).json({
                ok: false,
                msg: 'No exite evento con ese ID'
            })
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'Usuario no puede borrar Evento'
            })
        }
        
        await Event.findByIdAndDelete({_id:id})
            return res.status(200).json({
                ok: true,
                msg: 'Evento Eliminado',
                evento: eventoABorrar
            })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }


}


module.exports = {
    createEvent,
    getEvent,
    actEvent,
    deleteEvent
}