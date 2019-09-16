import React, { useState } from "react";
import { Container } from 'ui/Helpers';
import { FamilyImg, FamilyHeader, FamilyMenu, MenuTabs } from "./FamilyGroupStyles";

export default function FamilyGroup() {

  const menuTabs = ["Mementos", "Members", "Tags"]

  return(
   <>
     <FamilyImg/>
     <FamilyHeader>
        <h1>Gigi's family</h1>
      </FamilyHeader>
      <FamilyMenu>
        {menuTabs.map(tab => (
          <MenuTabs>{tab}</MenuTabs>)
        )}
      </FamilyMenu>
     <Container noNav>
     </Container>
   </>
  );
}
