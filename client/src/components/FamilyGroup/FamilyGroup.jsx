import React, { useState } from "react";
import { Container } from 'ui/Helpers';
import { FamilyImg, FamilyHeader } from "./FamilyGroupStyles";

export default function FamilyGroup() {

  return(
   <>
     <FamilyImg/>
     <FamilyHeader>
        <h2>Gigi's family</h2>
      </FamilyHeader>
     <Container noNav>
     </Container>
   </>
  );
}
