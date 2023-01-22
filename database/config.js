const mongoose = require('mongoose');

const connection = async() =>{
    try {
       await mongoose.connect(process.env.DB_CNN);

       console.log('----DB ONLINE----')
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexion con bbdd')
    }
}

module.exports = {
    connection
}
