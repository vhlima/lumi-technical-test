import { RenderResult, render } from "@testing-library/react";
import { ClientAddress } from "../../interfaces";
import { AddressProvider } from "../../hooks/useAddress";
import AddressSelect from ".";

jest.mock("axios");

type SutType = {
  address: ClientAddress;
  sut: RenderResult;
};

/* eslint-disable */
const createSut = (): SutType => {
  const address: ClientAddress = {
    city: "a",
    district: "b",
    id: 1,
    state: "c",
    streetAddress: "d",
    zipCode: "e",
  };

  const sut = render(
    <AddressProvider address={address}>
      <AddressSelect />
    </AddressProvider>
  );

  return {
    sut,
    address,
  };
};

describe("AddressSelect", () => {
  test("Should render streetAddress correctly", () => {
    const { sut, address } = createSut();

    const titleElement = sut.getByTestId("street-address");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toEqual(address.streetAddress);
  });
});
