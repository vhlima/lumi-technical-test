import { ClientAddress } from "@/domain/entities";
import {
  CreateClientAddress,
  CreateClientAddressData,
} from "@/domain/usecases";
import { IClientsAddressesRepository } from "@/data/contracts";
import { firstLetterUppercase } from "@/utils/string-utils";

export class CreateClientAddressService implements CreateClientAddress {
  constructor(
    private readonly addressesRepository: IClientsAddressesRepository
  ) {}

  public async execute(data: CreateClientAddressData): Promise<ClientAddress> {
    const addressExists = await this.addressesRepository.findByStreetAddress(
      data.streetAddress
    );

    if (addressExists) {
      return addressExists;
    }

    const address = await this.addressesRepository.create({
      ...data,
      district: data.district
        .split(" ")
        .map((district) => firstLetterUppercase(district))
        .join(" "),
      streetAddress: data.streetAddress
        .split(" ")
        .map((address) => firstLetterUppercase(address))
        .join(" "),
      city: firstLetterUppercase(data.city),
    });

    return address;
  }
}
