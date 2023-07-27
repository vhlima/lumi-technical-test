import { http } from "../client";
import { Client } from "../interfaces";

export class ListClientsService {
  public async execute(): Promise<Client[]> {
    try {
      const req = await http.get("/clients");
      return req.data;
    } catch (err) {
      console.error("Error while fetching clients");
      return [];
    }
  }
}
