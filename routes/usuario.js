const express = require('express');
const router = express.Router();
const getConnection = require('../conexion');
const validateUserData = require('../middleware/validateUserData'); // Assuming the middleware is in a 'middleware' folder

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
router.post('/usuario', validateUserData, (req, res) => {
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
router.put('/usuario/:id', validateUserData, (req, res) => {
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
            conn.release();
            if (error) {
                res.status(400).send('No se ha podido actualizar el usuario');
                return;
            }
            res.send({ message: 'Usuario actualizado exitosamente' });
        });
    });
});

module.exports = router;
