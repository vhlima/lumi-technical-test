export interface InvoiceExpenseModel {
  name: string;
  price: number;
  measurementUnit?: string;
  quantity?: number,
  unitaryPrice?: number;
  unitaryTaxPrice?: number;
}