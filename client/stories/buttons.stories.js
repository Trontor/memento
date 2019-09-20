import React from "react";
import { storiesOf } from "@storybook/react";
import styled, { css } from "styled-components";
import { lighten } from "polished";
import { Spinner } from "./loaders.stories";

const Button = styled.button`
  font-size: 14px;
  background-color: ${props =>
    props.outline ? "transparent" : props.theme.palette.main};
  border: 1px solid
    ${props =>
      props.outline
        ? lighten(0.1, props.theme.palette.main)
        : props.theme.palette.main};
  border-radius: 4px;
  padding: 7px 12px;
  color: ${props => (props.outline ? props.theme.palette.main : "white")};
  margin-bottom: 10px;
  ${props => props.theme.mixins.hoverFade};
  min-width: 80px;

  &:hover {
    background-color: ${props =>
      props.outline ? "transparent" : lighten(0.1, props.theme.palette.main)};
    border: 1px solid ${props => lighten(0.1, props.theme.palette.main)};
    color: ${props =>
      props.outline ? lighten(0.05, props.theme.palette.main) : "white"};
    ${props => props.theme.mixins.hoverFade};
  }
`;

storiesOf("Button", module).add("Primary", () => (
  <>
    <Button>Primary</Button>
    <Button outline>Primary Outline</Button>
    <Button>
      <Spinner light />
    </Button>
    <Button outline>
      <Spinner />
    </Button>
  </>
));
