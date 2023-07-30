import { ListInvoicesService } from "@/data/services";
import { mockInvoice } from "@/tests/domain/mocks";
import { MockInvoicesRepository } from "@/tests/data/mocks";
import { faker } from "@faker-js/faker";
import { Invoice } from "@/domain/entities";

type SutType = {
  invoices: Invoice[];
  sut: ListInvoicesService;
};

const createSut = (): SutType => {
  const invoices = Array.from({
    length: faker.number.int({ min: 1, max: 5 }),
  }).map(() => mockInvoice());

  const sut = new ListInvoicesService(new MockInvoicesRepository(invoices));
  return {
    sut,
    invoices,
  };
};

describe("ListInvoicesService", () => {
  test("Should list Invoices correctly", async () => {
    const { sut, invoices } = createSut();

    const addressId = invoices[0].address.id;

    const invoicesResponse = await sut.execute(addressId);
    expect(Array.isArray(invoicesResponse)).toBe(true);
    expect(invoicesResponse.length).toEqual(1);
    expect(invoicesResponse[0]).toEqual(invoices[0]);
  });
});
