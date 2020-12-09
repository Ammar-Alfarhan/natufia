const mysql = require('mysql');

const config = mysql.createConnection({
    user: 'root',
    password: '12345678',
    server: 'localhost',
    database: 'natufia',
    port: '3306'
});

config.connect((err) =>{
    if (err) console.log(err);
});

module.exports = config;