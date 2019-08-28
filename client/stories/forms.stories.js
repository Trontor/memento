import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from "styled-components";
import { lighten } from 'polished';

export const InputField = styled.input`
  font-family: "Rubik", sans-serif;
  color: ${props => props.theme.palette.text};
  border: none;
  border-bottom: 1px solid ${props => props.theme.palette.border};
  width: 100%;
  font-size: 15px;
  padding: 6px 0;
  margin-bottom: 3px;
  ${props => props.theme.mixins.hoverFade};

  ::placeholder {
    opacity: 0.4;
    font-weight: 300;
  }

  &:focus {
    outline: none;
    border-color: ${props => lighten(0.1, props.theme.palette.main)};
    ${props => props.theme.mixins.hoverFade};
  }
`;

export const FormHelpText = styled.span`
  font-size: 11px;
  font-weight: 300;
  opacity: 0.5;
`;

storiesOf('Forms', module)
  .add('Default', () =>
    <>
     <InputField placeholder="This is placeholder text."/>
     <FormHelpText>This is some text to help the user.</FormHelpText>
    </>
  )
;