var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var mod_entrada=new Schema({
    titulo:{
        type:String,
        default:"Título"
    },
    autor:{
        type:String,
        default:"Anonimo"
    },
    contenido:{
        type:String,
        default:"Entrada sin contenido"
    },
    imagen:{
        type:String,
        default:"Sin Imagen"
    }
});

module.exports = mongoose.model("entrada",mod_entrada);