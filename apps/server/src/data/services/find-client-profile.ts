import { ClientProfile } from "@/domain/entities";
import { FindClientProfile } from "@/domain/usecases";
import { IInvoicesRepository } from "@/data/contracts";

export class FindClientProfileService implements FindClientProfile {
  constructor(private readonly invoicesRepository: IInvoicesRepository) {}

  public async execute(clientId: number): Promise<ClientProfile> {
    const invoices = await this.invoicesRepository.list(clientId);

    const invoicesTotalPrice = invoices.reduce(
      (acc, item) => (acc += item.price),
      0
    );

    const averageMonthlyPrice = invoicesTotalPrice / invoices.length;

    return {
      averageMonthlyPrice,
      invoiceCount: invoices.length,
      invoicesTotalPrice,
    };
  }
}