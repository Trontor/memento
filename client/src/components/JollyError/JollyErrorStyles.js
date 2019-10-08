import styled, {keyframes} from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SadError = styled.span`
  color: ${props => props.theme.palette.main};

  p {
    display: block;
    font-family: "Livvic", sans-serif;
    font-size: 32px;
    text-align: center;
  }

  i {
    font-size: 100px;
    margin: 0 16px;
    animation: ${rotate} 2s linear infinite;
  }
`;
