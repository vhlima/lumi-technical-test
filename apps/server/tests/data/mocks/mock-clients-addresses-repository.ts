import {
  CreateClientAddressData,
  IClientsAddressesRepository,
  IClientsRepository,
} from "@/data/contracts";
import { ClientAddress } from "@/domain/entities";

export class MockClientAddressesRepository
  implements IClientsAddressesRepository
{
  addresses: ClientAddress[];

  constructor(private readonly clientsRepository: IClientsRepository) {
    this.addresses = [];
  }

  public async create(data: CreateClientAddressData): Promise<ClientAddress> {
    const { clientId, ...addressData } = data;

    const address: ClientAddress = {
      ...addressData,
    };

    const client = await this.clientsRepository.findById(clientId);
    if (client) {
      client.addresses.push(address);
    }

    this.addresses.push(address);
    return address;
  }

  public async findById(addressId: number): Promise<ClientAddress | null> {
    const address = this.addresses.find((address) => address.id === addressId);
    return address || null;
  }
}
