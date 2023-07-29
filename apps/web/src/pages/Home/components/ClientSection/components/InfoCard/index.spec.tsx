import { RenderResult, render } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import InfoCard from ".";
import { Circle } from "@mui/icons-material";

type SutType = {
  title: string;
  value: string;
  sut: RenderResult;
};

/* eslint-disable */
const createSut = (description?: string): SutType => {
  const title = faker.lorem.lines(1);
  const value = faker.word.adjective();

  const sut = render(
    <InfoCard
      icon={Circle}
      title={title}
      value={value}
      description={description}
    />
  );

  return {
    sut,
    title,
    value,
  };
};

describe("InfoCard", () => {
  test("Should render details correctly", () => {
    const { sut, title, value } = createSut();

    const titleElement = sut.getByTestId("info-card-title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toEqual(title);

    const valueElement = sut.getByTestId("info-card-value");
    expect(valueElement).toBeInTheDocument();
    expect(valueElement.textContent).toEqual(value);

    const descriptionElement = sut.queryByTestId("info-card-description");
    expect(descriptionElement).not.toBeInTheDocument();
  });
  test("Should render description if provided", () => {
    const { sut } = createSut(faker.lorem.lines(1));

    const descriptionElement = sut.getByTestId("info-card-description");
    expect(descriptionElement).toBeInTheDocument();
  });
});
