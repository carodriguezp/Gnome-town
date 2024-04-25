import styled from "styled-components";
import { colors } from "../styles/variables";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.faireBrownRed};
`;

const Spinner = styled.div`
  width: 56px;
  height: 56px;
  display: grid;
  color: ${colors.brownRed};
  background: radial-gradient(
    farthest-side,
    currentColor calc(100% - 6.7px),
    #0000 calc(100% - 5.6px) 0
  );
  -webkit-mask: radial-gradient(
    farthest-side,
    #0000 calc(100% - 14.6px),
    #000 calc(100% - 13.4px)
  );
  border-radius: 50%;
  animation: spinner-sm4bhi 2s infinite linear;

  &:before,
  &:after {
    content: "";
    grid-area: 1/1;
    background: linear-gradient(currentColor 0 0) center,
      linear-gradient(currentColor 0 0) center;
    background-size: 100% 11.2px, 11.2px 100%;
    background-repeat: no-repeat;
  }

  &:after {
    transform: rotate(45deg);
  }

  @keyframes spinner-sm4bhi {
    100% {
      transform: rotate(1turn);
    }
  }
`;

function LoadingState() {
  return (
    <Container>
      <Spinner></Spinner>
    </Container>
  );
}

export default LoadingState;
