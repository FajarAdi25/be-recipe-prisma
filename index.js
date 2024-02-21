/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const createError = require('http-errors');
const userRoute = require("./src/routers/userRoute");
const recipeRoute = require("./src/routers/recipeRoute");

dotenv.config();

const app = express();
const { PORT } = process.env || 2000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("API has running");
});

app.use(userRoute);
app.use(recipeRoute);

// app.all("*", (req, res, next) => {
//   next(new createError.NotFound());
// });

// app.use((err, req, res, next) => {
//   const messageError = err.message || "Internal Server Error";
//   const statuError = err.status || 500;
//   const formatError = {
//     status: "Success",
//     statusCode: statuError,
//     data: {
//       message: messageError,
//     },
//   };
//   res.status(statuError).json(formatError);
// });

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
