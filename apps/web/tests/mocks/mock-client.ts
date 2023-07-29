import { faker } from "@faker-js/faker";

import { Client, ClientAddress } from "../../src/interfaces";

export const mockClient = (): Client => {
  return {
    id: faker.number.int(),
    fullName: faker.person.fullName(),
    addresses: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(
      () => mockClientAddress()
    ),
  };
};

export const mockClientAddress = (): ClientAddress => {
  return {
    id: faker.number.int(),
    city: faker.location.city(),
    district: faker.location.county(),
    state: faker.location.state(),
    streetAddress: faker.location.streetAddress(),
    zipCode: faker.location.zipCode(),
  };
};
