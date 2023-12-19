const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routers/userRoute');

dotenv.config();

const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API has running');
});

app.use(authRoute);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
