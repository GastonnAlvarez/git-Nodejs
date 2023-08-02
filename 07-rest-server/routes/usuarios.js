const { Router } = require('express');
const { check } = require('express-validator');

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
} = require('../controllers/usuarios');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRol
} = require('../middlewares');

const {
    esRolValido,
    emailExiste,
    existeUsuarioPorId } = require('../helpers/db-validators');


const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El Nombre No debe estar vacio').not().isEmpty(),
    check('correo').custom(emailExiste),
    check('password', 'El password debe ser de minimo 6 letras').isLength({ min: 6 }),
    // check('rol', 'No es un Rol Permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'No es un ID de mongo...').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID de mongo...').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

module.exports = router;