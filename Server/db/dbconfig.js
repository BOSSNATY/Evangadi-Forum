const mysql = require("mysql2");
const fs = require("fs");

const sqlconnection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.NAME,
  port: process.env.PORT,
  ssl: {
    ca: fs.readFileSync("ca.pem"),
    rejectUnauthorized: true,
  },
  connectionLimit: 10,
});

module.exports = sqlconnection.promise();
