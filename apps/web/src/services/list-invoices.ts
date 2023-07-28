import { http } from "../client";
import { Invoice } from "../interfaces";

export class ListInvoicesService {
  public async execute(clientId: number): Promise<Invoice[]> {
    try {
      const req = await http.get(`/invoices/${clientId}`);
      return req.data;
    } catch (err) {
      console.error("Error while fetching invoices");
      return [];
    }
  }
}
