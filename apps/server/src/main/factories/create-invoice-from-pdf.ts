import { LoadPDFAdapter } from "@/adapters";
import {
  CreateInvoiceFromPDFService,
  LabelMapperService,
} from "@/data/services";
import {
  ClientsAddressesRepository,
  ClientsRepository,
  InvoicesExpensesRepository,
  InvoicesRepository,
} from "@/infra/repositories";
import { getInvoiceParsersService } from "./invoice-parsers";

export function getCreateInvoiceFromPDFService(): CreateInvoiceFromPDFService {
  const labelMapper = new LabelMapperService();

  const service = new CreateInvoiceFromPDFService(
    new LoadPDFAdapter(),
    getInvoiceParsersService(),
    new ClientsRepository(),
    new InvoicesRepository(),
    new InvoicesExpensesRepository(),
    new ClientsAddressesRepository()
  );
  return service;
}
