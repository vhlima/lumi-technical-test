import { http } from "../client";
import { Invoice } from "../interfaces";
import { raiseAxiosError } from "../utils/raise-axios-error";

export class CreateInvoiceService {
  public async execute(file: File): Promise<Invoice | null> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const req = await http.post(`/invoices/${7202788969}/upload`, formData, {
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
