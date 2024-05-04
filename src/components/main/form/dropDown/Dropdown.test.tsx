import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "./Dropdown";

describe("Dropdown", () => {
  describe("when user clicks input select", () => {
    const dropdownProps = {
      labelText: "mock label",
      optionsList: ["option-1", "option-2"],
      handleChange: jest.fn(),
      ["data-testid"]: "input-select",
    };

    it("shows options available from props", async () => {
      render(<Dropdown {...dropdownProps} />);
      const dropdown = screen.getByTestId("input-select");

      await userEvent.click(dropdown);

      expect(
        screen.getByText(dropdownProps.optionsList[0])
      ).toBeInTheDocument();
      expect(
        screen.getByText(dropdownProps.optionsList[1])
      ).toBeInTheDocument();
    });

    describe("when user clicks an option from input select", () => {
      it("calls function to handle value change", () => {
        render(<Dropdown {...dropdownProps} />);
        const dropdown = screen.getByTestId("input-select");

        userEvent.click(dropdown); //userEvent se usa para eventos controlados que se activan por acción directa del usuario
        fireEvent.change(dropdown, {
          //fireEvent se usa para eventos no controlados, ya que el option no tiene un onChange, sin embargo el click dispara que se llame a una función
          target: { value: dropdownProps.optionsList[0] },
        });

        expect(dropdownProps.handleChange).toHaveBeenCalled();
      });
    });
  });
});
