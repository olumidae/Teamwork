import express from 'express';

import dotenv from 'dotenv';

const app = express();

dotenv.config();
 
app.get('/', (req, res) => {
  res.status(200).send({
    status: 'Good'
  });
});

export default app;