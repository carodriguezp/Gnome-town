import { MemoryRouter } from "react-router-dom";
import { mockdGnomeList } from "../mocks";
import { render, screen } from "@testing-library/react";
import GnomeList from "./GnomeList";

describe("GnomeList", () => {
  const gnomeListProps = {
    gnomes: mockdGnomeList,
  };

  it("renders list of gnomes and its elements", async () => {
    render(
      <MemoryRouter>
        <GnomeList {...gnomeListProps} />
      </MemoryRouter>
    );

    const list = screen.getByTestId("list-of-gnomes");
    const gnomeOneCard = screen.getByTestId(mockdGnomeList[0].name);

    expect(list).toBeInTheDocument();
    expect(gnomeOneCard).toBeInTheDocument();
  });
});
