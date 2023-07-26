import { Router } from "express";
import invoicesRouter from "./invoice";
import { getFindClientProfileService } from "@/main/factories";

const serverRouter = Router();

serverRouter.use("/invoices", invoicesRouter);

serverRouter.get("/client/profile", async (req, res) => {
  const findClientProfileService = getFindClientProfileService();
  const clientProfile = await findClientProfileService.execute(
    req.body.clientId
  );
  res.status(200).json(clientProfile);
});

serverRouter.get("/", (_, res) => {
  res.send("Hello World!");
});

export default serverRouter;
