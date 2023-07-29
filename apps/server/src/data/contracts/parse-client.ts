import { ClientModel } from "@/data/models";

export interface ParseClient {
  execute: (contentRows: string[][]) => ClientModel | null;
}