import { Invoice } from "@/domain/entities";

export interface CreateInvoiceFromPDF {
  execute: (pdfPath: string) => Promise<Invoice>;
}