const express = require('express');
const morgan = require('morgan');
const hb = require('express-handlebars');
const path = require('path');
const router = express.Router();


//inicializaciones
const app = express();

//Configuraciones
app.set('port', process.env.port || 4000 );
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
router.get('/', (req, res) => {
    res.render('main');
})

app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/fundas', require('./routes/fundas'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Levantar servidor
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
})