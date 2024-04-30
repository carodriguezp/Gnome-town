//TEST DE INTEGRACION

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputText from "./inputText/InputText";
import Dropdown from "./dropDown/Dropdown";
import Form from "./Form";

describe("Form", () => {
  const formProps = {
    filterName: "",
    handleFilterName: jest.fn(),
    hasFiltered: true,
    handleFilterJob: jest.fn(),
    handleSortAge: jest.fn(),
  };

  const inputTextProps = {
    value: "",
    handleChange: jest.fn(), //jest es un objeto propio de Jest que sirve para invocar funciones
    placeholder: "placeholder",
    hasFiltered: true,
  };

  const dropdownProps = {
    labelText: "mock label",
    optionsList: ["option-1", "option-2"],
    handleChange: jest.fn(),
  };

  it("renders all components", async () => {
    render(<Form {...formProps} />);

    const inputText = screen.getByTestId("input");
    const dropdown = screen.getAllByTestId("input-select");

    expect(inputText).toBeInTheDocument();
    expect(dropdown[0]).toBeInTheDocument();
    expect(dropdown[1]).toBeInTheDocument();
  });

  describe("when user writes in input text", () => {
    it("calls fuction to handle value change", async () => {
      render(<InputText {...inputTextProps} />);

      const input = screen.getByTestId("input");
      await userEvent.type(input, "jaja");

      expect(inputTextProps.handleChange).toHaveBeenCalled();
    });
  });

  describe("when user clicks an option from input select", () => {
    beforeEach(() => {
      jest.mock("./dropDown/helper", () => ({
        getJobList: jest.fn().mockResolvedValue(["option-1", "option-2"]),
      }));
    });

    it("shows array of options and calls function to handle value change", () => {
      render(<Dropdown {...dropdownProps} />);
      // eslint-disable-next-line testing-library/no-debugging-utils
      // screen.debug();
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
