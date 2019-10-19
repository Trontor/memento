import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { useQuery } from "@apollo/react-hooks";
import { GET_A_MEMENTO } from "queries/Memento";
import { NodeWrapper } from "./InheritanceTreeStyles";
import { NodeImage } from "./InheritanceTreeStyles";
import { TreeWrapper } from "./InheritanceTreeStyles";
import { NodeText } from "./InheritanceTreeStyles";

const svgSquare = {
  shape: "rect",
  shapeProps: {
    width: 1,
    height: 1,
    x: 0,
    y: 0,
  },
};

const mementoToBeneficiaryTree = memento => {
  // console.log(memento);
  const { title, uploader, beneficiaries, media } = memento;
  return {
    root: true,
    title: title,
    imageUrl: media && media.length > 0 ? media[0].url : uploader.imageUrl,
    name: `${uploader.firstName} ${uploader.lastName}`,
    attributes: {
      memento: `${title}`,
    },
    nodeSvgShape: svgSquare,
    children: beneficiaries.map(beneficiary => ({
      imageUrl: beneficiary.imageUrl,
      name: `${beneficiary.firstName} ${beneficiary.lastName}`,
      nodeSvgShape: svgSquare,
    })),
  };
};

export default function InheritanceTree(props) {
  // let treeContainer = null;
  const [treeContainer, setTreeContainer] = useState(null);
  const [translate, setTranslate] = useState({});
  const [memento, setMemento] = useState(null);
  useQuery(GET_A_MEMENTO, {
    variables: { id: props.mementoId },
    onCompleted: data => {
      if (data && data.memento) {
        setMemento(data.memento);
      }
    },
  });
  useEffect(() => {
    if (treeContainer && Object.keys(translate).length === 0) {
      const dimensions = treeContainer.getBoundingClientRect();
      const newTranslate = {
        x: dimensions.width / 2,
        y: dimensions.height / 3,
      };
      setTranslate(newTranslate);
    }
  }, [treeContainer, translate]);

  if (!memento) {
    return null;
  } else if (treeContainer) {
  }
  return (
    <TreeWrapper
      height={props.height}
      width={props.width}
      ref={tc => setTreeContainer(tc)}
    >
      <Tree
        styles={{
          links: {
            stroke: props.familyColour || "orange",
            strokeWidth: 1,
          },
        }}
        allowForeignObjects
        orientation={"vertical"}
        data={memento ? mementoToBeneficiaryTree(memento) : {}}
        translate={translate}
        nodeLabelComponent={{
          render: <NodeLabel />,
          foreignObjectWrapper: {
            width: 200,
            height: 150,
            y: -50,
            x: -100,
          },
        }}
      />
    </TreeWrapper>
  );
}
const NodeLabel = ({ nodeData }) => {
  const [nodeContainer, setNodeContainer] = useState(null);
  const nodeSize = "75px";
  if (nodeContainer && nodeData.root) {
    nodeContainer.parentElement.setAttribute("y", "-150");
  }
  return (
    <NodeWrapper ref={tc => setNodeContainer(tc)}>
      <NodeImage size={nodeSize} src={nodeData.imageUrl} />
      {nodeData.root ? (
        <>
          <NodeText>{nodeData.title}</NodeText>
          <NodeText size="small" italics>
            {nodeData.name}
          </NodeText>
        </>
      ) : (
        <NodeText>{nodeData.name}</NodeText>
      )}

      {!nodeData.root && <NodeText size="small">Beneficiary</NodeText>}
      {nodeData._children && (
        <button>{nodeData._collapsed ? "Expand" : "Collapse"}</button>
      )}
    </NodeWrapper>
  );
};
