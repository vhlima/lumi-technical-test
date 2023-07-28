import { Router } from "express";
import { getFindClientService, getListClientsService } from "@/main/factories";
import { errorHandler } from "@/adapters";
import { Joi, Segments, celebrate } from "celebrate";

const clientsRouter = Router();

clientsRouter.get("/", async (req, res) => {
  try {
    const listClientsService = getListClientsService();

    const clients = await listClientsService.execute();

    res.status(200).json(clients);
  } catch (error) {
    const errorResponse = errorHandler.handle(error);
    res.status(errorResponse.code).json({ error: errorResponse.message });
  }
});

clientsRouter.get(
  "/:clientId",
  celebrate({
    [Segments.PARAMS]: {
      clientId: Joi.number().required(),
    },
  }),
  async (req, res) => {
    try {
      const findClientService = getFindClientService();

      const client = await findClientService.execute(
        parseInt(req.params.clientId, 10)
      );

      res.status(200).json(client);
    } catch (error) {
      const errorResponse = errorHandler.handle(error);
      res.status(errorResponse.code).json({ error: errorResponse.message });
    }
  }
);

export default clientsRouter;
