function validarCedula(cedula) {
    if (cedula.length !== 10 || isNaN(cedula)) {
        return false;
    }

    const provincia = parseInt(cedula.substring(0, 2), 10);
    if (provincia < 1 || provincia > 24) {
        return false;
    }

    const digitos = cedula.split('').map(Number);
    const suma = digitos.slice(0, 9).reduce((acc, num, idx) => {
        if (idx % 2 === 0) {
            const doble = num * 2;
            acc += doble > 9 ? doble - 9 : doble;
        } else {
            acc += num;
        }
        return acc;
    }, 0);

    const mod = suma % 10;
    const verificador = mod === 0 ? 0 : 10 - mod;

    return verificador === digitos[9];
}

function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

function validarFechaNacimiento(fechaNacimiento) {
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const fechaActual = new Date();

    // Calcular la diferencia de años entre la fecha actual y la fecha de nacimiento
    let edad = fechaActual.getFullYear() - fechaNacimientoDate.getFullYear();
    const mes = fechaActual.getMonth() - fechaNacimientoDate.getMonth();

    // Ajustar la edad si la fecha actual es anterior al cumpleaños en el año actual
    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimientoDate.getDate())) {
        edad--;
    }

    return edad >= 18;
}

function validarTelefono(telefono) {
    const telefonoRegex = /^0\d{9}$/;
    return telefonoRegex.test(telefono);
}

function validarEdad(edad) {
    return edad >= 18 && edad <= 100;
}

module.exports = {
    validarCedula,
    validarCorreo,
    validarFechaNacimiento,
    validarTelefono,
    validarEdad
};
