import { render, screen } from "@testing-library/react";
import App from "./components/App";
import { HashRouter } from "react-router-dom";

test("renders container from App", () => {
  render(
    <HashRouter>
      <App />
    </HashRouter>
  );

  const containerElement = screen.getByTestId("main-app-test");

  expect(containerElement).toBeInTheDocument();
});
