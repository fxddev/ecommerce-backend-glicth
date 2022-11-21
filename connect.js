const mysql = require('mysql')

// clever-cloud.com
// fahmidaud354@gmail.com
const conn = mysql.createConnection({
    host: 'baf1jbsistamhsc1hrt3-mysql.services.clever-cloud.com',
    user: 'uzmhgdvp2mkoygxe',
    password: 'TX9d4iyuUuaEgpzyMg6j',
    database: 'baf1jbsistamhsc1hrt3'
})

conn.connect((err) => {
    if (err) throw err;

    console.log('MySQL Connected')
})

module.exports = conn