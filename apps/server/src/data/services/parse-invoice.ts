import { Invoice } from "@/domain/entities";
import { ParseInvoice } from "@/domain/usecases";
import { ParseExpensesService } from "@/data/services";
import { parseBrazilianDate, parseMonthByName } from "@/utils/date-utils";
import { ServerError } from "@/errors";
import { InvoiceExpenseValidator } from "@/validation/validators";

interface LabelMapping {
  /* 
    We use this to find the specific location about our data.
    Label should always be a text that appears once in the document
    for finding purposes.
  */
  label: string;
  /* 
    The first number of this array is the rowIndex from the element based on
    label's rowIndex.

    Ex: labelRowIndex = 1, location = [1, 0], our valueRowIndex is going to be
    labelRowIndex + location[0] = valueRowIndex = 2 and we will search at index 0
    since location[1] = 0
  */
  location: [number, number];
  /* 
    Document values always come as string, this is only used if we need some 
    custom parsing for values 
  */
  parseValue?: (
    value: string,
    index: number,
    rowIndex: number,
    rows: string[][]
  ) => string | number | Date | Record<string, unknown> | unknown[];
}

/*
  We use this mapping object to specify wich informations we want to extract
  from the invoice pdf file.
*/
const labelMapping: { [key in keyof Omit<Invoice, "id">]: LabelMapping } = {
  clientId: {
    label: "Nº DO CLIENTE",
    location: [1, 1],
    parseValue: (value: string) => parseInt(value, 10),
  },
  installationNumber: {
    label: "Nº DA INSTALAÇÃO",
    location: [1, 3],
    parseValue: (value: string) => parseInt(value, 10),
  },
  relativeTo: {
    label: "Referente a",
    location: [1, 1],
    parseValue: (value: string) => {
      const [month, year] = value.split("/");

      const monthIndex = parseMonthByName(month);
      if (monthIndex === -1 && isNaN(Number(year))) {
        throw new Error("Error while parsing relative date from invoice");
      }

      const parsedDate = new Date(parseInt(year, 10), monthIndex);
      return parsedDate;
    },
  },
  expiresAt: {
    label: "Vencimento",
    location: [1, 3],
    parseValue: (value: string) => parseBrazilianDate(value),
  },
  price: {
    label: "Valor a pagar (R$)",
    location: [1, 5],
    parseValue: (value: string) =>
      parseFloat(value.replace(",", "").replace(".", "")),
  },
  expenses: {
    label: "Valores Faturados",
    location: [3, 0],
    parseValue: (
      value: string,
      index: number,
      rowIndex: number,
      rows: string[][]
    ) => {
      const parseExpensesService = new ParseExpensesService(new InvoiceExpenseValidator());
      return parseExpensesService.execute(rows, rowIndex, index);
    },
  },
};

export class ParseInvoiceService implements ParseInvoice {
  public execute(contentRows: string[][]): Invoice {
    const invoice = new Invoice();

    const mappingEntries = Object.entries(labelMapping);

    for (let i = 0; i < contentRows.length; i++) {
      for (let y = 0; y < contentRows[i].length; y++) {
        const rowFound = mappingEntries.find(
          ([, mapping]) => contentRows[i][y] === mapping.label
        );

        /* Search through every row element to try to find our label row */
        if (rowFound) {
          const [key, mapping] = rowFound;

          /* Value row index would be currentRowIndex + mappingIndexCount */
          const possibleValueRowIndex = i + mapping.location[0];

          if (possibleValueRowIndex < contentRows.length) {
            const row = contentRows[possibleValueRowIndex];
            const possibleValueIndex = mapping.location[1];

            if (possibleValueIndex < row.length) {
              const value = row[possibleValueIndex];

              /* After the value is found, add to the invoice object */
              (invoice as any)[key] = mapping.parseValue
                ? mapping.parseValue(
                    value,
                    possibleValueIndex,
                    possibleValueRowIndex,
                    contentRows
                  )
                : value;
            }
          }
        }
      }
    }

    if (
      Object.keys(invoice).length !== mappingEntries.length ||
      invoice.expenses.length === 0
    ) {
      throw new ServerError(
        "InvalidInvoiceError",
        "This invoice could not be parsed",
        422
      );
    }

    return invoice;
  }
}
