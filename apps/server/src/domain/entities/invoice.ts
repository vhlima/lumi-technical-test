import { Client, InvoiceExpense } from "@/domain/entities";

export class Invoice {
  id: number;

  client: Client;

  installationNumber: number;

  price: number;

  expenses: InvoiceExpense[];

  energySpent: number;

  relativeTo: Date;

  expiresAt: Date;
}