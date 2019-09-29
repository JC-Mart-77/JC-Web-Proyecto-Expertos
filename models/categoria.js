var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre : String
    }
);
module.exports = mongoose.model('categorias',esquema);
