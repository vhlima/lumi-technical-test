import { CreateClientData, IClientsRepository } from "@/data/contracts";
import { Client } from "@/domain/entities";

export class MockClientsRepository implements IClientsRepository {
  clients: Client[];

  constructor(clients: Client[] = []) {
    this.clients = clients;
  }

  public async list(): Promise<Client[]> {
    return this.clients;
  }

  public async findById(clientId: number): Promise<Client | null> {
    const client = this.clients.find((client) => client.id === clientId);
    return client || null;
  }

  public async create(data: CreateClientData): Promise<Client> {
    const client: Client = {
      addresses: [],
      ...data,
    };

    this.clients.push(client);
    return client;
  }
}
