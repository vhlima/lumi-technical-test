import { Invoice } from "@/domain/entities";
import { faker } from "@faker-js/faker";

export const mockInvoice = (): Invoice => ({
  clientId: faker.number.int(),
  expenses: [],
  price: 0,
  expiresAt: faker.date.future(),
  installationNumber: faker.number.int(),
  id: faker.number.int(),
  relativeTo: faker.date.recent(),
});
