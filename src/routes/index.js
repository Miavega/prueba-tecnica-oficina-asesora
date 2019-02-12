const express = require('express');
const router = express.Router();

const Actividad = require('../models/actividad');
const Responsable = require('../models/responsable');

// CRUD TAREA
router.get('/', async (req, res) => {
    const tareas = await Actividad.find();
    const responsables = await Responsable.find();
    res.render('tarea', {
        tareas,
        responsables
    });
});

// CREAR TAREA
router.post('/crearTarea', async (req, res) => {
    const datos_responsable = await Responsable.find({ nombre: req.body.responsable });
    const id_responsable = datos_responsable[0]._id;
    const tarea = new Actividad({
        descripcion: req.body.descripcion,
        fecha_limite: req.body.fecha,
        responsable: id_responsable,
        soporte: req.body.soporte
    });
    await tarea.save();
    res.redirect('/');
});

// ELIMINAR TAREA
router.get('/eliminarTarea/:id', async (req, res) => {
    const { id } = req.params;
    await Actividad.remove({ _id: id });
    res.redirect('/');
});

// REALIZAR TAREA
router.get('/realizarTarea/:id', async (req, res) => {
    const { id } = req.params;
    const actividad = await Actividad.findById(id);
    actividad.estado = true;
    await actividad.save();
    res.redirect('/');
});

// CRUD RESPONSABLE 
router.get('/responsable', async (req, res) => {
    const responsables = await Responsable.find();
    res.render('responsable', {
        responsables
    });
});

// CREAR RESPONSABLE
router.post('/crearResponsable', async (req, res) => {
    const responsable = new Responsable(req.body);
    await responsable.save();
    res.redirect('/responsable');
});

// REPORTE DE ACTIVIDAD POR ESTADO
router.get('/reporteEstado', async (req, res) => {
    const tareas = await Actividad.find();
    const responsables = await Responsable.find();
    res.render('reporteEstado', {
        tareas,
        responsables
    });
});

// REPORTE DE ACTIVIDAD POR RESPONSABLE
router.get('/reporteResponsable', async (req, res) => {
    const tareas = await Actividad.find();
    const responsables = await Responsable.find();
    res.render('reporteResponsable', {
        tareas,
        responsables
    });
});

// REPORTE DE ACTIVIDAD POR RESPONSABLE
router.post('/buscarReporteResponsable', async (req, res) => {
    res.redirect('reporteResponsable');
});

module.exports = router;