import MementoCard from "components/MementoCard/MementoCard";
import React from "react";

export default function MementosViewer() {
  const mementos = [
    {
      title: "Gigi's Graduation",
      author: "Gigi",
      description: "Bachelor of Design",
      mementoType: "event",
      eventType: "graduation",
      coverImage: "",
      tags: ["photographs","graduation"],
      dateUploaded: "2 months in the future",
      dateCreated: "2019",
      location: "Melbourne"
    },
    {
      title: "My Painting",
      author: "Gigi",
      description: "Lorem ipsum I love painting",
      coverImage: "",
      tags: ["painting", "artwork"],
      dateUploaded: "2 days ago",
      dateCreated: "2018",
      location: "Melbourne"
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
      location: "Melbourne"
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
      location: null
    }
  ];

  return (
    <>
      {mementos.map(memento => (
        <MementoCard {...memento} />
      ))}
    </>
  );
}
