import { ClientAddress } from "@/domain/entities";
import { CreateClientAddressData } from "@/domain/usecases";

export interface IClientsAddressesRepository {
  create: (data: CreateClientAddressData) => Promise<ClientAddress>;
  findById: (addressId: number) => Promise<ClientAddress | null>;
  findByStreetAddress: (streetAddress: string) => Promise<ClientAddress | null>;
}