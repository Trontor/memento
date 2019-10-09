import MementoCard from "components/MementoCard/MementoCard";
import { MementoCardColumns } from "./MementosViewerStyles";
import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import JollyLoader from "components/JollyLoader/JollyLoader";
import { GET_MEMENTOS } from "queries/Memento";

export default function MementosViewer(props) {
  // const originalMementos = [
  //   {
  //     title: "Gigi's Graduation",
  //     author: "Gigi",
  //     description: "Bachelor of Design",
  //     mementoType: "event",
  //     eventType: "graduation",
  //     media: [
  //       {
  //         type: "",
  //         url:
  //           "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
  //         caption: "",
  //       },
  //     ],
  //     tags: ["photographs", "graduation"],
  //     dateUploaded: "2 months in the future",
  //     dateCreated: { day: 8, month: 12, year: 2019 },
  //     location: "Melbourne",
  //     people: ["Giselle Leung", "Hans Leung", "Regina Siu", "Keith Leung"],
  //   },
  //   {
  //     title: "My Painting",
  //     author: "Regina",
  //     description: "My watercolour painting",
  //     media: [
  //       {
  //         type: "",
  //         url:
  //           "https://images.unsplash.com/photo-1491245338813-c6832976196e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
  //         caption: "",
  //       },
  //     ],
  //     tags: ["painting", "artwork"],
  //     dateUploaded: "2 days ago",
  //     dateCreated: { day: 8, month: 12, year: 2019 },
  //     location: "Melbourne",
  //     people: [],
  //   },
  //   {
  //     title: "My Stuffed Hippo",
  //     author: "Gigi",
  //     description:
  //       "This is my favourite stuffed animal. I've had it since I was 5.",
  //     media: [],
  //     tags: ["stuffed toys"],
  //     dateUploaded: "3 days ago",
  //     dateCreated: { day: 8, month: 12, year: 1999 },
  //     location: "Melbourne",
  //     people: [],
  //   },
  //   {
  //     title: "Cheesecake Recipe",
  //     author: "Keith",
  //     description:
  //       "This is a description of the cheesecake recipe. This is a description of the cheesecake recipe. This is a description of the cheesecake recipe.",
  //     media: [],
  //     tags: ["recipes", "food"],
  //     dateUploaded: "3 days ago",
  //     dateCreated: { day: 8, month: 12, year: 2018 },
  //     location: null,
  //     people: [],
  //   },
  //   {
  //     title: "Gigi's Graduation",
  //     author: "Gigi",
  //     description: "Bachelor of Design",
  //     mementoType: "event",
  //     eventType: "graduation",
  //     media: [
  //       {
  //         type: "",
  //         url:
  //           "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
  //         caption: "",
  //       },
  //     ],
  //     tags: ["photographs", "graduation"],
  //     dateUploaded: "2 months in the future",
  //     dateCreated: { day: 8, month: 12, year: 2019 },
  //     location: "Melbourne",
  //     people: ["Giselle Leung", "Hans Leung", "Regina Siu", "Keith Leung"],
  //   },
  //   {
  //     title: "My Painting",
  //     author: "Regina",
  //     description: "My watercolour painting",
  //     media: [
  //       {
  //         type: "",
  //         url:
  //           "https://images.unsplash.com/photo-1491245338813-c6832976196e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
  //         caption: "",
  //       },
  //     ],
  //     tags: ["painting", "artwork"],
  //     dateUploaded: "2 days ago",
  //     dateCreated: { day: 8, month: 12, year: 2019 },
  //     location: "Melbourne",
  //     people: [],
  //   },
  //   {
  //     title: "My Stuffed Hippo",
  //     author: "Gigi",
  //     description:
  //       "This is my favourite stuffed animal. I've had it since I was 5.",
  //     media: [],
  //     tags: ["stuffed toys"],
  //     dateUploaded: "3 days ago",
  //     dateCreated: { day: 8, month: 12, year: 1999 },
  //     location: "Melbourne",
  //     people: [],
  //   },
  //   {
  //     title: "Cheesecake Recipe",
  //     author: "Keith",
  //     description:
  //       "This is a description of the cheesecake recipe. This is a description of the cheesecake recipe. This is a description of the cheesecake recipe.",
  //     media: [],
  //     tags: ["recipes", "food"],
  //     dateUploaded: "3 days ago",
  //     dateCreated: { day: 8, month: 12, year: 2018 },
  //     location: null,
  //     people: [],
  //   },
  // ];
  const [mementos, setMementos] = useState([]);
  const loadMementosResult = useQuery(GET_MEMENTOS, {
    variables: {
      id: props.familyId,
    },
    onCompleted: data => {
      if (data && data.mementos) {
        console.log(props);

        props.onLoadedMementos(data.mementos);
        setMementos(data.mementos);
      }
    },
  });
  console.log("Filtering Memento Tags:", props.filterTags);

  if (loadMementosResult.loading) {
    return <JollyLoader></JollyLoader>;
  }

  let filteredMementos = mementos;
  if (props.filterTags && props.filterTags.length > 0) {
    filteredMementos = mementos.filter(m =>
      m.tags.some(tag => props.filterTags.includes(tag)),
    );
  }

  return (
    <MementoCardColumns>
      {filteredMementos.map(memento => {
        return <MementoCard {...memento} />;
      })}
    </MementoCardColumns>
  );
}
