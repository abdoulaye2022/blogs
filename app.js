const express = require('express');
const { engine } = require('express-handlebars');
const fortune = require('./lib/fortune');

const app = express();

const port = process.env.PORT || 3000

// onfiguration du moteur de template Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// Middleware pour les fichiers static telque image, css et js
app.use(express.static(__dirname + '/public'));


// Les routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/service', (req, res) => {
    res.render('service', { fortunes: fortune.getFortune() });
});

app.use((req, res) => {
    res.status(400);
    res.render('404');
});

app.use((err, req, res, next) => {
    res.status(500);
    res.render('500');
});

app.listen(port, () => console.log(`Server is running on ${port}`));

