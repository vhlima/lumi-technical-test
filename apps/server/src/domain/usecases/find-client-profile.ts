import { ClientProfile } from "@/domain/entities";

export interface FindClientProfile {
  execute: (clientId: number) => Promise<ClientProfile>;
}
