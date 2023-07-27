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

    const energySpent = invoices.reduce((acc, invoice) => {
      return (acc += invoice.energySpent);
    }, 0);

    return {
      energySpent,
      averageMonthlyPrice: invoicesTotalPrice / invoices.length,
      invoiceCount: invoices.length,
      invoicesTotalPrice,
    };
  }
}
