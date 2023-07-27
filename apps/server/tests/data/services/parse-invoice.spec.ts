import { LabelMapperService, ParseInvoiceService } from "@/data/services";
import { mockInvoice, mockPdfTextContent } from "@/tests/domain/mocks";
import { InvoiceValidator } from "@/validation/validators";
import { faker } from "@faker-js/faker";

const createSut = () => {
  const sut = new ParseInvoiceService(
    new InvoiceValidator(),
    new LabelMapperService()
  );
  return sut;
};

describe("ParseInvoiceService", () => {
  test("Should parse Invoice informations correctly", async () => {
    const sut = createSut();

    const mockedInvoice = mockInvoice([]);

    const pdfTextContent = mockPdfTextContent(mockedInvoice);

    const createdInvoice = sut.execute(pdfTextContent);

    const { id, price, expenses, client, energySpent, ...invoiceCompare } =
      mockedInvoice;

    expect(createdInvoice).toEqual(invoiceCompare);
  });
  test("Should throw error if validation fails", () => {
    const sut = createSut();

    const { expenses, price, id, ...invoiceData } = mockInvoice([]);

    /* Select random fields from mockedInvoice */
    const shuffled = Object.entries(invoiceData).sort(
      () => 0.5 - Math.random()
    );

    const selectedEntries = shuffled.slice(
      0,
      faker.number.int({ min: 0, max: shuffled.length - 2 })
    );

    /* We are passing some valid fields and other invalids to always make 
       sure we are not validating the same thing 
    */
    const pdfTextContent = mockPdfTextContent(
      Object.fromEntries(selectedEntries)
    );

    expect(() => {
      sut.execute(pdfTextContent);
    }).toThrow();
  });
});
