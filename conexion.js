var mysql = require('mysql2');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'anyel',
    database: 'factura'
});

var getConecction = function(cb){
    pool.getConnection(function(error, connection){
        if(error) throw error;
        cb(null,  connection);
    })
    
}

module.exports = getConecction;