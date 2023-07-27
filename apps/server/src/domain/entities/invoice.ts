import { Client, ClientAddress, InvoiceExpense } from "@/domain/entities";

export class Invoice {
  id: number;

  client: Client;

  address: ClientAddress;

  price: number;

  expenses: InvoiceExpense[];

  energySpent: number;

  relativeTo: Date;

  expiresAt: Date;
}