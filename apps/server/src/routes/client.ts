import { Router } from "express";
import { getFindClientService } from "@/main/factories";
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

export default clientsRouter;
