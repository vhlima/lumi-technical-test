import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import {
  getCreateInvoiceFromPDFService,
  getListInvoicesService,
  getListLatestInvoicesService,
} from "@/main/factories";
import { errorHandler } from "@/adapters";
import { Joi, Segments, celebrate } from "celebrate";

const invoicesRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "invoices/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

invoicesRouter.post(
  "/upload",
  upload.single("file"),
  celebrate({
    [Segments.BODY]: {
      clientId: Joi.string(),
    },
  }),
  async (req, res) => {
    try {
      if (!req.file) {
        throw new Error("Missing PDF file");
      }

      const service = getCreateInvoiceFromPDFService();

      const invoice = await service.execute(
        req.file.path,
        req.body.clientId ? parseInt(req.body.clientId, 10) : undefined
      );

      res.status(200).json(invoice);
    } catch (error) {
      const errorResponse = errorHandler.handle(error);
      res.status(errorResponse.code).json({ error: errorResponse.message });
    } finally {
      if (req.file?.path) {
        fs.unlinkSync(req.file.path);
      }
    }
  }
);

invoicesRouter.get(
  "/:clientId/latest",
  celebrate({
    [Segments.PARAMS]: {
      clientId: Joi.number().required(),
    },
  }),
  async (req, res) => {
    const listLatestInvoicesService = getListLatestInvoicesService();
    const latest = await listLatestInvoicesService.execute(req.body.clientId);
    res.status(200).json(latest);
  }
);

invoicesRouter.get(
  "/:addressId",
  celebrate({
    [Segments.PARAMS]: {
      addressId: Joi.number().required(),
    },
  }),
  async (req, res) => {
    const listInvoicesService = getListInvoicesService();
    const invoices = await listInvoicesService.execute(parseInt(req.params.addressId, 10));
    res.status(200).json(invoices);
  }
);

export default invoicesRouter;
