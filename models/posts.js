var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
       
        titulo : String,
        autor: String,
        fecha: String,
        contenido : String,
        imagen : String,
        categoria:mongoose.Schema.Types.Mixed
    }

);

module.exports = mongoose.model('posts',esquema);