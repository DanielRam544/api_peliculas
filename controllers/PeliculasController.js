// Importar el modelo de Peliculas
var Peliculas = require('../models/Peliculas');

// FUNCION PARA CREAR UNA PELICULA
exports.create = async function (req, res) {
    try {
        var requestData = req.body;
        var pelicula = new Peliculas(requestData);

        // Guardar la nueva película en la base de datos
        await pelicula.save();
        return res.status(201).json({ pelicula, mensaje: 'Pelicula guardada correctamente' });
    } catch (error) {
        return res.status(500).json({
            message: "Error al guardar la película",
            error: error.message
        });
    }
}

//Funcion para listar todas las peliculas
exports.list = async function (req, res) {
    try {
        var peliculas = await Peliculas.find({});
        return res.status(200).json({ peliculas });
    } catch (error) {
        return res.status(500).json({
            message: "Error al listar las peliculas",
            error: error.message
        });
    }
}

//Funcion para obtener una pelicula por su id
exports.get = async function (req, res) {
    try {
        var id = req.params.id;
        var pelicula = await Peliculas.findById(id);
        console.log(pelicula);
        return res.status(200).json({ pelicula });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener la pelicula",
            error: error.message
        });
    }
}

//Funcion para actualizar una pelicula por su id
exports.update = async function (req, res) {
    try {
        var id = req.params.id;
        var requestData = req.body;
        var pelicula = await Peliculas.findByIdAndUpdate(id, requestData, { new: true });
        return res.status(200).json({ pelicula, mensaje: 'Pelicula actualizada correctamente' });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error al actualizar la pelicula",
            error: error.message
        });
    }
}

//Funcion para eliminar una pelicula por su id
exports.delete = async function (req, res) {
    try {
        var id = req.params.id;
        await Peliculas.findByIdAndDelete(id);
        return res.status(200).json({ mensaje: 'Pelicula eliminada correctamente' });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error al eliminar la pelicula",
            error: error.message
        });
    }
}

