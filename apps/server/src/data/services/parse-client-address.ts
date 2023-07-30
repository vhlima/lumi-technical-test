import { LabelMapper, LabelMappersObject } from "@/domain/usecases";
import { allFirstLettersToUppercase, firstLetterUppercase } from "@/utils/string-utils";
import { ClientAddressValidator } from "@/validation/validators";
import { ClientAddressModel } from "@/data/models";
import { ParseClientAddress } from "@/data/contracts";

const labelMapping: LabelMappersObject<ClientAddressModel> = {
  id: {
    label: "Código de Débito Automático",
    location: [1, 3],
    parseValue: (value: string) => {
      return parseInt(value, 10);
    },
  },
  streetAddress: {
    label: "Código de Débito Automático",
    location: [4, 1],
    parseValue: (value: string) => {
      return allFirstLettersToUppercase(value);
    },
  },
  district: {
    label: "Código de Débito Automático",
    location: [5, 0],
    parseValue: (value: string) => {
      return allFirstLettersToUppercase(value);
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
      const words = value.split(" ");
      return words[words.length - 1];
    },
  },
  city: {
    label: "Código de Débito Automático",
    location: [6, 0],
    parseValue: (value: string) => {
      const words = value.split(" ");
      return allFirstLettersToUppercase(
        words
          .slice(1, words.length - 1)
          .join(" ")
          .replace(",", "")
      );
    },
  },
};

export class ParseClientAddressService implements ParseClientAddress {
  constructor(
    private readonly clientAddressValidation: ClientAddressValidator,
    private readonly labelMapper: LabelMapper
  ) {}

  public execute(contentRows: string[][]): ClientAddressModel | null {
    const clientAddressData = this.labelMapper.execute(
      contentRows,
      labelMapping
    );

    const validatedClientAddress =
      this.clientAddressValidation.execute(clientAddressData);

    return validatedClientAddress;
  }
}
