import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';
import bodyParser from 'body-parser';
import router from './routes/routes';


require('babel-core/register');
require('babel-polyfill');


const app = express();

dotenv.config();

// HERE WE WILL LET OUR APP TO GET ACCESS TO THE STATIC FOLDERS LIKE CSS, IMAGES.
app.use(express.static(resolve(__dirname, '../public')));
// app.get('/*', (req, res) => res.sendFile(resolve(__dirname, '../public/index.html')));
// app.use('/api/v1', express.static('images'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1', router);

// HANDLING CORS ERRORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.headers('Access Controll-Allow-Mthods', 'POST, PUT, GET, DELETE');
    return res.status(200).json({});
  }

  next();
});

// HANDLE ERROR
app.use((req, res, next) => {
  const error = new Error('NOT FOUND');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
