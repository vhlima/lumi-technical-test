import { http } from "../client";
import { ClientProfile } from "../interfaces";

export class FindClientProfileService {
  public async execute(): Promise<ClientProfile> {
    try {
      const req = await http.get("/clients/profile", {
        data: {
          clientId: 7202788969,
        },
      });

      return req.data;
    } catch (err) {
      return {
        energySpent: 0,
        averageMonthlyPrice: 0,
        invoiceCount: 0,
        invoicesTotalPrice: 0,
      };
    }
  }
}
