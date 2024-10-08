const express = require('express');
const router = express.Router();

const productosModel = require("../models/productos");


router.get('/', function (req, res, next) {
    productosModel
        .obtener()
        .then(productos => {
            res.render("productos/ver", {
                productos: productos,
            });
        })
        .catch(err => {
            return res.status(500).send("Error obtenido productos");
        });
});

router.get('/agregar', function (req, res, next) {
    res.render("productos/agregar");
});

router.post('/insertar', function (req, res, next) {
    const {nombre, cantidad, precio} = req.body;
    if(!nombre || !cantidad || !precio) {
        return res.status(500).send("No hay nombre o precio");
    }

    productosModel
        .insertar(nombre, cantidad, precio)
        .then(idProductoInsertado => {
            res.redirect("/productos");
        })
        .catch(err => {
            return res.status(500).send("Error insertando producto");
        });
});

router.get("/eliminar/:id", function (req, res, next) {
    productosModel
        .eliminar(req.params.id)
        .then(() => {
            res.redirect("/productos");
        })
        .catch(err => {
            return res.status(500).send("Error eliminando")
        });
});

router.get("/editar/:id", function (req, res, next) {
    productosModel
        .obtenerPorId(req.params.id)
        .then(producto => {
            if (producto) {
                console.log({producto});
                res.render("productos/editar", {
                    producto: producto,
                });
            }else{
                return res.status(500).send("No existe producto con ese id");
            }
        }).catch(err => {
            return res.status(500).send("Error obteniendo producto");
        });
});

router.post('/actualizar/', function (req, res, next) {
    const {id, nombre, cantidad, precio} = req.body;
    if(!nombre || !cantidad ||!precio || !id) {
        return res.status(500).send("No hay suficientes datos");
    }
    productosModel
        .actualizar(id, nombre, cantidad, precio)
        .then(() => {
            res.redirect("/productos");
        })
        .catch(err => {
            return res.status(500).send("Error actualizando producto");
        });
});

module.exports = router;