const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    res.send(`
        <h1>¡Gracias por tu mensaje!</h1>
        <p>Nombre: ${name}</p>
        <p>Correo Electrónico: ${email}</p>
        <p>Mensaje: ${message}</p>
        <p><a href="/">Volver al formulario</a></p>
    `);
});

app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
    console.log('Ulises Mejía #9')
});
