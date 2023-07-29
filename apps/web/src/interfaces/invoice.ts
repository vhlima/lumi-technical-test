import { Client, ClientAddress } from "./client";

export interface InvoiceExpense {
  id: number;
  name: string;
  price: number;
  quantity?: number;
  unitaryPrice?: number;
  unitaryTaxPrice?: number;
  measurementUnit?: string;
  invoice: Invoice;
}

export interface Invoice {
  id: number;

  client: Client;

  address: ClientAddress;

  price: number;

  energySpent: number;

  expenses: InvoiceExpense[];

  relativeYear: number;
  
  relativeMonth: number;

  expiresAt: string;
}
