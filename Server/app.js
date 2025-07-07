require("dotenv").config();
const express = require("express");
const app = express();
const port = 5500;
const fs = require("fs");

const cors = require("cors");

app.use(cors());

app.use(express.json());
// import database
const sqlconnection = require("./db/dbconfig");

// user route middleware file
const userRoutes = require("./routes/userRoute");

// question route middleware file
const questionRoutes = require("./routes/questionRoute");

// answer route middleware file

const answerRoute = require("./routes/answerRoute");

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
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

start();
