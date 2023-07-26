import { Invoice } from "@/domain/entities";

export interface ValidateInvoice {
  execute: (data: Record<string, unknown>) => Invoice | null;
}
