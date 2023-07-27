import { http } from "../client";
import { Client } from "../interfaces";
import { raiseAxiosError } from "../utils/raise-axios-error";

export class FindClientService {
  public async execute(clientId: number): Promise<Client | null> {
    try {
      const req = await http.get(`/clients/${clientId}`);

      return req.data;
    } catch (err) {
      raiseAxiosError(err);
      return null;
    }
  }
}
