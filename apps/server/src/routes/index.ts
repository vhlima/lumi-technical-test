import { Router } from "express";
import invoicesRouter from "./invoice";
import { getFindClientProfileService } from "@/main/factories";
import { Joi, Segments, celebrate } from "celebrate";
import clientsRouter from "./client";

const serverRouter = Router();

serverRouter.use("/invoices", invoicesRouter);
serverRouter.use("/clients", clientsRouter);

serverRouter.get(
  "/client/profile",
  celebrate({
    [Segments.BODY]: {
      clientId: Joi.number().required(),
    },
  }),
  async (req, res) => {
    const findClientProfileService = getFindClientProfileService();
    const clientProfile = await findClientProfileService.execute(
      req.body.clientId
    );
    res.status(200).json(clientProfile);
  }
);

serverRouter.get("/", (_, res) => {
  res.send("Hello World!");
});

export default serverRouter;
