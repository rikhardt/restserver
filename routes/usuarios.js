
const {Router} = require('express');
const { body, check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuarioDelete } = require('../controllers/usuarios');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('correo', 'El correo no es válido').isEmail(),
    body('correo').custom(emailExiste),
    body('password', 'El password debe de ser más de 6 letras').isLength({min: 6}),
    body('rol').custom(esRolValido),
    validarCampos
], usuariosPost );

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    body('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],
usuarioDelete);

module.exports = router;

