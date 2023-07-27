import { http } from "../client";
import { Invoice } from "../interfaces";

export class ListLatestInvoicesService {
  public async execute(): Promise<Invoice[]> {
    try {
      const req = await http.get(`/invoices/${7202788969}/latest`);
      return req.data;
    } catch (err) {
      console.error("Error while fetching latest invoices");
      return [];
    }
  }
}
