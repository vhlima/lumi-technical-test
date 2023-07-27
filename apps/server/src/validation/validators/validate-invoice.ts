import { Invoice } from "@/domain/entities";
import { ValidateInvoice } from "@/validation/contracts";
import { ServerError } from "@/errors";
import { Joi } from "celebrate";

export class InvoiceValidator implements ValidateInvoice {
  private validationSchema = Joi.object({
    installationNumber: Joi.number().required(),
    relativeTo: Joi.date().required(),
    expiresAt: Joi.date().required(),
  });

  public execute(data: Record<string, unknown>): Invoice | null {
    const validated = this.validationSchema.validate(data);

    if (validated.error) {
      throw new ServerError(
        "ValidationError",
        `Invalid Invoice: ${validated.error.message}`,
        400
      );
    }

    return validated.value as Invoice;
  }
}
