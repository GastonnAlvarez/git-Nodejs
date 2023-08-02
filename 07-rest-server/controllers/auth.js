const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuarios');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {

    const { correo, password } = req.body;

    try {
        // Verificar si el Email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(404).json({
                msg: "Usuario / Password no son correctos - CORREO"
            });
        }

        // Verificar si el usuario esta Activo(estado: true / false)
        if (!usuario.estado) {
            return res.status(404).json({
                msg: "Usuario Desactivado"
            })
        }

        // Verificar la password
        const validPassword = password === usuario.password;
        if (!validPassword) {
            return res.status(404).json({
                msg: "El password no es valido"
            })
        }

        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(500).json({
            msg: "Algo salio mal"
        })
    }
}

module.exports = {
    login
}