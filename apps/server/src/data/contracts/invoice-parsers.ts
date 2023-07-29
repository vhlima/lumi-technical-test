import {
  ClientAddressModel,
  ClientModel,
  InvoiceExpenseModel,
  InvoiceModel,
} from "../models";

export interface InvoiceParsersResponse {
  invoice: InvoiceModel;
  client: ClientModel;
  address: ClientAddressModel;
  expenses: InvoiceExpenseModel[];
}

export interface InvoiceParsers {
  execute: (contentRows: string[][]) => InvoiceParsersResponse | null;
}
