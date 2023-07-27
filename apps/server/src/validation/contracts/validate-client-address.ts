import { ClientAddress } from "@/domain/entities";

export interface ValidateClientAddress {
  execute: (data: Record<string, unknown>) => ClientAddress | null;
}
