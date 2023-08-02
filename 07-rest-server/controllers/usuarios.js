const { request, response } = require('express');
const Usuario = require('../models/usuarios');

const bcrypt = require('bcryptjs');

const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };


    const [total, usuarios] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    });
};

const usuariosPost = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({ nombre, correo, password, rol });

    // 2) Encriptar password si cumple el Email
    // const salt = bcrypt.genSaltSync();
    // usuario.password = bcrypt.hashSync(password, salt);

    // 3) Guardar en la base de datos

    await usuario.save();


    res.status(201).json({
        usuario
    });
};

const usuariosPut = async (req = request, res = response) => {

    const { id } = req.params;

    const { _id, password, google, correo, ...resto } = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, resto);


    res.json({
        usuario
    });
};

const usuariosDelete = async (req = request, res = response) => {
    const { id } = req.params;

    // Eliminar visualmente, cambiando el estado a false.
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    const usuarioAutenticado = req.usuario;



    res.json({
        usuario,
        usuarioAutenticado
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}