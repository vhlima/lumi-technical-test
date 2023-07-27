import { Client } from "@/domain/entities";

export interface ParseClient {
  execute: (contentRows: string[][]) => Client | null;
}