import { ClientAddressModel } from "@/data/models";

export interface ValidateClientAddress {
  execute: (data: Record<string, unknown>) => ClientAddressModel | null;
}
