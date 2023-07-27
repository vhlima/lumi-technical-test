import { Client } from "@/domain/entities";
import { CreateClientData } from "@/domain/usecases";

export interface IClientsRepository {
  list: () => Promise<Client[]>;
  create: (data: CreateClientData) => Promise<Client>;
  findById: (clientId: number) => Promise<Client | null>;
}