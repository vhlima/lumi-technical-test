import { RenderResult, fireEvent, render } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { SectionTitle } from ".";

type SutType = {
  title: string;
  sut: RenderResult;
};

/* eslint-disable */
const createSut = (description?: string): SutType => {
  const title = faker.lorem.lines(1);

  const sut = render(<SectionTitle title={title} description={description} />);

  return {
    sut,
    title,
  };
};

describe("SectionTitle", () => {
  test("Should render title correctly", () => {
    const { sut, title } = createSut();

    const sectionElement = sut.getByTestId("section-title");
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement.textContent).toEqual(title);

    const descriptionElement = sut.queryByTestId("section-description");
    expect(descriptionElement).not.toBeInTheDocument();
  });
  test("Should render description correctly", () => {
    const description = faker.lorem.lines(1);

    const { sut } = createSut(description);

    const descriptionElement = sut.getByTestId("section-description");
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement.textContent).toEqual(description);
  });
});
