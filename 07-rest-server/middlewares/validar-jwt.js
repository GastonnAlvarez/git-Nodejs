const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    };

    try {

        const { uid } = jwt.verify(token, process.env.SECRET_KEY);

        // Leer el usuario que corresponde a 'uid'
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(404).json({
                msg: "El usuario no existe en la DB"
            })
        }

        // Verificar si el uid tiene el estado en true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Usuario no Activo"
            })
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: "Token no Valido"
        })
    }

};

module.exports = {
    validarJWT
}