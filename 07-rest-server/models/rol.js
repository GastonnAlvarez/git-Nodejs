const { Schema, model } = require('mongoose');

const RoleShema = Schema({
    rol:{
        type: String,
        require:[true, "El Rol es Obligatorio"]
    }
});

module.exports = model('rol', RoleShema);