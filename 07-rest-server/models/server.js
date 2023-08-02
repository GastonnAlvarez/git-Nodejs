const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

require('dotenv').config();


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // Ruta de user.js
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // Conectar a Base de Datos
        this.conectarDb();

        // Middlewares
        this.middlawers();

        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDb() {
        await dbConnection();
    }

    middlawers() {
        // CORS
        this.app.use(cors())

        // Parseo y lectura del Body
        this.app.use(express.json());

        // static files
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.authPath, require('../routes/auth'));
    }

    listen() {
        this.app.listen((this.port), () => {
            console.log(`Escuchando en el puerto ${this.port}`)
        });
    }

}

module.exports = Server;