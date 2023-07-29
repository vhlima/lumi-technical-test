import { ClientModel } from "@/data/models";

export interface ValidateClient {
  execute: (data: Record<string, unknown>) => ClientModel | null;
}
