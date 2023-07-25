import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import {
  getCreateInvoiceFromPDFService,
  getListInvoicesService,
  getListLatestInvoicesService,
} from "@/main/factories";

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

invoicesRouter.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("Missing PDF file");
    }

    const service = getCreateInvoiceFromPDFService();

    const invoice = await service.execute(req.file.path);

    res.status(200).json(invoice);
  } catch (error) {
    console.error("Error parsing PDF:", error);
    res.status(500).json({ error: "Error parsing PDF" });
  } finally {
    if (req.file?.path) {
      fs.unlinkSync(req.file.path);
    }
  }
});

invoicesRouter.get("/latest", async (req, res) => {
  const listLatestInvoicesService = getListLatestInvoicesService();
  const latest = await listLatestInvoicesService.execute(req.body.clientId);
  res.status(200).json(latest);
});

invoicesRouter.get('/', async (req, res) => {
  const listInvoicesService = getListInvoicesService();
  const invoices = await listInvoicesService.execute(req.body.clientId);
  res.status(200).json(invoices);
});

export default invoicesRouter;
