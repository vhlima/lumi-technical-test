import { Router } from "express";
import {
  getFindClientProfileService,
  getFindClientService,
} from "@/main/factories";
import { errorHandler } from "@/adapters";
import { Joi, Segments, celebrate } from "celebrate";

const clientsRouter = Router();

clientsRouter.get(
  "/",
  celebrate({
    [Segments.BODY]: {
      clientId: Joi.number().required(),
    },
  }),
  async (req, res) => {
    try {
      const findClientService = getFindClientService();

      const client = await findClientService.execute(req.body.clientId);

      res.status(200).json({ client });
    } catch (error) {
      const errorResponse = errorHandler.handle(error);
      res.status(errorResponse.code).json({ error: errorResponse.message });
    }
  }
);

clientsRouter.get(
  "/profile",
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

export default clientsRouter;
