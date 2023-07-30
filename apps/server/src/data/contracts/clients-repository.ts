import { Client } from "@/domain/entities";

export interface CreateClientData {
  id: number;
  fullName: string;
}

export interface IClientsRepository {
  list: () => Promise<Client[]>;
  create: (data: CreateClientData) => Promise<Client>;
  findById: (clientId: number) => Promise<Client | null>;
}