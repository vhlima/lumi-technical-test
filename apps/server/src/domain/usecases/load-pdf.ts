import { PDFDocument } from "@/domain/entities";

export interface LoadPDF {
  execute: (path: string) => Promise<PDFDocument>;
}