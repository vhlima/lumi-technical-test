import { Invoice } from "@/domain/entities";
import { ListInvoices } from "@/domain/usecases";
import { IInvoicesRepository } from "@/data/contracts";

export class ListInvoicesService implements ListInvoices {
  constructor(private readonly invoicesRepository: IInvoicesRepository) {}

  public async execute(addressId: number): Promise<Invoice[]> {
    const latestInvoices = await this.invoicesRepository.list(addressId);
    return latestInvoices;
  }
}