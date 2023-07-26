import { Invoice } from "@/domain/entities";
import { faker } from "@faker-js/faker";

export const mockInvoice = (): Invoice => {
  const expiresAt = faker.date.future();
  expiresAt.setHours(0);
  expiresAt.setMinutes(0);
  expiresAt.setSeconds(0);
  expiresAt.setMilliseconds(0);

  const relativeTo = faker.date.recent();
  relativeTo.setDate(1);
  relativeTo.setHours(0);
  relativeTo.setMinutes(0);
  relativeTo.setSeconds(0);
  relativeTo.setMilliseconds(0);

  const invoice: Invoice = {
    clientId: faker.number.int(),
    expenses: [],
    price: 0,
    expiresAt,
    installationNumber: faker.number.int(),
    id: faker.number.int(),
    relativeTo,
  };

  return invoice;
};
