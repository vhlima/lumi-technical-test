import { RenderResult, render } from "@testing-library/react";
import AddressSelect from ".";
import { ClientAddress } from "../../../../interfaces";
import { mockClientAddress } from "../../../../../tests/mocks";

type SutType = {
  address: ClientAddress;
  sut: RenderResult;
};

/* eslint-disable */
const createSut = (active?: boolean): SutType => {
  const address = mockClientAddress();

  const sut = render(
    <AddressSelect
      streetAddress={address.streetAddress}
      active={active}
      onClick={() => ({})}
    />
  );

  return {
    sut,
    address,
  };
};

describe("AddressItem", () => {
  test("Should render streetAddress correctly", () => {
    const { sut, address } = createSut();

    const titleElement = sut.getByTestId("street-address");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toEqual(address.streetAddress);
  });
  test("Should render active AddressItem", () => {
    const { sut } = createSut(true);

    const titleElement = sut.getByTestId("address-item-active");
    expect(titleElement).toBeInTheDocument();
  });
});
