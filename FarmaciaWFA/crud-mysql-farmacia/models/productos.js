const conexion = require("../conexion")

module.exports = {
    insertar(nombre, cantidad, precio){
        return new Promise((resolve, reject) => {
            conexion.query('insert into productos (nombre, cantidad, precio) values (?, ?,?)',
            [nombre, cantidad, precio], (err, resultados) => {
                if(err) reject(err);
                else resolve(resultados.insertId);
            });
        });
    },

    obtener(){
        return new Promise((resolve, reject) => {
            conexion.query('select id, nombre, cantidad, precio from productos',
            (err, resultados) => {
                if(err) reject(err);
                else resolve(resultados);
            });
        });
    },

    obtenerPorId(id) {
        return new Promise((resolve, reject) => {
            conexion.query('select id, nombre, cantidad, precio from productos where id = ?',
            [id],
            (err, resultados) => {
                console.log({resultados});
                if(err) reject(err);
                else resolve(resultados[0]);
            });
        });
    },

    actualizar(id, nombre, cantidad, precio){ 
        return new Promise((resolve, reject) => {
            conexion.query(`update productos set nombre = ?, cantidad = ?, precio = ? where id = ?`,
            [nombre, cantidad,precio, id], 
            (err) => { 
                if(err) reject(err); 
                else resolve();
            }); 
        }); 
    },

    eliminar(id) {
        return new Promise((resolve, reject) => {
            conexion.query('delete from productos where id = ?',
            [id],
            (err) => {
                if(err) reject(err);
                else resolve();
            });
        });
    },
}
