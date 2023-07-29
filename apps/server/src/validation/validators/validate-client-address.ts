import { ValidateClientAddress } from "@/validation/contracts";
import { ServerError } from "@/errors";
import { Joi } from "celebrate";
import { ClientAddressModel } from "@/data/models";

export class ClientAddressValidator implements ValidateClientAddress {
  private validationSchema = Joi.object({
    streetAddress: Joi.string().required(),
    district: Joi.string().required(),
    zipCode: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
  });

  public execute(data: Record<string, unknown>): ClientAddressModel | null {
    const validated = this.validationSchema.validate(data);

    if (validated.error) {
      throw new ServerError(
        "ValidationError",
        `Invalid Client Address: ${validated.error.message}`,
        400
      );
    }

    return validated.value as ClientAddressModel;
  }
}
