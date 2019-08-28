import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { css } from "styled-components";
import { lighten } from 'polished';

export const PageHeader = styled.h1`
  font-size: 32px;

  ${({underline}) => underline && css`
    display: inline-block;
    border-bottom: 5px solid ${props => props.theme.palette.main};
    padding-bottom: 2px;
  `};
`;

export const Instructions = styled.label`
  font-size: 16px;
  font-family: 'Livvic', sans-serif;
  font-weight: bold;
  display: block;
`;

storiesOf('Typography', module)
  .add('Headers', () =>
  <>
    <PageHeader>Page Header</PageHeader>
    <PageHeader underline>Page Header with Underline</PageHeader>
  </>
  )
;