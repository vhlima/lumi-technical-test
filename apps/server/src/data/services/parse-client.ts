import { LabelMapper, LabelMappersObject } from "@/domain/usecases";
import { firstLetterUppercase } from "@/utils/string-utils";
import { ClientValidator } from "@/validation/validators";
import { ClientModel } from "@/data/models";
import { ParseClient } from "@/data/contracts";

const labelMapping: LabelMappersObject<ClientModel> = {
  id: {
    label: "Nº DO CLIENTE",
    location: [1, 1],
    parseValue: (value: string) => parseInt(value, 10),
  },
  fullName: {
    label: "Código de Débito Automático",
    location: [3, 3],
    parseValue: (value: string) => {
      return value
        .split(" ")
        .map((name) => firstLetterUppercase(name))
        .join(" ");
    },
  },
};

export class ParseClientService implements ParseClient {
  constructor(
    private readonly clientValidation: ClientValidator,
    private readonly labelMapper: LabelMapper
  ) {}

  public execute(contentRows: string[][]): ClientModel | null {
    const clientData = this.labelMapper.execute(contentRows, labelMapping);

    const validatedClient = this.clientValidation.execute(clientData);
    return validatedClient;
  }
}
