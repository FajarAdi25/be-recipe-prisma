/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoute = require('./routers/userRoute');
const recipeRoute = require('./routers/recipeRoute');

dotenv.config();

const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API has running');
});

app.use(userRoute);
app.use(recipeRoute);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
