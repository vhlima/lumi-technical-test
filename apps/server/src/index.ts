import 'reflect-metadata';

import dotenv from "dotenv"
dotenv.config()

import express from 'express';
import cors from 'cors';
import { connectPostgres } from '@/infra/data-sources';
import serverRouter from './routes';

const app = express();
const port = 4000

app.use(express.json());
app.use(
  cors({
    origin: process.env.WEB_APP_URL,
    credentials: true,
  }),
);
app.use(serverRouter);

app.listen(port, () => {
  connectPostgres();

  console.log(`Example app listening on port ${port}`);
})