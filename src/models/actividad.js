const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActividadSChema = new Schema({
    descripcion: String,
    fecha_registro: {
        type: Date,
        default: Date.now
    },
    fecha_limite: Date,
    responsable: String,
    soporte: String,
    estado: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('actividades', ActividadSChema);