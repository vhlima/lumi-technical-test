export interface ClientProfile {
  energySpent: number;
  averageMonthlyPrice: number;
  invoiceCount: number;
  invoicesTotalPrice: number;
}

export interface Client {
  id: number;
  fullName: string;
  addresses: ClientAddress[];
}

export interface ClientAddress {
  id: number;
  streetAddress: string;
  district: string;
  zipCode: string;
  state: string;
  city: string;
}