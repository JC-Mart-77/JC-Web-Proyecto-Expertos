var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
       
        nombre : String,
        apellido: String,
        email: String,
        password : String,
        tipoUsuario : String
    }

);

module.exports = mongoose.model('usuarios',esquema);


