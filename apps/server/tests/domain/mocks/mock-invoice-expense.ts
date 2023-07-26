import { Invoice, InvoiceExpense } from "@/domain/entities";
import { faker } from "@faker-js/faker";

export const mockInvoiceExpense = (invoice: Invoice): InvoiceExpense => {
  const isSimple = faker.number.int({ min: 1, max: 10 }) % 2 === 0;

  const basicExpense: InvoiceExpense = {
    id: faker.number.int(),
    price: faker.number.int(),
    name: faker.science.chemicalElement().name,
  };

  invoice.price += basicExpense.price;

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
