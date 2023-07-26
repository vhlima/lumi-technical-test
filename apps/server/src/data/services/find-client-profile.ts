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
      for (let i = 0; i < invoice.expenses.length; i++) {
        const expense = invoice.expenses[i];
        if (
          expense.quantity &&
          expense.measurementUnit &&
          expense.measurementUnit === "kWh" &&
          expense.price >= 0
        ) {
          acc += expense.quantity;
        }
      }
      return acc;
    }, 0);

    return {
      energySpent,
      averageMonthlyPrice: invoicesTotalPrice / invoices.length,
      invoiceCount: invoices.length,
      invoicesTotalPrice,
    };
  }
}
