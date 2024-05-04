import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../styles/variables";

import { getDataFromApi } from "../services/api";
import type { GnomeTypeResponse } from "../components/common.types";

import Header from "./header/Header";
import GnomeDetail from "./main/gnomes/genomeDetail/GnomeDetail";
import Main from "./main/Main";

const Container = styled.main`
  background-color: ${colors.faireWood};
  text-decoration: none;
`;

function App() {
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
