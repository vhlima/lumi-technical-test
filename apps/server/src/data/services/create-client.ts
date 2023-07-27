import { Client } from "@/domain/entities";
import { CreateClient, CreateClientData } from "@/domain/usecases";
import { IClientsRepository } from "@/data/contracts";
import { firstLetterUppercase } from "@/utils/string-utils";

export class CreateClientService implements CreateClient {
  constructor(private readonly clientsRepository: IClientsRepository) {}

  public async execute(data: CreateClientData): Promise<Client> {
    const clientExists = await this.clientsRepository.findById(data.id);

    if (clientExists) {
      return clientExists;
    }

    const client = await this.clientsRepository.create({
      ...data,
      fullName: data.fullName
        .split(" ")
        .map((name) => firstLetterUppercase(name))
        .join(" "),
    });
    return client;
  }
}
