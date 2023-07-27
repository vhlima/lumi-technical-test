import { Client } from "@/domain/entities";
import { FindClient } from "@/domain/usecases";
import { IClientsRepository } from "@/data/contracts";
import { ServerError } from "@/errors";

export class FindClientService implements FindClient {
  constructor(private readonly clientsRepository: IClientsRepository) {}

  public async execute(clientId: number): Promise<Client> {
    const clientExists = await this.clientsRepository.findById(clientId);

    if (!clientExists) {
      throw new ServerError("ClientNotFound", "Client not found", 404);
    }

    return clientExists;
  }
}
