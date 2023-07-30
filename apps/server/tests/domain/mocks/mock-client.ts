import { Client, ClientAddress } from "@/domain/entities";
import { faker } from "@faker-js/faker";

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
    city: faker.location.city(),
    district: faker.location.country(),
    id: faker.number.int(),
    state: faker.location.state(),
    streetAddress: faker.location.streetAddress(),
    zipCode: faker.location.zipCode(),
  };
};
