import { RenderResult, render } from "@testing-library/react";
import YearsTab from ".";
import { faker } from "@faker-js/faker";
import { Invoice } from "../../../../interfaces";
import { mockInvoice } from "../../../../../tests/mocks";

type SutType = {
  invoices: Invoice[];
  sut: RenderResult;
};

/* eslint-disable */
const createSut = (): SutType => {
  const invoices = Array.from({
    length: faker.number.int({ min: 1, max: 5 }),
  }).map(() => mockInvoice());

  const sut = render(<YearsTab invoices={invoices} onChange={() => ({})} />);

  return {
    sut,
    invoices,
  };
};

describe("YearsTab", () => {
  test("Should render the correct amount of years", () => {
    const { sut, invoices } = createSut();

    const years: number[] = [];

    for (let i = 0; i < invoices.length; i++) {
      const invoice = invoices[i];
      if (!years.includes(invoice.relativeYear)) {
        years.push(invoice.relativeYear);
      }
    }

    const tabsElement = sut.getAllByTestId("year-tab");
    expect(tabsElement.length).toEqual(years.length);
  });
});
