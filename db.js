const mysql = require("mysql2")
require("dotenv").config()

const connection = mysql.createConnection({
    host: process.env.HOST_URL,
    post: process.env.PORT,
    password: process.env.PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DATABASE
})

connection.connect(async (err) => {
    if (err) {
        console.error("Error connection: ", err.stack)
        return
    }
})

module.exports = connection