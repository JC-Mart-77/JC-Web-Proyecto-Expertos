var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
       
        encabezado : String,
        descripcion : String,
        imagen : String,
        piePagina:String
    }

);

module.exports = mongoose.model('configuraciones',esquema);