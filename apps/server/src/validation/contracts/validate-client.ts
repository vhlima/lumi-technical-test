import { Client } from "@/domain/entities";

export interface ValidateClient {
  execute: (data: Record<string, unknown>) => Client | null;
}
