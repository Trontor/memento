import styled from "styled-components";

export const SadError = styled.span`
  display: block;
  color: ${props => props.theme.palette.main};

  i {
    font-size: 160px;
  }
`;
