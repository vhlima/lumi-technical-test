import { Client } from "@/domain/entities";

export interface ListClients {
  execute: () => Promise<Client[]>;
}