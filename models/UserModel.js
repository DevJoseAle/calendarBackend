const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true //no pueden haber duplicados
    },
    password:{
        type: String,
        required: true,
    },
})


module.exports = model('User', UserSchema);