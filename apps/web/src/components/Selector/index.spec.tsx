import { RenderResult, render } from "@testing-library/react";
import Selector from ".";
import { faker } from "@faker-js/faker";

type SutType = {
  title: string;
  sut: RenderResult;
};

/* eslint-disable */
const createSut = (): SutType => {
  const title = faker.lorem.lines(1);

  const sut = render(<Selector open title={title} onClose={() => ({})} />);

  return {
    sut,
    title,
  };
};

describe("Selector", () => {
  test("Should render title correctly", () => {
    const { sut, title } = createSut();

    const titleElement = sut.getByTestId("selector-title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toEqual(title);
  });
});
