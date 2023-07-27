import { ClientAddress } from "@/domain/entities";

export interface CreateClientAddressData {
  clientId: number;
  streetAddress: string;
  district: string;
  zipCode: string;
  state: string;
  city: string;
}

export interface CreateClientAddress {
  execute: (data: CreateClientAddressData) => Promise<ClientAddress>;
}