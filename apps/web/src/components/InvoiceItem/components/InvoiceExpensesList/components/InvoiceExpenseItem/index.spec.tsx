import { RenderResult, render } from "@testing-library/react";
import InvoiceExpensesList from ".";
import { InvoiceExpense } from "../../../../../../interfaces";
import { mockInvoiceExpense } from "../../../../../../../tests/mocks";
import { parseToBRL } from "../../../../../../utils/currency-parser";

type SutType = {
  expense: InvoiceExpense;
  sut: RenderResult;
};

/* eslint-disable */
const createSut = (): SutType => {
  const expense = mockInvoiceExpense();

  const sut = render(<InvoiceExpensesList expense={expense} />);

  return {
    sut,
    expense,
  };
};

describe("InvoiceExpenseItem", () => {
  test("Should render Invoice Expense details correctly", () => {
    const { sut, expense } = createSut();

    const nameElement = sut.getByTestId("invoice-expense-name");
    expect(nameElement).toBeInTheDocument();
    expect(nameElement.textContent).toEqual(expense.name);

    const priceElement = sut.getByTestId("invoice-expense-price");
    expect(priceElement).toBeInTheDocument();

    const priceFormatted = parseToBRL(expense.price);

    expect(priceElement.textContent).toEqual(priceFormatted);

    const quantityElement = sut.getByTestId("invoice-expense-quantity");
    expect(quantityElement).toBeInTheDocument();
    expect(quantityElement.textContent).toEqual(String(expense.quantity));

    const unitaryPriceElement = sut.getByTestId(
      "invoice-expense-unitary-price"
    );
    expect(unitaryPriceElement).toBeInTheDocument();
    expect(unitaryPriceElement.textContent).toEqual(
      String(expense.unitaryPrice)
    );
  });
});
