import { ValidateInvoice } from "@/validation/contracts";
import { ServerError } from "@/errors";
import { Joi } from "celebrate";
import { InvoiceModel } from "@/data/models";

export class InvoiceValidator implements ValidateInvoice {
  private validationSchema = Joi.object({
    price: Joi.number().required(),
    relativeYear: Joi.number().required(),
    relativeMonth: Joi.number().required(),
    expiresAt: Joi.date().required(),
  });

  public execute(data: Record<string, unknown>): InvoiceModel | null {
    const validated = this.validationSchema.validate(data);

    if (validated.error) {
      throw new ServerError(
        "ValidationError",
        `Invalid Invoice: ${validated.error.message}`,
        400
      );
    }

    return validated.value as InvoiceModel;
  }
}
