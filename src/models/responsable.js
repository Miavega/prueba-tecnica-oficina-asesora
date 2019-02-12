const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResponsableSChema = new Schema({
    nombre: String,
    correo: String,
    telefono: String
});

module.exports = mongoose.model('responsables', ResponsableSChema);