const express = require('express');
const morgan = require('morgan');
const hb = require('express-handlebars');
const path = require('path');
const pool = require('./database');
const router = express.Router();

//inicializaciones
const app = express();

//Public
app.use(express.static(path.join(__dirname, '/public')));


//Configuraciones
app.set('port', process.env.PORT || 4000 );
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')


//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Variables globales
app.use((req, res, next) => {
    next();
});

//Rutas

app.get('/', async (req, res) => {
    await pool.query('SELECT * FROM productos', (err, productos) => {
        if (err) throw err;
        res.render('index', {
            data: productos
        });
    });
})
app.use(require('./routes/routes'));
app.use('/', require('./routes/api'));

//Levantar servidor
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
})