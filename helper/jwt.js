const jwt = require('jsonwebtoken');

const generarJWT = (uid, name,) =>{ //lo que irá dentro del jwt

    //Retornar una promesa que espére que se genere

    return new Promise( (resolve, reject) =>{ //si se resuelve, de retorna el token si se rechaza devolvemos el reject

        const payload = {
            uid,
            name
        }

        //generamos token
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h',
        
        }, (err, token)=>{
            if(err){
                console.log(err);
                reject('no se pudo resolver token')
            }
            resolve(token)
        }
        )
    })

}

module.exports = generarJWT