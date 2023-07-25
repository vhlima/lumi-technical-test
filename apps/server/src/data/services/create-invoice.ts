import { Invoice } from "@/domain/entities";
import { CreateInvoice, CreateInvoiceData } from "@/domain/usecases";
import { IInvoicesRepository } from "@/data/contracts";

export class CreateInvoiceService implements CreateInvoice {
  constructor(private readonly invoicesRepository: IInvoicesRepository) {}

  public async execute(data: CreateInvoiceData): Promise<Invoice> {
    const invoice = await this.invoicesRepository.create(data);
    return invoice;
  }
}