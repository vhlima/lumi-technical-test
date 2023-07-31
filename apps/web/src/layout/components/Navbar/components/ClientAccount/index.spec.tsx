import { RenderResult, fireEvent, render } from "@testing-library/react";
import ClientAccount from ".";

/* eslint-disable */
const createSut = (): RenderResult => {
  const sut = render(<ClientAccount />);
  return sut;
};

describe("ClientAccount", () => {
  test("Should open client account menu on button click", () => {
    const sut = createSut();

    const buttonElement = sut.getByTestId("client-account-button");
    expect(buttonElement).toBeInTheDocument();
    
    const menuId = "client-account-menu";
    expect(sut.getByTestId(menuId)).toHaveAttribute("aria-hidden", "true");

    fireEvent.click(buttonElement);

    expect(sut.getByTestId(menuId)).not.toHaveAttribute("aria-hidden");
  });
});
