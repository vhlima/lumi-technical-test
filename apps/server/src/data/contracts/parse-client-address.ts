import { ClientAddressModel } from "@/data/models";

export interface ParseClientAddress {
  execute: (contentRows: string[][]) => ClientAddressModel | null;
}