export interface LoadPDF {
  execute: (path: string) => Promise<string[][]>;
}