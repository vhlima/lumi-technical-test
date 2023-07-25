import 'reflect-metadata';

import dotenv from "dotenv"
dotenv.config()

import express from 'express';
import { connectPostgres } from '@/infra/data-sources';
import serverRouter from './routes';

const app = express();
const port = 4000

app.use(express.json());
app.use(serverRouter);

app.listen(port, () => {
  connectPostgres();

  console.log(`Example app listening on port ${port}`);
})