import { ClientAddressModel } from "@/data/models";
import { LabelMapperService, ParseClientAddressService } from "@/data/services";
import { mockInvoice, mockPdfTextContent } from "@/tests/domain/mocks";
import { allFirstLettersToUppercase } from "@/utils/string-utils";
import { ClientAddressValidator } from "@/validation/validators";

const createSut = () => {
  const sut = new ParseClientAddressService(
    new ClientAddressValidator(),
    new LabelMapperService()
  );
  return sut;
};

describe("ParseClientAddressService", () => {
  test("Should parse ClientAddress correctly", async () => {
    const sut = createSut();

    const mockedInvoice = mockInvoice();

    const pdfTextContent = mockPdfTextContent(mockedInvoice);

    const createAddress = sut.execute(pdfTextContent);

    const addressModel: ClientAddressModel = {
      id: mockedInvoice.address.id,
      city: allFirstLettersToUppercase(mockedInvoice.address.city),
      district: allFirstLettersToUppercase(mockedInvoice.address.district),
      state: mockedInvoice.address.state,
      streetAddress: allFirstLettersToUppercase(
        mockedInvoice.address.streetAddress
      ),
      zipCode: mockedInvoice.address.zipCode,
    };

    expect(createAddress).toEqual(addressModel);
  });
  test("Should throw error if validation fails", () => {
    const sut = createSut();

    const mockedInvoice = mockInvoice();

    const pdfTextContent = mockPdfTextContent({
      ...mockedInvoice,
      address: undefined,
    });

    expect(() => {
      sut.execute(pdfTextContent);
    }).toThrow();
  });
});
