import fs from "fs";
import { getDocument } from "pdfjs-dist";
import { LoadPDF } from "@/domain/usecases";
import { TextItem } from "pdfjs-dist/types/src/display/api";

export class LoadPDFAdapter implements LoadPDF {
  /*
    This function converts pdf files text items into rows for better information
    extraction. The only purpose of this function is to make it easier and precise 
    to read informations.
  */
  private transformTextContentItemsToRows(items: TextItem[]): string[][] {
    const rows: string[][] = [[]];

    let lastItem = null;
    let currentRowIndex = 0;

    for (let i = 0; i < items.length; i++) {
      let item = items[i];

      if (lastItem !== null && lastItem.str[lastItem.str.length - 1] !== " ") {
        if (item.transform[5] < lastItem.transform[5]) {
          currentRowIndex++;
        }
      }

      if (!rows[currentRowIndex]) {
        rows[currentRowIndex] = [];
      }

      rows[currentRowIndex].push(item.str);
      lastItem = item;
    }

    return rows;
  }

  public async execute(path: string): Promise<string[][]> {
    const pdfData = new Uint8Array(fs.readFileSync(path));

    const loadingTask = getDocument({ data: pdfData, useSystemFonts: true });

    const document = await loadingTask.promise;

    const page = await document.getPage(1);

    const content = await page.getTextContent();

    return this.transformTextContentItemsToRows(content.items as TextItem[]);
  }
}
