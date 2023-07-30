import {
  CreateClientAddressData,
  IClientsAddressesRepository,
} from "@/data/contracts";
import { ClientAddress } from "@/domain/entities";

export class MockClientAddressesRepository
  implements IClientsAddressesRepository
{
  addresses: ClientAddress[];

  constructor(addresses: ClientAddress[] = []) {
    this.addresses = addresses;
  }

  public async create(data: CreateClientAddressData): Promise<ClientAddress> {
    const address: ClientAddress = {
      ...data,
    };

    this.addresses.push(address);
    return address;
  }

  public async findById(addressId: number): Promise<ClientAddress | null> {
    const address = this.addresses.find((address) => address.id === addressId);
    return address || null;
  }
}
