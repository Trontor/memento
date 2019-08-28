import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { css } from "styled-components";
import { lighten } from 'polished';
import { PageHeader } from './typography.stories';
import { Container } from './helpers';

const Instructions = styled.label`
  font-size: 16px;
  font-family: 'Livvic', sans-serif;
  font-weight: bold;
  display: block;
`;

const 

storiesOf('Create New Family', module)
  .add('Default', () =>
  <Container>
    <PageHeader underline>Create a New Family</PageHeader>
    <Instructions>What would you like to name your Family group?</Instructions>
  </Container>
  )
;