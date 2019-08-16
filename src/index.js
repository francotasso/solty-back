const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

const app = express();
const db = require('./dbconnection.js');
require('./config/passport');
const users = require('./routes/user.js');
const products = require('./routes/product.js');
const payments = require('./routes/payments.js');

//Db connection
db.connection;

//Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
app.use(session({
    secret: 'secretproductsapp',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000
    }
}));
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use(products);
app.use(users);
app.use(payments);

app.listen(app.get('port'), () => {
    console.log('Running in port', app.get('port'));
});