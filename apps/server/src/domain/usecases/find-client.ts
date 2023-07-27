import { Client } from "@/domain/entities";

export interface FindClient {
  execute: (clientId: number) => Promise<Client>;
}
