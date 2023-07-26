import { http } from "../client";
import { ClientProfile } from "../interfaces";

export class FindClientProfileService {
  public async execute(): Promise<ClientProfile> {
    try {
      const req = await http.get("/client/profile", {
        data: {
          clientId: 7202788969,
        },
      });

      return req.data;
    } catch (err) {
      return {
        averageMonthlyPrice: 0,
        invoiceCount: 0,
        invoicesTotalPrice: 0,
      };
    }
  }
}
