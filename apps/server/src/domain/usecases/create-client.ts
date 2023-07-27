import { Client } from "@/domain/entities";

export interface CreateClientData {
  id: number;
  fullName: string;
}

export interface CreateClient {
  execute: (data: CreateClientData) => Promise<Client>;
}