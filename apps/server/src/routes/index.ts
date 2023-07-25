import { Router } from "express";
import invoicesRouter from "./invoice";

const serverRouter = Router();

serverRouter.use('/invoices', invoicesRouter);

serverRouter.get('/', (_, res) => {
  res.send('Hello World!');
})


export default serverRouter;