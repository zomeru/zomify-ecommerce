const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({
  path: './.env.local',
});

// app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('DB CONNECTION SUCCESSFUl'))
  .catch(error => console.log('DB CONNECTION ERROR', error));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

// route
app.get('/api', (req, res) => {
  //
  res.json({
    data: 'Sample Data',
  });
});

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
