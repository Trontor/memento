import React from "react";
import { Container } from "ui/Helpers";
import {
  FamilyImg,
  FamilyHeader,
  FamilyMenu,
  MenuTabs,
} from "./FamilyGroupStyles";
import { useQuery } from "@apollo/react-hooks";
import MementoCard from "components/MementoCard/MementoCard";
import { LOAD_FAMILY } from "mutations/Family";
import JollyLoader from "components/JollyLoader/JollyLoader";

export default function FamilyGroup(props) {
  const familyId = props.match.params.id;
  const { data, loading, error } = useQuery(LOAD_FAMILY, {
    variables: { id: familyId },
  });
  if (loading) {
    return <JollyLoader />;
  }
  let familyName, members;
  if (data) {
    familyName = data.family.name;
    members = data.family.members;
    console.log(members);
  }
  const menuTabs = ["Mementos", "Members", "Tags"];
  const mementos = [
    {
      title: "My Painting",
      author: "Gigi",
      description: "Lorem ipsum I love painting",
      coverImage: "",
      tags: ["painting", "artwork"],
      dateUploaded: "2 days ago",
      dateCreated: "2018",
    },
    {
      title: "My Stuffed Hippo",
      author: "Gigi",
      description:
        "This is my favourite stuffed animal. I've had it since I was 5.",
      coverImage: "",
      tags: ["stuffed animals"],
      dateUploaded: "3 days ago",
      dateCreated: "1999",
    },
  ];

  return (
    <>
      <FamilyImg />
      <FamilyHeader>
        <h1>{familyName}</h1>
      </FamilyHeader>
      {members.map(member => (
        <h1>
          {member.firstName} {member.lastName}
        </h1>
      ))}
      <FamilyMenu>
        {menuTabs.map(tab => (
          <MenuTabs>{tab}</MenuTabs>
        ))}
      </FamilyMenu>
      {mementos.map(memento => (
        <MementoCard {...memento} />
      ))}
      <Container noNav></Container>
    </>
  );
}
