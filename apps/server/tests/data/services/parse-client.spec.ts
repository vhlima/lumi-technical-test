import { ClientModel } from "@/data/models";
import { LabelMapperService, ParseClientService } from "@/data/services";
import { mockInvoice, mockPdfTextContent } from "@/tests/domain/mocks";
import { allFirstLettersToUppercase } from "@/utils/string-utils";
import { ClientValidator } from "@/validation/validators";

const createSut = () => {
  const sut = new ParseClientService(
    new ClientValidator(),
    new LabelMapperService()
  );
  return sut;
};

describe("ParseClientService", () => {
  test("Should parse Client correctly", async () => {
    const sut = createSut();

    const mockedInvoice = mockInvoice();

    const pdfTextContent = mockPdfTextContent(mockedInvoice);

    const createdClient = sut.execute(pdfTextContent);

    const clientModel: ClientModel = {
      id: mockedInvoice.client.id,
      fullName: allFirstLettersToUppercase(mockedInvoice.client.fullName),
    };

    expect(createdClient).toEqual(clientModel);
  });
  test("Should throw error if validation fails", () => {
    const sut = createSut();

    const mockedInvoice = mockInvoice();

    const pdfTextContent = mockPdfTextContent({
      ...mockedInvoice,
      client: undefined,
    });

    expect(() => {
      sut.execute(pdfTextContent);
    }).toThrow();
  });
});
