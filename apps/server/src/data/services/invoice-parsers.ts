import {
  InvoiceParsers,
  InvoiceParsersResponse,
  ParseClient,
  ParseClientAddress,
  ParseInvoice,
  ParseInvoiceExpenses,
} from "@/data/contracts";

export class InvoiceParsersService implements InvoiceParsers {
  constructor(
    private readonly parseClientService: ParseClient,
    private readonly parseInvoiceService: ParseInvoice,
    private readonly parseInvoiceExpenseService: ParseInvoiceExpenses,
    private readonly parseClientAddressService: ParseClientAddress
  ) {}

  public execute(contentRows: string[][]): InvoiceParsersResponse | null {
    const parsedClient = this.parseClientService.execute(contentRows);

    if (!parsedClient) {
      return null;
    }

    const parsedClientAddress =
      this.parseClientAddressService.execute(contentRows);

    if (!parsedClientAddress) {
      return null;
    }

    const parsedInvoice = this.parseInvoiceService.execute(contentRows);

    if (!parsedInvoice) {
      return null;
    }

    const parsedExpenses = this.parseInvoiceExpenseService.execute(contentRows);

    return {
      client: parsedClient,
      expenses: parsedExpenses,
      invoice: parsedInvoice,
      address: parsedClientAddress,
    };
  }
}
