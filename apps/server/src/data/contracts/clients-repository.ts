import { Client } from "@/domain/entities";
import { CreateClientData } from "@/domain/usecases";

export interface IClientsRepository {
  create: (data: CreateClientData) => Promise<Client>;
  findById: (clientId: number) => Promise<Client | null>;
}