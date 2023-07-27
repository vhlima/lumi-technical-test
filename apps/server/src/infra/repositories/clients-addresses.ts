import { IClientsAddressesRepository } from "@/data/contracts";
import { ILike, Repository } from "typeorm";
import { ClientAddressEntity } from "@/infra/entities";
import { PostgresDataSource } from "@/infra/data-sources";
import { Client, ClientAddress } from "@/domain/entities";
import { CreateClientAddressData } from "@/domain/usecases";

export class ClientsAddressesRepository implements IClientsAddressesRepository {
  private ormRepository: Repository<ClientAddressEntity>;

  constructor() {
    this.ormRepository = PostgresDataSource.getRepository(ClientAddressEntity);
  }

  public async create(data: CreateClientAddressData): Promise<ClientAddress> {
    const { clientId, ...addressData } = data;

    const client = this.ormRepository.create({
      ...addressData,
      client: {
        id: clientId,
      },
    });
    await this.ormRepository.save(client);
    return client;
  }

  public async findById(addressId: number): Promise<ClientAddress | null> {
    return this.ormRepository.findOne({
      where: {
        id: addressId,
      },
    });
  }

  public async findByStreetAddress(
    streetAddress: string
  ): Promise<ClientAddress | null> {
    return this.ormRepository.findOne({
      where: {
        streetAddress: ILike(streetAddress),
      },
    });
  }
}
