import { IClientsRepository } from "@/data/contracts";
import { Repository } from "typeorm";
import { ClientEntity } from "@/infra/entities";
import { PostgresDataSource } from "@/infra/data-sources";
import { Client } from "@/domain/entities";
import { CreateClientData } from "@/domain/usecases";

export class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<ClientEntity>;

  constructor() {
    this.ormRepository = PostgresDataSource.getRepository(ClientEntity);
  }

  public async create(data: CreateClientData): Promise<Client> {
    const client = this.ormRepository.create(data);
    await this.ormRepository.save(client);
    return client;
  }

  public async findById(clientId: number): Promise<Client | null> {
    return this.ormRepository.findOne({
      where: {
        id: clientId,
      },
    });
  }
}
