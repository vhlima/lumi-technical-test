import { ClientAddress } from "@/domain/entities";

export interface CreateClientAddressData {
  clientId: number;
  id: number;
  streetAddress: string;
  district: string;
  zipCode: string;
  state: string;
  city: string;
}

export interface IClientsAddressesRepository {
  create: (data: CreateClientAddressData) => Promise<ClientAddress>;
  findById: (addressId: number) => Promise<ClientAddress | null>;
  findByStreetAddress: (streetAddress: string) => Promise<ClientAddress | null>;
}