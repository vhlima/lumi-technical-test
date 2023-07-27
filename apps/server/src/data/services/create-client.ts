import { Client } from "@/domain/entities";
import { CreateClient, CreateClientData } from "@/domain/usecases";
import { IClientsRepository } from "@/data/contracts";

export class CreateClientService implements CreateClient {
  constructor(private readonly clientsRepository: IClientsRepository) {}

  private firstLetterUppercase(str: string): string {
    return `${str[0].toUpperCase()}${str.slice(1, str.length).toLowerCase()}`;
  }

  public async execute(data: CreateClientData): Promise<Client> {
    const clientExists = await this.clientsRepository.findById(data.id);

    if (clientExists) {
      return clientExists;
    }

    const client = await this.clientsRepository.create({
      ...data,
      fullName: data.fullName
        .split(" ")
        .map((name) => this.firstLetterUppercase(name))
        .join(" "),
    });
    return client;
  }
}
