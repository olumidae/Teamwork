import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './routes/routes';

const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1', router);

// app.get('/', (req, res) => {
//   res.status(200).send({
//     status: 'Good',
//   });
// });

export default app;
