import { Client } from "@/domain/entities";
import { ListClients } from "@/domain/usecases";
import { IClientsRepository } from "@/data/contracts";

export class ListClientsService implements ListClients {
  constructor(private readonly clientsRepository: IClientsRepository) {}

  public async execute(): Promise<Client[]> {
    const latestClients = await this.clientsRepository.list();
    return latestClients;
  }
}
