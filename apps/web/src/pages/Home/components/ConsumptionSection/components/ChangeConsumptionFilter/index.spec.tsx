import { RenderResult, fireEvent, render } from "@testing-library/react";
import ChangeConsumptionFilter from ".";
import { faker } from "@faker-js/faker";

type FilterType = {
  label: string;
};

type SutType = {
  filters: Record<string, FilterType>;
  sut: RenderResult;
};

/* eslint-disable */
const createSut = (): SutType => {
  const filters: Record<string, FilterType> = {};

  Array.from({
    length: faker.number.int({ min: 1, max: 3 }),
  }).forEach(() => {
    filters[faker.commerce.product()] = {
      label: faker.commerce.productName(),
    };
  });

  const sut = render(
    <ChangeConsumptionFilter filters={filters} onChange={() => ({})} />
  );

  return {
    sut,
    filters,
  };
};

describe("ChangeConsumptionFilter", () => {
  test("Should open filter dropdown on button click", () => {
    const { sut } = createSut();

    const buttonElement = sut.getByTestId("consumption-filter-button");
    expect(buttonElement).toBeInTheDocument();

    const dropdownId = "consumption-filter-dropdown";

    expect(sut.getByTestId(dropdownId)).toHaveAttribute('aria-hidden', 'true');

    fireEvent.click(buttonElement);

    expect(sut.getByTestId(dropdownId)).not.toHaveAttribute('aria-hidden');
  });
});
