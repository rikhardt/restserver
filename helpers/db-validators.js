const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '') => {

    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la DB`)
    }
}

const emailExiste = async(correo = '') => {

    const existeEmail = await Usuario.findOne({correo});
     if (existeEmail) {
        throw new Error('El correo ingresado ya está registrado');
     };
}
const existeUsuarioPorId = async(id = '') => {

    const existeUsuario = await Usuario.findById(id);
     if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
     };
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}