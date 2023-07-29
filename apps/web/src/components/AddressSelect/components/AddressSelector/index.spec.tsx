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
const createSut = (empty?: boolean): SutType => {
  const addresses = Array.from({
    length: faker.number.int({ min: 1, max: 5 }),
  }).map(() => mockClientAddress());

  const sut = render(
    <AddressProvider address={addresses[0]}>
      <AddressSelect open addresses={empty ? [] : addresses} onClose={() => ({})} />
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

    const emptyElement = sut.queryByTestId("address-selector-empty");
    expect(emptyElement).not.toBeInTheDocument();
  });
  test("Should render empty list message if address list is empty", () => {
    const { sut } = createSut(true);

    const listElement = sut.queryByTestId("address-selector-list");
    expect(listElement).not.toBeInTheDocument();

    const emptyElement = sut.getByTestId("address-selector-empty");
    expect(emptyElement).toBeInTheDocument();
  });
});
