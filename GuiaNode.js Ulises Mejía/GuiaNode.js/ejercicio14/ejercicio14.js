const express = require('express');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');

const app = express();
const port = 3000;


const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log('Directorio "uploads" creado correctamente.');
} else {
    console.log('El directorio "uploads" ya existe.');
}


app.use(express.static(path.join(__dirname, 'public')));


app.use(fileUpload());


app.get('/', (req, res) => {
    res.send(`
        <h1>Subir Archivos</h1>
        <form action="/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="archivo">
            <button type="submit">Subir Archivo</button>
        </form>
    `);
});


app.post('/upload', (req, res) => {
    if (!req.files || !req.files.archivo) {
        return res.status(400).send('No se ha subido ningún archivo.');
    }

    
    const archivo = req.files.archivo;


    archivo.mv(path.join(uploadDir, archivo.name), err => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('Archivo subido correctamente: ' + archivo.name);
    });
});


app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
    console.log('Ulises Mejía #9')
});
