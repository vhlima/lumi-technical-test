import { http } from "../client";
import { Invoice } from "../interfaces";

export class ListLatestInvoicesService {
  public async execute(): Promise<Invoice[]> {
    try {
      const req = await http.get("/invoices/latest", {
        data: {
          clientId: 7202788969,
        },
      });

      return req.data;
    } catch (err) {
      console.error("Error while fetching latest invoices");
      return [];
    }
  }
}
