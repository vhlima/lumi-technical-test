import { http } from "../client";
import { Invoice } from "../interfaces";

export class ListInvoicesService {
  public async execute(): Promise<Invoice[]> {
    try {
      const req = await http.get(`/invoices/${7202788969}`);
      return req.data;
    } catch (err) {
      console.error("Error while fetching invoices");
      return [];
    }
  }
}
