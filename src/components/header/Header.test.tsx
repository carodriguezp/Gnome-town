import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("header", () => {
  it("renders aplication title", () => {
    render(<Header />);

    const titleText = screen.getByText("Brastlewark");
    expect(titleText).toBeInTheDocument();
  });
});
