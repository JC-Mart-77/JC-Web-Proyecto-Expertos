var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre: String,
        correo: String,
        respuesta : String,
        titulo:String
    }
);
module.exports = mongoose.model('mensajes',esquema);
