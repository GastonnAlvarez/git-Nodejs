const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es Obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El Email es Obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La Contraseña es Obligatorio'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


// Reescribiendo el .toJSON
UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;

    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);