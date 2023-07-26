import { http } from "../client";
import { Invoice } from "../interfaces";

export class CreateInvoiceService {
  public async execute(file: File): Promise<Invoice | null> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const req = await http.post("/invoices/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return req.data;
    } catch (err) {
      console.error("Error while creating invoice");
      return null;
    }
  }
}
