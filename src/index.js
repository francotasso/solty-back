const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const db = require('./dbconnection.js');
const routes = require('./routes');

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
app.use(cors());

//Routes
app.use(routes);

app.listen(app.get('port'), () => {
  console.log('Running in port', app.get('port'));
});
