import { MemoryRouter } from "react-router-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { mockdGnomeList } from "./mocks";
import Main from "./Main";
import { getJobList } from "./form/dropDown/helper";
import { getDataFromApi } from "../../services/api";

jest.mock("../../services/api");
jest.mock("./form/dropDown/helper"); //asi importamos todo lo del modulo helper

const renderFunction = () =>
  render(
    <MemoryRouter>
      <Main />
    </MemoryRouter>
  );

describe("Main", () => {
  describe("when gnomes are returned from API answer", () => {
    beforeEach(() => {
      const getDataFromApiMockd = getDataFromApi as jest.MockedFunction<
        typeof getDataFromApi
      >;

      getDataFromApiMockd.mockResolvedValue(mockdGnomeList);

      getJobListMockd.mockResolvedValue(["trabajo 1", "trabajo 2"]);
    });
    const getJobListMockd = getJobList as jest.MockedFunction<any>;

    describe("when user interacts with form", () => {
      describe("when user writes in input text", () => {
        it("handles value change", async () => {
          const userInput = "Gnome 0";
          renderFunction();

          await waitFor(() => screen.findByTestId("list-of-gnomes"));

          const input = screen.getByTestId("input");

          // eslint-disable-next-line testing-library/no-unnecessary-act
          act(() => {
            userEvent.type(input, userInput);
          });
          expect(input).toHaveValue(userInput); //asume que si coinciden los valores hay una función manejadora local
        });
      });

      describe("when user filter by jobs options from input select", () => {
        it("shows array of jobs and handles value change on user's selection", async () => {
          renderFunction();

          await waitFor(
            async () => await screen.findByTestId("list-of-gnomes") //porque no hay certeza de que esté
          );
          const dropdown = screen.getByTestId("filter-jobs");

          userEvent.click(dropdown); //userEvent se usa para eventos controlados que se activan por acción directa del usuario
          await fireEvent.change(dropdown, {
            //fireEvent se usa para eventos no controlados, ya que el option no tiene un onChange, sin embargo el click dispara que se llame a una función
            target: { value: getJobListMockd[0] },
          });

          expect(dropdown).toHaveValue(getJobListMockd[0]);
        });
      });

      describe("when user sorts options from input select", () => {
        it("shows array of jobs and handles value change on user's selection", async () => {
          renderFunction();

          await waitFor(
            async () => await screen.findByTestId("list-of-gnomes") //porque no hay certeza de que esté
          );
          const dropdown = screen.getByTestId("sort-age");
          //userEvent se usa para eventos controlados que se activan por acción directa del usuario
          userEvent.click(dropdown);

          const optionValue = screen.getByText("Ascending");
          expect(dropdown).toContain(optionValue);
        });
      });
    });

    describe("when no gnomes are returned from API answer", () => {
      beforeEach(() => {
        const getDataFromApiMockd = getDataFromApi as jest.MockedFunction<
          typeof getDataFromApi
        >;

        getDataFromApiMockd.mockResolvedValue(null);
      });
      // const getJobListMockd = getJobList as jest.MockedFunction<any>;
      it("shows message error", async () => {
        renderFunction();

        const errorMessage = await waitFor(
          async () => await screen.findByTestId("message-error") //porque no hay certeza de que esté
        );
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });
});
