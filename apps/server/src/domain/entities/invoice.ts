import { Client, ClientAddress, InvoiceExpense } from "@/domain/entities";

export class Invoice {
  id: number;

  client: Client;

  address: ClientAddress;

  price: number;

  expenses: InvoiceExpense[];

  energySpent: number;

  relativeYear: number;
  
  relativeMonth: number;

  expiresAt: Date;
}