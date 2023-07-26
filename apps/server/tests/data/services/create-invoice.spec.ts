import { CreateInvoiceService } from "@/data/services";
import { Invoice } from "@/domain/entities";
import { MockInvoicesRepository } from "@/tests/data/mocks";
import { mockInvoice } from "@/tests/domain/mocks";

const createSut = (invoices?: Invoice[]) => {
  const sut = new CreateInvoiceService(new MockInvoicesRepository(invoices));
  return sut;
};

describe('CreateInvoiceService', () => {
  test('Should throw error if Invoice date already exists', () => {
    const invoice = mockInvoice();

    const sut = createSut([invoice]);

    const conflictingInvoice = mockInvoice();
    conflictingInvoice.clientId = invoice.clientId;
    conflictingInvoice.relativeTo = invoice.relativeTo;

    const response = sut.execute(conflictingInvoice);
  
    expect(response).rejects.toThrow();
  });
  test('Should create Invoice with correct params', async () => {
    const sut = createSut();

    const invoice = mockInvoice();

    const response = await sut.execute(invoice);

    expect(response.clientId).toEqual(invoice.clientId);
    expect(response.installationNumber).toEqual(invoice.installationNumber);
    expect(response.relativeTo).toEqual(invoice.relativeTo);
    expect(response.expiresAt).toEqual(invoice.expiresAt);
  });
});
