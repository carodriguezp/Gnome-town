import Router from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import GnomeDetail from "./GnomeDetail";
import { mockdGnome } from "../mocks";
import userEvent from "@testing-library/user-event";

//PARA RENDER Y PARA EL CORAZON-TIENE UN CLICK PRIMERO TENEMSO QE TENER LA INFO DEL GNOMO

////Vamos a mockear la biblioteca de react-router-dom
// añadir los valores reales del componente, qeu son los que se importan
//vamos a mockear el matchpath

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  matchPath: jest.fn(),
}));

const renderFunction = () => {
  render(
    <Router.MemoryRouter>
      <GnomeDetail />
    </Router.MemoryRouter>
  );
};

describe("GnomeDetail", () => {
  //MOCKD de la llamada a la API
  //beforeEach se aplica antes de cada test

  describe("when gnomes are returned from API answer", () => {
    beforeEach(() => {
      jest
        .spyOn(Router, "matchPath") //usamos spyOn para poder editar el matchpath a través del idGnome, ya que no smetemos en le método de un objeto
        .mockReturnValue({ params: { idGnome: "1" } } as any);

      jest.mock("../../../../services/api", () => ({
        getDataByIdFromApi: jest.fn().mockResolvedValue(mockdGnome),
      }));
    });

    it("renders loading state and after renders detail of gnome with exit icon", async () => {
      renderFunction();

      const loadingState = screen.getByTestId("loading");

      expect(loadingState).toBeInTheDocument();

      //para esperar por la operación asíncrona y despues ejecute la linea 33 (1º el loading y 2º el enano)
      const gnomeCard = await waitFor(() => screen.findByTestId("gnome-card"));

      // eslint-disable-next-line testing-library/no-debugging-utils
      //screen.debug();

      expect(gnomeCard).toBeInTheDocument();

      const exitIcon = screen.getByTestId("exit-icon");

      expect(exitIcon).toBeInTheDocument();
    });

    describe("when user clicks heart icon", () => {
      it("changes friendship text and icon", async () => {
        renderFunction();

        await waitFor(() => screen.findByTestId("gnome-card"));

        const iconHeart = screen.getByTestId("icon-heart");
        const textNoFriend = screen.getByText(
          "We are not friends, Do you want to be one?"
        );

        expect(textNoFriend).toBeInTheDocument();
        expect(iconHeart).toHaveClass("fa-regular");

        await userEvent.click(iconHeart);

        const textFriend = await waitFor(() =>
          screen.findByText("Now we are friends")
        );

        expect(iconHeart).toHaveClass("fa-solid");
        expect(textFriend).toBeInTheDocument();
        expect(
          screen.queryByText("We are not friends, Do you want to be one?")
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("when no gnomes are returned from API answer", () => {
    beforeEach(() => {
      jest
        .spyOn(Router, "matchPath")
        .mockReturnValue({ params: { idGnome: "abc" } } as any);
      jest.mock("../../../../services/api", () => ({
        getDataByIdFromApi: jest.fn().mockResolvedValue(undefined),
      }));
    });

    it("shows message error", async () => {
      render(
        <Router.MemoryRouter>
          <GnomeDetail />
        </Router.MemoryRouter>
      );

      const messageError = await waitFor(
        async () => await screen.findByTestId("gnome-message-error") //porque no hay certeza de que esté
      );
      expect(messageError).toBeInTheDocument();
    });
  });
});
