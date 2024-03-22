var mongoose = require('mongoose');
var Schema = mongoose.Schema

//definir el esquema

const peliculaSchema = new Schema({
    titulo: String,
    trama: String,
    autor: String,
    year: Number,
})

//definimos el modelo
const Pelicula = mongoose.model('Pelicula', peliculaSchema)
module.exports = Pelicula;