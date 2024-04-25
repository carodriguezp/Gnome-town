import React from "react";
import styled from "styled-components";
import { fonts, colors } from "../styles/variables";

const HeaderStyled = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: 45px;
  margin: 15px 0 15px 0;
  background-color: ${colors.faireWood};

  @media all and (min-width: 768px) {
    height: 65px;
  }

  h1 {
    margin: 0;
    color: ${colors.brownRed};
    font-family: ${fonts.titleFamily};
    text-align: center;
    font-size: 2.2rem;

    @media all and (min-width: 768px) {
      font-size: 3.5rem;
    }
  }
`;

function Header() {
  return (
    <HeaderStyled>
      <h1>Brastlewark</h1>
    </HeaderStyled>
  );
}

export default Header;
