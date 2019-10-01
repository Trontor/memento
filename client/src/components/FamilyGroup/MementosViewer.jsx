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
      media: [
        {
          type: "",
          url: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
          caption: ""
        }
      ],
      tags: ["photographs","graduation"],
      dateUploaded: "2 months in the future",
      dateCreated: {day: 8, month: 12, year: 2019},
      location: "Melbourne",
      people: ["Giselle Leung", "Hans Leung", "Regina Siu", "Keith Leung"]
    },
    {
      title: "My Painting",
      author: "Gigi",
      description: "Lorem ipsum I love painting",
      media: [{type: "", url: "", caption: ""}],
      tags: ["painting", "artwork"],
      dateUploaded: "2 days ago",
      dateCreated: {day: 8, month: 12, year: 2019},
      location: "Melbourne",
      people: []
    },
    {
      title: "My Stuffed Hippo",
      author: "Gigi",
      description: "This is my favourite stuffed animal. I've had it since I was 5.",
      media: [{type: "", url: "", caption: ""}],
      tags: ["stuffed toys"],
      dateUploaded: "3 days ago",
      dateCreated: {day: 8, month: 12, year: 1999},
      location: "Melbourne",
      people: []
    },
    {
      title: "My Stuffed Hippo",
      author: "Gigi",
      description: "This is my favourite stuffed animal. I've had it since I was 5.",
      media: [{type: "", url: "", caption: ""}],
      tags: ["stuffed toys"],
      dateUploaded: "3 days ago",
      dateCreated: {day: 8, month: 12, year: 1999},
      location: null,
      people: []
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
