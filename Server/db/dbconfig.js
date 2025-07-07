const mysql = require("mysql2");

const sqlconnection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.NAME,
  port: process.env.PORT,
  ssl: {
    rejectUnauthorized: true,
  },
  connectionLimit: 10,
});

// sqlconnection.execute("select 'test' ", (err, result) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(result);
//   }
// });

module.exports = sqlconnection.promise();
