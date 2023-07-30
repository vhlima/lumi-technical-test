import {
  InvoiceParsersService,
  LabelMapperService,
  ParseClientAddressService,
  ParseClientService,
  ParseExpensesService,
  ParseInvoiceService,
} from "@/data/services";
import {
  ClientAddressValidator,
  ClientValidator,
  InvoiceExpenseValidator,
  InvoiceValidator,
} from "@/validation/validators";

export function getInvoiceParsersService(): InvoiceParsersService {
  const labelMapper = new LabelMapperService();

  const service = new InvoiceParsersService(
    new ParseClientService(new ClientValidator(), labelMapper),
    new ParseInvoiceService(new InvoiceValidator(), labelMapper),
    new ParseExpensesService(new InvoiceExpenseValidator(), labelMapper),
    new ParseClientAddressService(new ClientAddressValidator(), labelMapper)
  );

  return service;
}
