import React from 'react'
import styled from 'styled-components';
import { fonts, colors } from '../styles/variables';

function Header() {

    const Header = styled.header`

    h1{
        color: ${colors.brownRed};
        font-family: ${fonts.titleFamily};
        text-align:center;
        font-size: 2.5rem;

        @media all and (min-width: 768px) {

        font-size: 3.5rem;

        }
    }
    `;

    return (
        <Header>
            <h1>Brastlewark</h1>
        </Header>
    )
}

export default Header
