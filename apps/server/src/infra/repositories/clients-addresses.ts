import { IClientsAddressesRepository, CreateClientAddressData } from "@/data/contracts";
import { Repository } from "typeorm";
import { ClientAddressEntity } from "@/infra/entities";
import { PostgresDataSource } from "@/infra/data-sources";
import { ClientAddress } from "@/domain/entities";

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
}
