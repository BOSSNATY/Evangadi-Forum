require("dotenv").config();
const express = require("express");
const app = express();
const port = 5500;
const fs = require("fs");

const cors = require("cors");

app.use(cors());

app.use(express.json());
// import database
const sqlconnection = require("./Server/db/dbconfig");

// user route middleware file
const userRoutes = require("./Server/routes/userRoute");

// question route middleware file
const questionRoutes = require("./Server/routes/questionRoute");

// answer route middleware file

const answerRoute = require("./Server/routes/answerRoute");

// user route middleware
app.use("/api/users", userRoutes);

// question route middleware
app.use("/api", questionRoutes);

// answer route middleware
app.use("/api", answerRoute);
// connecting database

if (!fs.existsSync("ca.pem")) {
  fs.writeFileSync("ca.pem", process.env.CA_CERT.replace(/\\n/g, "\n"));
}

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
