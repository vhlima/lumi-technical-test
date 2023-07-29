import { ClientAddress } from "@/domain/entities";
import {
  LabelMapper,
  LabelMappersObject,
  ParseClientAddress,
} from "@/domain/usecases";
import { firstLetterUppercase } from "@/utils/string-utils";
import { ClientAddressValidator } from "@/validation/validators";

const labelMapping: LabelMappersObject = {
  streetAddress: {
    label: "Código de Débito Automático",
    location: [4, 1],
    parseValue: (value: string) => {
      return value
        .split(" ")
        .map((address) => firstLetterUppercase(address))
        .join(" ");
    },
  },
  district: {
    label: "Código de Débito Automático",
    location: [5, 0],
    parseValue: (value: string) => {
      return value
        .split(" ")
        .map((dis) => firstLetterUppercase(dis))
        .join(" ");
    },
  },
  zipCode: {
    label: "Código de Débito Automático",
    location: [6, 0],
    parseValue: (value: string) => {
      return value.split(" ")[0];
    },
  },
  state: {
    label: "Código de Débito Automático",
    location: [6, 0],
    parseValue: (value: string) => {
      return value.split(" ")[2].replace(",", "");
    },
  },
  city: {
    label: "Código de Débito Automático",
    location: [6, 0],
    parseValue: (value: string) => {
      return firstLetterUppercase(value.split(" ")[1].replace(",", ""));
    },
  },
};

export class ParseClientAddressService implements ParseClientAddress {
  constructor(
    private readonly clientAddressValidation: ClientAddressValidator,
    private readonly labelMapper: LabelMapper
  ) {}

  public execute(contentRows: string[][]): ClientAddress | null {
    const clientAddressData = this.labelMapper.execute(
      contentRows,
      labelMapping
    );

    const validatedClientAddress =
      this.clientAddressValidation.execute(clientAddressData);
    return validatedClientAddress;
  }
}
