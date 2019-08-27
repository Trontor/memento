import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { css } from "styled-components";

const MainButton = css`
  padding: 10px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
  ${props => props.theme.mixins.hoverFade};
`;

const ButtonPrimary = styled.button`
  ${MainButton}
  background: ${props => props.theme.palette.main};
  color: white;
  border: 1px solid ${props => props.theme.palette.main};

  &:hover {
    border: 1px solid ${props => props.theme.palette.secondary};
    background: ${props => props.theme.palette.secondary};
  }
`;

const ButtonOutline = styled.button`
  ${MainButton}
  background: none;
  color: ${props => props.theme.palette.main};
  border: 1px solid ${props => props.theme.palette.main};

  &:hover {
    border: 1px solid ${props => props.theme.palette.secondary};
    color: ${props => props.theme.palette.secondary};
    background: white;
  }
`;

storiesOf('Button', module)
  .add('Primary', () =>
    <ButtonPrimary>Primary Button</ButtonPrimary>
  )
  .add('Secondary', () =>
    <ButtonOutline>Primary Button</ButtonOutline>
  )
;