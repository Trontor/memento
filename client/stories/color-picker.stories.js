import React from "react";
import { CirclePicker } from "react-color";
import styled, { css } from "styled-components";
import { storiesOf } from "@storybook/react";

storiesOf("Colour Picker", module).add("Default", () => <CirclePicker />);
