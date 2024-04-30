import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputText from "./InputText";

describe("InputText", () => {
  // describe.only hace que solo se ejecute ese test
  //describe.skip hace que el test no se ejecute

  describe("when user writes in input", () => {
    const inputTextProps = {
      value: "",
      handleChange: jest.fn(), //jest es un objeto propio de Jest que sirve para invocar funciones
      placeholder: "placeholder",
      hasFiltered: true,
    };

    it("calls function to handle value change", async () => {
      render(<InputText {...inputTextProps} />);
      //USEREVENT devuelve una promesa, por eso hemos hecho async await

      //console.log() --> muestra el objeto del elemento que le pases equivalente del nodo HTML
      //screen.debug();  --> muestra el esqueleto resultante cuando se ejecuta el nodo HTMl

      const input = screen.getByTestId("input");
      await userEvent.type(input, "jaja"); //.type simula que el usuario teclea--necesita 2 argumentos(un elemento y un text)

      expect(inputTextProps.handleChange).toHaveBeenCalled();
      //   expect(inputTextProps.handleChange).not.toHaveBeenCalled();
    });
  });

  describe("when there is an error", () => {
    const inputTextProps = {
      value: "ñ",
      handleChange: jest.fn(), //jest es un objeto propio de Jest que sirve para invocar funciones
      placeholder: "placeholder",
      hasFiltered: false,
    };

    it("shows an error message", () => {
      render(<InputText {...inputTextProps} />);

      const errorElement = screen.getByTestId("error-message");
      expect(errorElement).toBeInTheDocument();
    });
  });
});
