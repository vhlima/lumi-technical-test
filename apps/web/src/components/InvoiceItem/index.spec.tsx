import { RenderResult, fireEvent, render } from "@testing-library/react";
import { Invoice } from "../../interfaces";
import { mockInvoice } from "../../../tests/mocks";
import InvoiceItem from ".";

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
});
