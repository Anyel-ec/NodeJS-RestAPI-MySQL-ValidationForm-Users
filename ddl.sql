use factura;

CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    cedula VARCHAR(10) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    correo VARCHAR(100) NOT NULL
);

INSERT INTO cliente (nombre, cedula, telefono, direccion, correo) 
VALUES ('Angel Patino', '1234567890', '555-1234', 'Calle  123', 'example@espe.edu.com');