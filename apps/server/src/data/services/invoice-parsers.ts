import { Invoice } from "@/domain/entities";
import {
  InvoiceParsers,
  ParseClient,
  ParseClientAddress,
} from "@/domain/usecases";
import { ParseInvoice, ParseInvoiceExpenses } from "@/data/contracts";

export class InvoiceParsersService implements InvoiceParsers {
  constructor(
    private readonly parseClientService: ParseClient,
    private readonly parseInvoiceService: ParseInvoice,
    private readonly parseInvoiceExpenseService: ParseInvoiceExpenses,
    private readonly parseClientAddressService: ParseClientAddress
  ) {}

  public execute(contentRows: string[][]): Invoice | null {
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

    parsedInvoice.client = parsedClient;
    parsedInvoice.address = parsedClientAddress;

    const parsedExpenses = this.parseInvoiceExpenseService.execute(contentRows);

    parsedInvoice.expenses = parsedExpenses;

    return parsedInvoice;
  }
}
