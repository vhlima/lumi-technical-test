import { RenderResult, fireEvent, render } from "@testing-library/react";
import { ClientAddress } from "../../interfaces";
import { AddressProvider } from "../../hooks/useAddress";
import AddressSelect from ".";

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
  test("Should show AddressSelector on button click", () => {
    const { sut, address } = createSut();

    const buttonElement = sut.getByTestId("address-select-button");
    expect(buttonElement).toBeInTheDocument();

    const addressSelectorId = "address-selector";
    
    const dialogElement = sut.queryByTestId(addressSelectorId);
    expect(dialogElement).not.toBeInTheDocument();

    fireEvent.click(buttonElement);
    
    expect(sut.queryByTestId(addressSelectorId)).toBeInTheDocument();
  });
});
