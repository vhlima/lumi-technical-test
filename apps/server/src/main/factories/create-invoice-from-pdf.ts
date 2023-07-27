import { LoadPDFAdapter } from "@/adapters";
import {
  CreateClientAddressService,
  CreateClientService,
  CreateInvoiceExpenseService,
  CreateInvoiceFromPDFService,
  CreateInvoiceService,
  InvoiceParsersService,
  LabelMapperService,
  ParseClientAddressService,
  ParseClientService,
  ParseExpensesService,
  ParseInvoiceService,
} from "@/data/services";
import {
  ClientsAddressesRepository,
  ClientsRepository,
  InvoicesExpensesRepository,
  InvoicesRepository,
} from "@/infra/repositories";
import {
  ClientAddressValidator,
  ClientValidator,
  InvoiceExpenseValidator,
  InvoiceValidator,
} from "@/validation/validators";

export function getCreateInvoiceFromPDFService(): CreateInvoiceFromPDFService {
  const labelMapper = new LabelMapperService();

  const service = new CreateInvoiceFromPDFService(
    new LoadPDFAdapter(),
    new InvoiceParsersService(
      new ParseClientService(new ClientValidator(), labelMapper),
      new ParseInvoiceService(new InvoiceValidator(), labelMapper),
      new ParseExpensesService(new InvoiceExpenseValidator(), labelMapper),
      new ParseClientAddressService(new ClientAddressValidator(), labelMapper)
    ),
    new CreateClientService(new ClientsRepository()),
    new CreateInvoiceService(new InvoicesRepository()),
    new CreateInvoiceExpenseService(new InvoicesExpensesRepository()),
    new CreateClientAddressService(new ClientsAddressesRepository())
  );
  return service;
}
