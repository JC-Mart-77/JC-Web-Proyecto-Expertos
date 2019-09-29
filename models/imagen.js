var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
    nombre: String,
    tipo: String
    }
)
module.exports = mongoose.model('imagenes',esquema);
