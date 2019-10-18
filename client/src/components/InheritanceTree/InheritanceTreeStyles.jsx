import styled from "styled-components";

export const TreeWrapper = styled.div`
  height: ${props => props.height || "100%"};
  width: ${props => props.width || "100%"};
  foreignObject {
    transform: translate(0, 50px);
  }
`;

export const NodeWrapper = styled.div`
  text-align: center;
  background-color: white;
  transform: translate(0px, 0px);
`;

export const NodeImage = styled.img`
  width: ${({ size }) => size || "50px"};
  height: ${({ size }) => size || "50px"};
  border-radius: ${({ size }) => size || "50px"};
  border: 2px solid black;
`;

export const NodeText = styled.p`
  margin: 0;
  font-style: ${props => (props.italics ? "italic" : "inherit")};
  font-size: ${props => {
    switch (props.size) {
      case "small":
        return "10px";
      default:
        return "14px";
    }
  }};
`;
