import React, { Component } from "react";

import {
  DashboardContainer,
  Navbar,
  TextWrapper,
  SearchBar
} from "./DashboardStyles";
import { ButtonPrimary, ButtonSecondary, MenuIcon } from "ui/Buttons";
import { Menu } from "styled-icons/boxicons-regular/Menu/Menu";

export default class Dashboard extends Component {
  render() {
    return (
      <DashboardContainer>
        <Navbar>
          <a href="#">Menu</a>
          <SearchBar placeholder="Search artefacts..." />
        </Navbar>
        <TextWrapper>
          <h2>You don't belong to any Families at the moment. </h2>
          <p>What would you like to do for now?</p>
          <ButtonPrimary>Create a Family</ButtonPrimary>
          <ButtonSecondary>Join a Family</ButtonSecondary>
        </TextWrapper>
      </DashboardContainer>
    );
  }
}
