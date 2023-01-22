const {response} = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) =>{
    
    //x-token header
    const token = req.header('x-token'); //Tomamos el token del header

    if(!token){
        return res.status(401).json({//En caso de que no venga token
            ok: false,
            msg: 'No hay token en peticion'
        })

    }
        try {

            const {uid, name} = jwt.verify( //verificamos el token
                //Verificamos que venga el token y la palabra secreta
                token,
                process.env.SECRET_JWT_SEED
                );
                
                //asignamos al request, los resultados de uid y name
                req.uid = uid;
                req.name = name;

        } catch (error) {
            return res.status(401).json({
                ok: false,
                msg: 'token no valido'
            });
            
        }




    next()
}

module.exports = validarJWT;