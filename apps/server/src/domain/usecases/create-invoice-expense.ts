import { InvoiceExpense } from "@/domain/entities";

export interface CreateInvoiceExpenseData {
  invoiceId: number;
  name: string;
  price: number;
  quantity?: number;
  unitaryPrice?: number; 
  unitaryTaxPrice?: number;
  measurementUnit?: string;
}

export interface CreateInvoiceExpense {
  execute: (data: CreateInvoiceExpenseData) => Promise<InvoiceExpense>;
}