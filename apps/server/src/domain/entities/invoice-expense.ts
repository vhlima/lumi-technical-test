import { Invoice } from "./invoice";

export class InvoiceExpense {
  id: number;
  name: string;
  price: number;
  quantity?: number;
  unitaryPrice?: number; 
  unitaryTaxPrice?: number;
  measurementUnit?: string;
  invoice: Invoice;
}