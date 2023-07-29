import { RenderResult, render } from "@testing-library/react";
import InvoicesList from ".";
import { faker } from "@faker-js/faker";
import { Invoice } from "../../../../interfaces";
import { mockInvoice } from "../../../../../tests/mocks";

type SutType = {
  invoices: Invoice[];
  sut: RenderResult;
};

/* eslint-disable */
const createSut = (empty?: boolean): SutType => {
  const invoices = empty ? [] : Array.from({
    length: faker.number.int({ min: 1, max: 5 }),
  }).map(() => mockInvoice());

  const sut = render(<InvoicesList invoices={invoices} />);

  return {
    sut,
    invoices,
  };
};

describe("InvoiceList", () => {
  test("Should render a list of invoices", () => {
    const { sut, invoices } = createSut();

    const listElement = sut.getByTestId("invoice-list");
    expect(listElement).toBeInTheDocument();

    const emptyElement = sut.queryByTestId("invoice-list-empty");
    expect(emptyElement).not.toBeInTheDocument();

    expect(listElement.childElementCount).toEqual(invoices.length);
  });
  test("Should render empty list message if invoices is empty", () => {
    const { sut } = createSut(true);

    const listElement = sut.queryByTestId("invoice-list");
    expect(listElement).not.toBeInTheDocument();

    const emptyElement = sut.getByTestId("invoice-list-empty");
    expect(emptyElement).toBeInTheDocument();
  });
});
