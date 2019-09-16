import React from "react";
import { Container } from 'ui/Helpers';
import {
  FamilyImg,
  FamilyHeader,
  FamilyMenu,
  MenuTabs } from "./FamilyGroupStyles";
import MementoCard from "components/MementoCard/MementoCard";

export default function FamilyGroup() {

  const menuTabs = ["Mementos", "Members", "Tags"];

  const mementos = [{
    title: "My Painting",
    author: "Gigi",
    description: "Lorem ipsum I love painting",
    coverImage: "",
    tags: ["painting", "artwork"],
    dateUploaded: "2 days ago",
    dateCreated: "2018"
  },
  {
    title: "My Stuffed Hippo",
    author: "Gigi",
    description: "This is my favourite stuffed animal. I've had it since I was 5.",
    coverImage: "",
    tags: ["stuffed animals"],
    dateUploaded: "3 days ago",
    dateCreated: "1999"
  }];

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
      {mementos.map(memento => (
        <MementoCard {...memento}/>
      ))}
     <Container noNav>
     </Container>
   </>
  );
}
