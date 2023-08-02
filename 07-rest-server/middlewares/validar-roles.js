const { request, response } = require('express');

const esAdminRole = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: "Se quiere verificar el Rol sin valodar el Token Primero"
        });
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(404).json({
            msg: `${nombre} no es Administrador`
        });
    }

    next();
};

const tieneRol = (...roles) => {

    return (req = request, res = response, next) => {
        if (!req.usuario) {
            res.status(500).json({
                msg: "Se quiere verificar el Rol sin valodar el Token primero",
            })
        }

        if (!roles.includes(req.usuario.rol)) {
            res.status(401).json({
                msg: `ERROR - Se requiere uno de estos roles ${roles}`,
            })
        }
        next();
    }

};


module.exports = {
    esAdminRole,
    tieneRol
}