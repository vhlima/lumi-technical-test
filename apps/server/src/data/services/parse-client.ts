import { Client } from "@/domain/entities";
import {
  LabelMapper,
  LabelMappersObject,
  ParseClient,
} from "@/domain/usecases";
import { firstLetterUppercase } from "@/utils/string-utils";
import { ClientValidator } from "@/validation/validators";

const labelMapping: LabelMappersObject = {
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

  public execute(contentRows: string[][]): Client | null {
    const clientData = this.labelMapper.execute(contentRows, labelMapping);

    const validatedClient = this.clientValidation.execute(clientData);
    return validatedClient;
  }
}
