import { RenderResult, render } from "@testing-library/react";
import Selector from ".";
import { faker } from "@faker-js/faker";

type SutType = {
  title: string;
  emptyText: string;
  sut: RenderResult;
};

/* eslint-disable */
const createSut = (childCount = 0): SutType => {
  const title = faker.lorem.lines(1);
  const emptyText = faker.lorem.lines(1);

  const sut = render(
    <Selector
      open
      title={title}
      emptyText={childCount === 0 ? emptyText : undefined}
      onClose={() => ({})}
    >
      {childCount > 0 && <span>{childCount}</span>}
    </Selector>
  );

  return {
    sut,
    title,
    emptyText,
  };
};

describe("Selector", () => {
  test("Should render title correctly", () => {
    const { sut, title } = createSut();

    const titleElement = sut.getByTestId("selector-title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toEqual(title);
  });
  test("Should render empty text if list is empty", () => {
    const { sut, emptyText } = createSut();

    const emptyElement = sut.getByTestId("selector-empty");
    expect(emptyElement).toBeInTheDocument();
    expect(emptyElement.textContent).toEqual(emptyText);

    const listElement = sut.queryByTestId("selector-list");
    expect(listElement).not.toBeInTheDocument();
  });
});
