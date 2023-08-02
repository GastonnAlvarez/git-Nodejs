const Rol = require('../models/rol');
const Usuario = require('../models/usuarios');

const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrdo en la DB.`);
    }
}

const emailExiste = async (correo = '') => {
    // Verificar si Email existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta registrado`);
    }

};

const existeUsuarioPorId = async (id) => {
    // Verificar si el ID existe...
    const existeID = await Usuario.findById(id);
    if (!existeID) {
        throw new Error(`El ID: ${id}, NO es valido`);
    }
};


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}


