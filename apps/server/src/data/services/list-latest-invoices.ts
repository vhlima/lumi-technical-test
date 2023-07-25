import { Invoice } from "@/domain/entities";
import { ListLatestInvoices } from "@/domain/usecases";
import { IInvoicesRepository } from "@/data/contracts";

export class ListLatestInvoicesService implements ListLatestInvoices {
  constructor(private readonly invoicesRepository: IInvoicesRepository) {}

  public async execute(clientId: number): Promise<Invoice[]> {
    const latestInvoices = await this.invoicesRepository.findLatest(clientId, 5);
    return latestInvoices;
  }
}