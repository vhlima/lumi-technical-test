import {
  LabelMapper,
  LabelMappersObject,
} from "@/domain/usecases";
import { parseBrazilianDate, parseMonthByName } from "@/utils/date-utils";
import { InvoiceValidator } from "@/validation/validators";
import { ParseInvoice } from "@/data/contracts";
import { InvoiceModel } from "@/data/models";

const labelMapping: LabelMappersObject<InvoiceModel> = {
  price: {
    label: "Valor a pagar (R$)",
    location: [1, 5],
    parseValue: (value: string) => {
      return parseFloat(value.replace(",", "."));
    },
  },
  relativeMonth: {
    label: "Referente a",
    location: [1, 1],
    parseValue: (value: string) => {
      const [month] = value.split("/");

      const monthIndex = parseMonthByName(month);
      if (monthIndex === -1) {
        throw new Error("Error while parsing relative month from invoice");
      }

      return monthIndex;
    },
  },
  relativeYear: {
    label: "Referente a",
    location: [1, 1],
    parseValue: (value: string) => {
      const [, year] = value.split("/");

      if (isNaN(Number(year))) {
        throw new Error("Error while parsing relative year from invoice");
      }

      return parseInt(year, 10);
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

  public execute(contentRows: string[][]): InvoiceModel | null {
    const invoiceData = this.labelMapper.execute(contentRows, labelMapping);

    const validatedInvoice = this.invoiceValidation.execute(invoiceData);
    return validatedInvoice;
  }
}
