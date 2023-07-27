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

  clientId: string;

  installationNumber: number;

  price: number;

  energySpent: number;

  expenses: InvoiceExpense[];

  relativeTo: string;

  expiresAt: string;
}