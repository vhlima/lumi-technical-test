import { ValidateInvoiceExpense } from "@/validation/contracts";
import { ServerError } from "@/errors";
import { Joi } from "celebrate";
import { InvoiceExpenseModel } from "@/data/models";

export class InvoiceExpenseValidator implements ValidateInvoiceExpense {
  private validationSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    measurementUnit: Joi.string(),
    quantity: Joi.number().integer().min(0),
    unitaryPrice: Joi.number(),
    unitaryTaxPrice: Joi.number(),
  });

  public execute(data: Record<string, unknown>): InvoiceExpenseModel | null {
    const validated = this.validationSchema.validate(data);

    if (validated.error) {
      throw new ServerError(
        "ValidationError",
        `Invalid Invoice Expense: ${validated.error.message}`,
        400
      );
    }

    return validated.value as InvoiceExpenseModel;
  }
}
