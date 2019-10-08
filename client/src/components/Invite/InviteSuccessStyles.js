import { lighten } from "polished";
import styled from "styled-components";

export const TextWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 30px 40px 40px;
  margin: auto;
  text-align: center;
  color: ${props => props.theme.palette.text};
  border: 1px solid ${props => lighten(0.65, props.theme.palette.text)};
  background-color: ${props => props.theme.palette.foreground};
  border-radius: 8px;
  box-shadow: 1px 1px 16px ${props => lighten(0.7, props.theme.palette.text)};

  i {
    font-size: 72px;
    color: ${props => props.theme.palette.secondary};
    margin: 30px 0;
  }
`;

export const SentMessage = styled.div`
  font-family: "Livvic", sans-serif;
  margin-bottom: 60px;

  p {
    font-size: 18px;
    opacity: 0.8;
  }
`

export const Email = styled.ul`
  padding: 0;
  text-align: left;
  margin: 0;
  position: relative;
  transform: translateY(-5px);
  font-size: 16px;
`

export const EmailsList = styled.div`
  margin: 0 auto;
  width: 400px;
  display: grid;
  grid-template-columns: 36px 1fr;
  grid-column-gap: 18px;
  grid-row-gap: 9px;
  align-items: baseline;
  font-size: 16px;
  letter-spacing: 0.02em;

  i {
    color: ${props => (props.failure ? props.theme.palette.error : "#7EE67D")};
    font-size: 24px;
    margin: 0;
  }

  p {
    text-align: left;
    margin: 0;
    font-size: 14px;
    color: ${props => props.theme.palette.error};
  }
`

export const ButtonMenu = styled.div`
  max-width: 500px;
  margin: 0 auto;

  button:last-child {
    margin-bottom: 0;
  }

  button {
    display: block;
    width: 100%;
    margin-bottom: 12px;
  }
`