const express = require('express')
const app = express()
const hbs = require('hbs');

const port = 3000;

// Handlebars / partials
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {
    console.log(err);
});

// middlewares: Funcion que se ejecuta antes de hacer otra cosa
// Servir contenido estatico
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home', {
        nombre: "Gaston Alejandro Alvarez",
        titulo: "Node.js/Express"
    });
});

app.get('/elements', (req, res) => {
    res.render('elements')
});

app.get('/generic', (req, res) => {
    res.render('generic')
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})