import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';
import bodyParser from 'body-parser';
import swaggerSpec from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import router from './routes/routes';

require('babel-core/register');
require('babel-polyfill');


const app = express();

dotenv.config();

// use swagger-Ui-express for your app documentation endpoint
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// HERE WE WILL LET OUR APP TO GET ACCESS TO THE STATIC FOLDERS LIKE CSS, IMAGES.
app.use(express.static(resolve(__dirname, '../public')));
// app.get('/*', (req, res) => res.sendFile(resolve(__dirname, '../public/index.html')));
// app.use('/api/v1', express.static('images'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// HANDLING CORS ERRORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // res.header('Access-Control-Allow-Headers', '*');
  // if (req.method === 'OPTIONS') {
  //   res.header('Access Control-Allow-Methods', 'POST, PUT, GET, DELETE');
  //   return res.status(200).json({});
  // }
  next();
});

app.use('/api/v1', router);


// app.use((req, res, next) => {
// res.setHeader('Access-Control-Allow-Origin', '*');
// res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
// next();
// });

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
