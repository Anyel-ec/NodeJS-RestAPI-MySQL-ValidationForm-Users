
const express = require('express');
const router = express.Router();

var getConnection = require('../conexion');

// Endpoint to get all clients
router.get('/clientes', (req, res) => {
    getConnection(function(error, conn) {
        // Manage errors
        if (error) {
            res.sendStatus(400);
            return;
        }
        
        // Query to get all clients
        conn.query('SELECT * FROM cliente', function(error, rows) {
            conn.release();
            if (error) {
                res.status(400).send('No se ha podido obtener los datos');
                return;
            }
            res.send(rows);
        });
    });
});

// endpoint to getAll client, require path of identification 
router.get('/usuario/:cedula', (req, res) => {
    getConnection(function(error, conn) {
        // manager errors
        if (error) {
            res.sendStatus(400);
            return;
        }
        
        const { cedula } = req.params;
        // query to getAll client
        conn.query('SELECT * FROM cliente WHERE cedula = ?', [cedula], function(error, rows) {
            if (error) {
                conn.release();
                res.status(400).send('No se ha podido obtener los datos');
                return;
            }
            res.send(rows);
        });
    });
});

// Endpoint to get client by ID
router.get('/cliente/:id', (req, res) => {
    getConnection(function(error, conn) {
        if (error) {
            res.sendStatus(400);
            return;
        }
        
        const { id } = req.params;
        conn.query('SELECT * FROM cliente WHERE id = ?', [id], function(error, rows) {
            conn.release();
            if (error) {
                res.status(400).send('No se ha podido obtener los datos');
                return;
            }
            res.send(rows[0]); // Assuming there's only one client with that ID
        });
    });
});



router.post('/cliente/', (req, res, next)=>{
    const data = {
        nombre: req.body.nombre, 
        cedula: req.body.cedula, 
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        correo: req.body.correo
    }

    const query="Insert into cliente (nombre, cedula, telefono, direccion, correo) values (\'"
    +data.nombre+"\',\'"+data.cedula+"\',\'"+data.telefono+"\',\'"+data.direccion+"\',\'"+data.correo+"\')";

    getConnection(function(err, conn) {
        console.log(err)
        // manager errors
        if (err) {
            res.sendStatus(400, "No se puede conectar a la base de datos ", err);
            return;
        }
        
        // query to getAll client
        conn.query(query, function(err, rows) {
            console.log(query);
            console.log(err)
            if (err) {
            
                 return res.sendStatus(400, 'No se ha podido obtener los datos', err);
                 console.log(err);
            }
            else{
                conn.release();
                res.json({status: 'registro exitsoso '})
            }
            });
            
        
    });

});   

// Endpoint to delete a client by ID
router.delete('/cliente/:id', (req, res) => {
    getConnection(function(error, conn) {
        if (error) {
            res.sendStatus(400);
            return;
        }

        const { id } = req.params;
        conn.query('DELETE FROM cliente WHERE id = ?', [id], function(error, results) {
            conn.release();
            if (error) {
                res.status(400).send('No se ha podido eliminar el cliente');
                return;
            }
            res.send({ message: 'Cliente eliminado exitosamente' });
        });
    });
});

// Endpoint to update a client by ID
router.put('/cliente/:id', (req, res) => {
    getConnection(function(error, conn) {
        if (error) {
            res.sendStatus(400);
            return;
        }

        const { id } = req.params;
        const data = {
            nombre: req.body.nombre, 
            cedula: req.body.cedula, 
            telefono: req.body.telefono,
            direccion: req.body.direccion,
            correo: req.body.correo
        };

        conn.query('UPDATE cliente SET ? WHERE id = ?', [data, id], function(error, results) {
            conn.release();
            if (error) {
                res.status(400).send('No se ha podido actualizar el cliente');
                return;
            }
            res.send({ message: 'Cliente actualizado exitosamente' });
        });
    });
});

module.exports = router;