const mongoose = require('mongoose');
const { dbURL } = require('./config/base');

const cnt = mongoose.connect(dbURL, {
    useNewUrlParser: true
}).then(db => console.log('db is connected'))
    .catch(err => console.log(err));

module.exports = {
    connection: cnt
}