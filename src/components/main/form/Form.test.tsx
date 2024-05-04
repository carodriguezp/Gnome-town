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
    setJobs: jest.fn(),
    sortedJobsArray: [],
  };

  const dropdownProps = {
    labelText: "mock label",
    optionsList: ["option-1", "option-2"],
    handleChange: jest.fn(),
  };

  it("renders all components", async () => {
    render(<Form {...formProps} />);

    const inputText = screen.getByTestId("input");
    // const dropdown = screen.getAllByTestId("input-select");
    const dropdownJob = screen.getByTestId("filter-jobs");
    const dropdownAge = screen.getByTestId("sort-age");

    expect(inputText).toBeInTheDocument();
    expect(dropdownJob).toBeInTheDocument();
    expect(dropdownAge).toBeInTheDocument();
  });

  describe("when user writes in input text", () => {
    it("calls fuction to handle value change", async () => {
      render(<Form {...formProps} />);

      const input = screen.getByTestId("input");
      await userEvent.type(input, "jaja");

      expect(formProps.handleFilterName).toHaveBeenCalled();
    });
  });

  describe("when user clicks an option from jobs dropdown", () => {
    it("shows array of options and calls function to handle value change", async () => {
      render(<Form {...formProps} />);

      const dropdown = screen.getByTestId("filter-jobs");

      userEvent.click(dropdown); //userEvent se usa para eventos controlados que se activan por acción directa del usuario
      fireEvent.change(dropdown, {
        //fireEvent se usa para eventos no controlados, ya que el option no tiene un onChange, sin embargo el click dispara que se llame a una función
        target: { value: dropdownProps.optionsList[0] },
      });

      expect(formProps.handleFilterJob).toHaveBeenCalled();
    });
  });

  describe("when user clicks an option from sort dropdown", () => {
    it("shows array of options and calls function to handle value change", () => {
      render(<Form {...formProps} />);

      const dropdown = screen.getByTestId("sort-age");

      userEvent.click(dropdown); //userEvent se usa para eventos controlados que se activan por acción directa del usuario
      fireEvent.change(dropdown, {
        //fireEvent se usa para eventos no controlados, ya que el option no tiene un onChange, sin embargo el click dispara que se llame a una función
        target: { value: dropdownProps.optionsList[0] },
      });

      expect(formProps.handleSortAge).toHaveBeenCalled();
    });
  });
});
