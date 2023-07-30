import { IClientsRepository, CreateClientData } from "@/data/contracts";
import { Repository } from "typeorm";
import { ClientEntity } from "@/infra/entities";
import { PostgresDataSource } from "@/infra/data-sources";
import { Client } from "@/domain/entities";

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
      relations: ["addresses"],
    });
  }

  public async list(): Promise<Client[]> {
    return this.ormRepository.find({
      relations: ["addresses"],
    });
  }
}
