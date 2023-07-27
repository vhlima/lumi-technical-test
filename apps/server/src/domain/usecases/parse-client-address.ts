import { ClientAddress } from "@/domain/entities";

export interface ParseClientAddress {
  execute: (contentRows: string[][]) => ClientAddress | null;
}