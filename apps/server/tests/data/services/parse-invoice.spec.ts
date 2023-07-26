import { ParseInvoiceService } from "@/data/services";
import { mockInvoice, mockPdfTextContent } from "@/tests/domain/mocks";
import { faker } from "@faker-js/faker";

const createSut = () => {
  const sut = new ParseInvoiceService();
  return sut;
};

describe("CreateInvoiceFromPDFService", () => {
  test("Should parse Invoice informations correctly", async () => {
    const sut = createSut();

    const mockedInvoice = mockInvoice([]);

    const pdfTextContent = mockPdfTextContent(mockedInvoice);

    const createdInvoice = sut.execute(pdfTextContent);

    const { id, ...invoiceCompare } = mockedInvoice;

    expect(createdInvoice).toEqual(invoiceCompare);
  });
});
