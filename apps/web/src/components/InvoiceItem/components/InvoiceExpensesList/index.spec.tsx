import { RenderResult, render } from "@testing-library/react";
import InvoiceExpensesList from ".";
import { InvoiceExpense } from "../../../../interfaces";
import { mockInvoiceExpense } from "../../../../../tests/mocks";
import { faker } from "@faker-js/faker";

type SutType = {
  expenses: InvoiceExpense[];
  sut: RenderResult;
};

/* eslint-disable */
const createSut = (): SutType => {
  const expenses = Array.from({
    length: faker.number.int({ min: 1, max: 5 }),
  }).map(() => mockInvoiceExpense());

  const sut = render(<InvoiceExpensesList expenses={expenses} />);

  return {
    sut,
    expenses,
  };
};

describe("InvoiceExpensesList", () => {
  test("Should render a list of InvoiceExpenseItem", () => {
    const { sut, expenses } = createSut();

    const listElement = sut.getByTestId("invoice-expenses-list");
    expect(listElement).toBeInTheDocument();
    expect(listElement.childElementCount).toEqual(expenses.length);
  });
});
