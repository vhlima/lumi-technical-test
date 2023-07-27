import { Router } from "express";
import invoicesRouter from "./invoice";
import clientsRouter from "./client";

const serverRouter = Router();

serverRouter.use("/invoices", invoicesRouter);
serverRouter.use("/clients", clientsRouter);

serverRouter.get("/", (_, res) => {
  res.send("Hello World!");
});

export default serverRouter;
