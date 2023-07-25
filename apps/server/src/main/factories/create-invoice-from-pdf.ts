import { LoadPDFAdapter } from "@/adapters";
import {
  CreateInvoiceExpenseService,
  CreateInvoiceFromPDFService,
  CreateInvoiceService,
  ParseInvoiceService,
} from "@/data/services";
import {
  InvoicesExpensesRepository,
  InvoicesRepository,
} from "@/infra/repositories";

export function getCreateInvoiceFromPDFService(): CreateInvoiceFromPDFService {
  const service = new CreateInvoiceFromPDFService(
    new LoadPDFAdapter(),
    new ParseInvoiceService(),
    new CreateInvoiceService(new InvoicesRepository()),
    new CreateInvoiceExpenseService(new InvoicesExpensesRepository())
  );
  return service;
}
