import { CreateInvoiceService } from "@/data/services";
import { Invoice } from "@/domain/entities";
import { MockInvoicesRepository } from "@/tests/data/mocks";
import { mockInvoice } from "@/tests/domain/mocks";

const createSut = (invoices?: Invoice[]) => {
  const sut = new CreateInvoiceService(new MockInvoicesRepository(invoices));
  return sut;
};

describe('CreateInvoiceService', () => {
  test('Should throw error if Invoice date already exists', async () => {
    const invoice = mockInvoice();

    const sut = createSut([invoice]);

    const conflictingInvoice = mockInvoice();
    conflictingInvoice.clientId = invoice.clientId;
    conflictingInvoice.relativeTo = invoice.relativeTo;

    const response = sut.execute(conflictingInvoice);
  
    expect(response).rejects.toThrow();
  });
});
