const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;


app.use(session({
    secret: 'miSecretodeSesión',
    resave: false,
    saveUninitialized: true
}));


app.get('/', (req, res) => {
    if (!req.session.counter) {
        req.session.counter = 1; 
    } else {
        req.session.counter++; 
    }

    res.send(`Número de visitas: ${req.session.counter}`);
});

app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
    console.log('Ulises Mejía #9')
});
