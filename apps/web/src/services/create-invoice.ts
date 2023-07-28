import { http } from "../client";
import { Invoice } from "../interfaces";
import { raiseAxiosError } from "../utils/raise-axios-error";

export class CreateInvoiceService {
  public async execute(file: File, clientId?: number): Promise<Invoice | null> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("clientId", String(clientId));

      const req = await http.post(`/invoices/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return req.data;
    } catch (err) {
      raiseAxiosError(err);
      return null;
    }
  }
}
