import { Client, ClientAddress } from "@/domain/entities";
import { allFirstLettersToUppercase } from "@/utils/string-utils";
import { faker } from "@faker-js/faker";

export const mockClient = (): Client => {
  return {
    id: faker.number.int(),
    fullName: allFirstLettersToUppercase(faker.person.fullName()),
    addresses: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(
      () => mockClientAddress()
    ),
  };
};

export const mockClientAddress = (): ClientAddress => {
  return {
    city: allFirstLettersToUppercase(faker.location.city()),
    district: allFirstLettersToUppercase(faker.location.country()),
    id: faker.number.int(),
    state: faker.location.state({ abbreviated: true }),
    streetAddress: allFirstLettersToUppercase(faker.location.streetAddress()),
    zipCode: faker.location.zipCode(),
  };
};
