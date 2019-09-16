import styled, { css } from "styled-components";
import { InputField } from 'ui/Forms';

export const DateInput = styled.div`
  display: grid;
  grid-template-columns: 15% auto 25%;
  width: 320px;
  grid-column-gap: 12px;
`;

export const DateField = styled(InputField)`
  margin-bottom: 0;
  font-size: 16px;
`;