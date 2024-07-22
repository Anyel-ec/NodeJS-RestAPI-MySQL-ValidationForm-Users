const { validarCedula, validarCorreo, validarFechaNacimiento, validarTelefono, validarEdad } = require('../validaciones');

function validateUserData(req, res, next) {
    const data = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fechaNacimiento: req.body.fechaNacimiento,
        correoElectronico: req.body.correoElectronico,
        telefono: req.body.telefono,
        estado: req.body.estado,
        edad: req.body.edad,
        cedula: req.body.cedula
    };

    let errors = [];

    if (!data.nombre || data.nombre.length < 3 || data.nombre.length > 50) {
        errors.push('El nombre debe tener entre 3 y 50 caracteres');
    }

    if (!data.apellido || data.apellido.length < 3 || data.apellido.length > 50) {
        errors.push('El apellido debe tener entre 3 y 50 caracteres');
    }

    if (!validarCedula(data.cedula)) {
        errors.push('La cédula es inválida');
    }

    if (!validarCorreo(data.correoElectronico)) {
        errors.push('El correo electrónico es inválido');
    }

    if (!validarFechaNacimiento(data.fechaNacimiento)) {
        errors.push('El usuario debe ser mayor de edad');
    }

    if (!validarTelefono(data.telefono)) {
        errors.push('El teléfono es inválido');
    }

    if (!validarEdad(data.edad)) {
        errors.push('La edad debe estar entre 18 y 100 años');
    }

    if (data.correoElectronico.length > 100) {
        errors.push('El correo electrónico debe tener máximo 100 caracteres');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

module.exports = validateUserData;
