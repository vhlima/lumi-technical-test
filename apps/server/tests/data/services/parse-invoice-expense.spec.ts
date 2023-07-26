import { ParseExpensesService } from "@/data/services";
import {
  mockInvoice,
  mockInvoiceExpense,
  mockPdfTextContent,
} from "@/tests/domain/mocks";
import { InvoiceExpenseValidator } from "@/validation/validators";
import { faker } from "@faker-js/faker";

const createSut = () => {
  const sut = new ParseExpensesService(new InvoiceExpenseValidator());
  return sut;
};

describe("ParseInvoiceExpensesService", () => {
  test("Should parse Invoice Expenses correctly", async () => {
    const sut = createSut();

    const mockedExpenses = Array.from({
      length: faker.number.int({ min: 1, max: 5 }),
    }).map(() => mockInvoiceExpense());

    const pdfTextContent = mockPdfTextContent(mockInvoice(mockedExpenses));

    const createdExpenses = sut.execute(pdfTextContent);

    expect(createdExpenses).toEqual(
      mockedExpenses.map(({ id, ...expense }) => expense)
    );
  });
  test("Should throw error if validation fails", () => {
    const sut = createSut();

    const mockedInvoice = mockInvoice([]);

    const pdfTextContent = mockPdfTextContent(mockedInvoice);

    expect(() => {
      sut.execute(pdfTextContent);
    }).toThrow();
  });
});
