const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const passportSetup = require('./config/passport');
const cors = require('cors');
const API = require('./API/API')
const path = require('path');
const app = express();
const db = require('./dbconnection.js');
const keys = require('./config/keys');
const users = require('./routes/user.js');
const oauth = require('./routes/oauth.js');
const products = require('./routes/product.js');
const payments = require('./routes/payments.js');

//Db connection
db.connection;

//Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
//app.use(cors({ credentials: true, origin: API.API.url }));
app.use(cors());
/*app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
});*/

//session
app.use(session({
    secret: keys.SESSION.secret,
    resave: false,
    saveUninitialized: false,
    /*cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000
    }*/
}));
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use(users);
app.use(oauth);
app.use(products);
app.use(payments);

app.listen(app.get('port'), () => {
    console.log('Running in port', app.get('port'));
});
