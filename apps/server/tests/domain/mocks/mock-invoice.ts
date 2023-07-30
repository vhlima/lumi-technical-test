import { Invoice, InvoiceExpense } from "@/domain/entities";
import { faker } from "@faker-js/faker";
import { mockClient } from "./mock-client";

export const mockInvoice = (): Invoice => {
  const expiresAt = faker.date.future();
  expiresAt.setHours(0);
  expiresAt.setMinutes(0);
  expiresAt.setSeconds(0);
  expiresAt.setMilliseconds(0);

  const relativeTo = faker.date.recent();

  const client = mockClient();

  const expenses = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(
    () => mockInvoiceExpense()
  );

  const invoice: Invoice = {
    client: client,
    address: client.addresses[0],
    energySpent: 0,
    expenses,
    price: expenses.reduce((acc, expense) => acc += expense.price, 0),
    expiresAt,
    id: faker.number.int(),
    relativeYear: relativeTo.getFullYear(),
    relativeMonth: relativeTo.getMonth(),
  };

  return invoice;
};

export const mockInvoiceExpense = (): InvoiceExpense => {
  const isSimple = faker.number.int({ min: 1, max: 10 }) % 2 === 0;

  const basicExpense: InvoiceExpense = {
    id: faker.number.int(),
    price: faker.number.int({ max: 50000 }),
    name: faker.science.chemicalElement().name,
  };

  if (isSimple) {
    return basicExpense;
  }

  return {
    ...basicExpense,
    measurementUnit: faker.science.chemicalElement().symbol,
    quantity: faker.number.int(),
    unitaryPrice: faker.number.float(),
    unitaryTaxPrice: faker.number.float(),
  };
};
