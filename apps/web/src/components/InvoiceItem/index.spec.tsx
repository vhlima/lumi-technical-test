import { RenderResult, fireEvent, render } from "@testing-library/react";
import { Invoice } from "../../interfaces";
import { mockInvoice } from "../../../tests/mocks";
import InvoiceItem from ".";
import { format } from "date-fns";
import { parseToBRL } from "../../utils/currency-parser";

type SutType = {
  invoice: Invoice;
  sut: RenderResult;
};

/* eslint-disable */
const createSut = (): SutType => {
  const invoice = mockInvoice();

  const sut = render(<InvoiceItem {...invoice} />);

  return {
    sut,
    invoice,
  };
};

describe("InvoiceItem", () => {
  test("Should open expenses collapse on button click", () => {
    const { sut } = createSut();

    const buttonElement = sut.getByTestId("invoice-item-button");
    expect(buttonElement).toBeInTheDocument();

    const collapseId = "invoice-item-collapse";

    expect(sut.queryByTestId(collapseId)).not.toBeInTheDocument();

    fireEvent.click(buttonElement);

    expect(sut.queryByTestId(collapseId)).toBeInTheDocument();
  });
  test("Should render invoice date correctly", () => {
    const { sut, invoice } = createSut();

    const titleElement = sut.getByTestId("invoice-item-title");
    expect(titleElement).toBeInTheDocument();

    const dateFormatted = format(
      new Date(invoice.relativeYear, invoice.relativeMonth),
      "MMMM/yyyy"
    );

    expect(titleElement.textContent).toEqual(dateFormatted);
  });
  test("Should render invoice description correctly", () => {
    const { sut, invoice } = createSut();

    const priceElement = sut.getByTestId("invoice-item-price");
    expect(priceElement).toBeInTheDocument();

    const priceFormatted = parseToBRL(invoice.price);

    expect(priceElement.textContent).toEqual(priceFormatted);

    const expirationElement = sut.getByTestId("invoice-item-expiration");
    expect(expirationElement).toBeInTheDocument();

    const expirationFormatted = format(
      new Date(invoice.expiresAt),
      "MMMM dd, yyyy"
    );

    expect(expirationElement.textContent).toEqual(expirationFormatted);
  });
});
