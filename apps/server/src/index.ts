import 'reflect-metadata';

import dotenv from "dotenv"
dotenv.config()

import express from 'express';
import { connectPostgres } from '@/infra/data-sources';

const app = express();
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  connectPostgres();

  console.log(`Example app listening on port ${port}`);
})