import { Client } from "@/domain/entities";
import { ValidateClient } from "@/validation/contracts";
import { ServerError } from "@/errors";
import { Joi } from "celebrate";

export class ClientValidator implements ValidateClient {
  private validationSchema = Joi.object({
    id: Joi.number().required(),
    fullName: Joi.string().required(),
  });

  public execute(data: Record<string, unknown>): Client | null {
    const validated = this.validationSchema.validate(data);

    if (validated.error) {
      throw new ServerError(
        "ValidationError",
        `Invalid Client: ${validated.error.message}`,
        400
      );
    }

    return validated.value as Client;
  }
}
