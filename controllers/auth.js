const {response} = require('express')
const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const generarJWT = require('../helper/jwt')




const createUser = async (req, res = response)=>{
    
    const {name, email, password} = req.body

    //Encriptar pass
    
    try {
        let usuario =await User.findOne({email: email})
        
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario ya Existe',
            })
        }

        usuario = new User(req.body);

        const salt = bcrypt.genSaltSync();
    
        usuario.password = bcrypt.hashSync(password, salt);
        
        await usuario.save();

        //JWT 
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            message: "registro",
            uid: usuario.id,
            name: usuario.name,
            token
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Comunicarse con el administrador.'
        })
    }

}


const loginUser = async(req, res = response)=>{

    const { email, password} = req.body

    try {

        let usuario = await User.findOne({email: email})
        //Validamos usuario por mail
        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario incorrecto',
            })
        }
        //comparamos el pass encriptado con compareSync
        const validPassword = bcrypt.compareSync( password, usuario.password);
        //si no es el password
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contrasena incorrecta',
            })
        }
        //JWT
        const token = await generarJWT(usuario.id, usuario.name);
        return res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Comunicarse con el administrador.'
        })
        
    }

   
}
const renewToken = async (req, res = response)=>{

    const uid = req.uid;
    const name = req.name;
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token,
        message: "renew token"
    })
}


module.exports ={
    createUser,
    loginUser,
    renewToken

}