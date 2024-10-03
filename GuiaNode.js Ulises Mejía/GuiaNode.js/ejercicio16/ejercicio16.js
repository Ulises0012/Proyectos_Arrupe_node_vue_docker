const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/characters', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'characters.html'));
});

app.get('/episodes', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'episodes.html'));
});

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'gallery.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});


app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
    console.log('Ulises Mejía #9')
});
