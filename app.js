require("dotenv").config();
const express = require("express");
const app = express();
const port = 5500;

app.use(express.json());
// import database
const sqlconnection = require("./db/dbconfig");

// user route middleware file
const userRoutes = require("./routes/userRoute");

// user route middleware
app.use("/api/users", userRoutes);

// connecting database
async function start() {
  try {
    const result = await sqlconnection.execute("select 'test'");
    await app.listen(port);
    console.log("database connection established");
    console.log(`listening on ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}

start();
