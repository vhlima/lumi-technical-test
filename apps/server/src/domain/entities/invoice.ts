import { InvoiceExpense } from "./invoice-expense";

export class Invoice {
  id: number;

  clientId: number;

  installationNumber: number;

  price: number;

  expenses: InvoiceExpense[];

  relativeTo: Date;

  expiresAt: Date;
}