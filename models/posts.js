var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
       
        titulo : String,
        autor: String,
        fecha: String,
        contenido : String,
        imagen : String,
        categoria:String,
        comentario:Array
    }

);

module.exports = mongoose.model('posts',esquema);