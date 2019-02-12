const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// CONEXIÓN DB (poner 'mongodb://mongo/crud-actividad')
mongoose.connect('mongodb://localhost/crud-actividad')
    .then(db => console.log('Conectado a la DB'))
    .catch(err => console.error(err));

// IMPORTACIÓN DE RUTAS
const indexRoutes = require('./routes/index');

// CONFIGURACIONES
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// RUTAS
app.use('/', indexRoutes);

// SERVIDOR
app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
})
