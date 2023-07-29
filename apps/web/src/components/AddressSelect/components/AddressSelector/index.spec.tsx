import { RenderResult, render } from "@testing-library/react";
import AddressSelect from ".";
import { ClientAddress } from "../../../../interfaces";
import { mockClientAddress } from "../../../../../tests/mocks";
import { faker } from "@faker-js/faker";
import { AddressProvider } from "../../../../hooks/useAddress";

type SutType = {
  addresses: ClientAddress[];
  sut: RenderResult;
};

/* eslint-disable */
const createSut = (): SutType => {
  const addresses = Array.from({
    length: faker.number.int({ min: 1, max: 5 }),
  }).map(() => mockClientAddress());

  const sut = render(
    <AddressProvider address={addresses[0]}>
      <AddressSelect open addresses={addresses} onClose={() => ({})} />
    </AddressProvider>
  );

  return {
    sut,
    addresses,
  };
};

describe("AddressSelector", () => {
  test("Should render a list of AddressItem", () => {
    const { sut, addresses } = createSut();

    const listElement = sut.getByTestId("address-selector-list");
    expect(listElement).toBeInTheDocument();
    expect(listElement.childElementCount).toEqual(addresses.length);
  });
});
