import { LoadPDFAdapter } from "@/adapters";
import {
  CreateInvoiceExpenseService,
  CreateInvoiceFromPDFService,
  CreateInvoiceService,
  ParseExpensesService,
  ParseInvoiceService,
} from "@/data/services";
import {
  InvoicesExpensesRepository,
  InvoicesRepository,
} from "@/infra/repositories";
import { InvoiceExpenseValidator } from "@/validation/validators";

export function getCreateInvoiceFromPDFService(): CreateInvoiceFromPDFService {
  const service = new CreateInvoiceFromPDFService(
    new LoadPDFAdapter(),
    new ParseInvoiceService(),
    new ParseExpensesService(new InvoiceExpenseValidator()),
    new CreateInvoiceService(new InvoicesRepository()),
    new CreateInvoiceExpenseService(new InvoicesExpensesRepository())
  );
  return service;
}
