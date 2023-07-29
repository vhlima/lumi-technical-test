import { faker } from "@faker-js/faker";

import { Invoice, InvoiceExpense } from "../../src/interfaces";

import { mockClient, mockClientAddress } from "./index";

export const mockInvoice = (): Invoice => {
  return {
    id: faker.number.int(),
    price: faker.number.int(),
    relativeMonth: faker.number.int({ min: 0, max: 11 }),
    relativeYear: faker.number.int({ min: 2000, max: 2023 }),
    client: mockClient(),
    address: mockClientAddress(),
    energySpent: 0,
    expenses: [],
    expiresAt: faker.date.past().toISOString(),
  };
};

export const mockInvoiceExpense = (): InvoiceExpense => {
  return {
    id: faker.number.int(),
    invoice: mockInvoice(),
    name: faker.commerce.productName(),
    price: faker.number.int(),
    quantity: faker.number.int(),
    measurementUnit: faker.science.chemicalElement().symbol,
    unitaryPrice: faker.number.int(),
    unitaryTaxPrice: faker.number.int(),
  };
};
