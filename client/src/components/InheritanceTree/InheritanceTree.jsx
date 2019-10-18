import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { useQuery } from "@apollo/react-hooks";
import { GET_A_MEMENTO } from "queries/Memento";

const myTreeData = [
  {
    name: "Diana Joshi",
    attributes: {
      Memento: "Mumbai Locket",
    },
    children: [
      {
        name: "Level 2: A",
        attributes: {
          keyA: "val A",
        },
      },
      {
        name: "Level 2: B",
      },
    ],
  },
];
// const svgSquare = {
//   shape: "image",
//   shapeProps: {
//     radius: 20,
//     href:
//       "https://d1i4bt9ym26htt.cloudfront.net/771d7206-efb3-4e5e-a2f3-3ca0771ac9d9.jpg",
//     width: 60,
//     height: 60,
//     x: -30,
//     y: -30,
//   },
// };
const svgSquare = imageUrl => ({
  shape: "image",
  shapeProps: {
    href: `${imageUrl}`,
    width: 45,
    height: 45,
    x: -17.5,
    y: -17.5,
  },
});

const mementoToBeneficiaryTree = memento => {
  console.log(memento);
  const { title, uploader, beneficiaries } = memento;
  return {
    name: `${uploader.firstName}`,
    attributes: {
      Memento: `${title}`,
    },
    nodeSvgShape: svgSquare(uploader.imageUrl),
    children: beneficiaries.map(beneficiary => ({
      name: "Level 2: A",
      attributes: {
        keyA: "val A",
        keyB: "val B",
        keyC: "val C",
      },
    })),
  };
};
export default function InheritanceTree() {
  let treeContainer = null;
  const [translate, setTranslate] = useState({});
  const [memento, setMemento] = useState(null);
  useQuery(GET_A_MEMENTO, {
    variables: { id: "5d9d6c448b3f484710880a43" },
    onCompleted: data => {
      if (data && data.memento) {
        setMemento(data.memento);
      }
    },
  });
  useEffect(() => {
    if (!treeContainer) {
      return;
    }
    console.log("Tree Container: ", treeContainer);

    const dimensions = treeContainer.getBoundingClientRect();
    setTranslate({
      x: dimensions.width / 2,
      y: dimensions.height / 3,
    });
  }, []);
  return (
    <div
      style={{ height: "100%", width: "100%" }}
      ref={tc => (treeContainer = tc)}
    >
      <Tree
        allowForeignObjects
        orientation={"vertical"}
        data={memento ? mementoToBeneficiaryTree(memento) : {}}
        translate={translate}
        nodeLabelComponent={{
          render: <NodeLabel className="myLabelComponentInSvg" />,
          foreignObjectWrapper: {
            y: 24,
          },
        }}
      />
    </div>
  );
}
class NodeLabel extends React.PureComponent {
  render() {
    const { className, nodeData } = this.props;
    return (
      <div className={className}>
        <p>{nodeData.name}</p>
        {/* {nodeData._children && (
          <button>{nodeData._collapsed ? "Expand" : "Collapse"}</button>
        )} */}
      </div>
    );
  }
}
