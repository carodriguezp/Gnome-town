import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../styles/variables";

import { getDataFromApi } from "../services/api";
import type { GnomeTypeResponse } from "../components/common.types";

import Header from "./Header";
import GnomeDetail from "./main/gnomes/GnomeDetail";
import Main from "./main/Main";

const Container = styled.main`
  background-color: ${colors.faireWood};
  text-decoration: none;
`;

function App() {
  const [gnomesBrastlewark, setGnomesBrastlewark] = useState<
    GnomeTypeResponse[]
  >([]);

  const fetchDataFromApi = async () => {
    const data = await getDataFromApi();
    setGnomesBrastlewark(data);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return (
    <Container data-testid="main-app-test">
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/gnome/:idGnome" element={<GnomeDetail />} />
      </Routes>
    </Container>
  );
}

export default App;
