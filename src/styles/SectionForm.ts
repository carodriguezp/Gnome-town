import styled from 'styled-components';
import { colors, fonts } from './variables';

export const SectionForm = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
    font-size:1rem;
    ::placeholder{
        color: ${colors.claireBrownRed};
       
    };
    @media (min-width: 1024px) { 
            gap: 10px
        }
`;

export const Label = styled.label`
    font-family: ${fonts.petrona};
    font-size:1rem;

    @media (min-width: 768px) {
    font-size: 1.3rem
    }
`;

export const Input = styled.input`
    font-family: ${fonts.petrona};
    background-color: ${colors.claireWood};
    color: ${colors.brownRed};
    border-radius: 5px;
    font-size:1rem;

    @media (min-width: 768px) {
    font-size: 1.3rem
    }

    &:focus{
        border-color: ${colors.wood}
    }
`;

export const Select = styled.select`
    font-family: ${fonts.petrona};
    background-color: ${colors.claireWood};
    color: ${colors.brownRed};
    border-radius: 5px;
    font-size:1rem;
    scrollbar-color:${colors.wood};

    @media (min-width: 768px) {
    font-size: 1.3rem
    }

    option{
        border-color: ${colors.wood}  
    };

    &:focus{
        border-color: ${colors.wood}
    }
`;