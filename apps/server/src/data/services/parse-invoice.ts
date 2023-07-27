import { Invoice } from "@/domain/entities";
import {
  LabelMapper,
  LabelMappersObject,
  ParseInvoice,
} from "@/domain/usecases";
import { parseBrazilianDate, parseMonthByName } from "@/utils/date-utils";
import { InvoiceValidator } from "@/validation/validators";

const labelMapping: LabelMappersObject = {
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
};

export class ParseInvoiceService implements ParseInvoice {
  constructor(
    private readonly invoiceValidation: InvoiceValidator,
    private readonly labelMapper: LabelMapper
  ) {}

  public execute(contentRows: string[][]): Invoice | null {
    const invoiceData = this.labelMapper.execute(contentRows, labelMapping);

    const validatedInvoice = this.invoiceValidation.execute(invoiceData);
    return validatedInvoice;
  }
}
