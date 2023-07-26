import { Invoice } from "@/domain/entities";
import { CreateInvoice, CreateInvoiceData } from "@/domain/usecases";
import { IInvoicesRepository } from "@/data/contracts";
import { ServerError } from "@/errors";

export class CreateInvoiceService implements CreateInvoice {
  constructor(private readonly invoicesRepository: IInvoicesRepository) {}

  public async execute(data: CreateInvoiceData): Promise<Invoice> {
    const invoiceExists = await this.invoicesRepository.findByDate(
      data.clientId,
      data.relativeTo
    );

    if (invoiceExists) {
      throw new ServerError(
        "InvoiceAlreadyRegistered",
        "There is already an invoice registered within this month.",
        409
      );
    }

    const invoice = await this.invoicesRepository.create(data);
    return invoice;
  }
}
