var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre: String,
        correo: String,
        comentario : String,
        titulo:String
    }
);
module.exports = mongoose.model('comentarios',esquema);
