const express = require('express');
const router = express.Router();
const getConnection = require('../conexion');
const validarCorreo = require('../validaciones');
const validarCedula = require('../validaciones');
const validarFechaNacimiento = require('../validaciones');
const validarTelefono = require('../validaciones');
const validarEdad = require('../validaciones');

// Endpoint to get all users
router.get('/usuarios', (req, res) => {
    getConnection((error, conn) => {
        if (error) {
            res.sendStatus(400);
            return;
        }
        
        conn.query('SELECT * FROM Usuario', (error, rows) => {
            conn.release();
            if (error) {
                res.status(400).send('No se ha podido obtener los datos');
                return;
            }
            res.send(rows);
        });
    });
});

// Endpoint to get user by ID
router.get('/usuario/:id', (req, res) => {
    getConnection((error, conn) => {
        if (error) {
            res.sendStatus(400);
            return;
        }
        
        const { id } = req.params;
        conn.query('SELECT * FROM Usuario WHERE id = ?', [id], (error, rows) => {
            conn.release();
            if (error) {
                res.status(400).send('No se ha podido obtener los datos');
                return;
            }
            res.send(rows[0]); // Assuming there's only one user with that ID
        });
    });
});

// Endpoint to create a new user
router.post('/usuario', (req, res) => {
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

    // validaciones por metodo
    if (!validarCedula(data.cedula)) {
        return res.status(400).send('La cédula es inválida');
    }

    if (!validarCorreo(data.correoElectronico)) {
        return res.status(400).send('El correo electrónico es inválido');
    }

    if (!validarFechaNacimiento(data.fechaNacimiento)) {
        return res.status(400).send('El usuario debe ser mayor de edad');
    }

    if (!validarTelefono(data.telefono)) {
        return res.status(400).send('El teléfono es inválido');
    }
    if (!validarEdad(data.edad)) {
        return res.status(400).send('La edad debe estar entre 18 y 100 años');
    }

    // validaciones por longitud, validar que los campos no estén vacíos
    if (!data.nombre || !data.apellido || !data.fechaNacimiento || !data.correoElectronico 
        || !data.telefono || !data.estado || !data.edad || !data.cedula) {
        return res.status(400).send('Todos los campos son requeridos');
    }
    // validar longitud de los campos

    if (data.nombre.length < 3 || data.nombre.length > 50) {
        return res.status(400).send('El nombre debe tener entre 3 y 50 caracteres');
    }

    if (data.correoElectronico.length > 100) {
        return res.status(400).send('El correo electrónico debe tener máximo 100 caracteres');
    }



    const query = 'INSERT INTO Usuario (nombre, apellido, fechaNacimiento, correoElectronico, telefono, estado, edad, cedula) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    getConnection((err, conn) => {
        if (err) {
            res.sendStatus(400);
            return;
        }
        
        conn.query(query, Object.values(data), (err, results) => {
            conn.release();
            if (err) {
                res.status(400).send('No se ha podido registrar el usuario');
                return;
            }
            res.json({ status: 'Registro exitoso' });
        });
    });
});

// Endpoint to delete a user by ID
router.delete('/usuario/:id', (req, res) => {
    getConnection((error, conn) => {
        if (error) {
            res.sendStatus(400);
            return;
        }

        const { id } = req.params;
        conn.query('DELETE FROM Usuario WHERE id = ?', [id], (error, results) => {
            conn.release();
            if (error) {
                res.status(400).send('No se ha podido eliminar el usuario');
                return;
            }
            res.send({ message: 'Usuario eliminado exitosamente' });
        });
    });
});

// Endpoint to update a user by ID
router.put('/usuario/:id', (req, res) => {
    getConnection((error, conn) => {
        if (error) {
            res.sendStatus(400);
            return;
        }

        const { id } = req.params;
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

        conn.query('UPDATE Usuario SET ? WHERE id = ?', [data, id], (error, results) => {
            console.log(error);
            conn.release();
            if (error) {
                console.log(error);
                res.status(400).send('No se ha podido actualizar el usuario');
                return;
            }
            res.send({ message: 'Usuario actualizado exitosamente' });
        });
    });
});

module.exports = router;
