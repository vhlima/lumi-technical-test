import { LabelMapperService, ParseExpensesService } from "@/data/services";
import { mockInvoice, mockPdfTextContent } from "@/tests/domain/mocks";
import { InvoiceExpenseValidator } from "@/validation/validators";

const createSut = () => {
  const sut = new ParseExpensesService(
    new InvoiceExpenseValidator(),
    new LabelMapperService()
  );
  return sut;
};

describe("ParseInvoiceExpensesService", () => {
  test("Should parse Invoice Expenses correctly", async () => {
    const sut = createSut();

    const mockedInvoice = mockInvoice();

    const pdfTextContent = mockPdfTextContent(mockedInvoice);

    const createdExpenses = sut.execute(pdfTextContent);

    expect(createdExpenses).toEqual(
      mockedInvoice.expenses.map(({ id, ...expense }) => expense)
    );
  });
  test("Should throw error if validation fails", () => {
    const sut = createSut();

    const mockedInvoice = mockInvoice();
    mockedInvoice.expenses = [];

    const pdfTextContent = mockPdfTextContent(mockedInvoice);

    expect(() => {
      sut.execute(pdfTextContent);
    }).toThrow();
  });
});
