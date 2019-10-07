import styled from "styled-components";
import { Bookmark } from "styled-icons/boxicons-solid/Bookmark";

export const BookmarksWrapper = styled.div`
  display: grid;
  position: relative;
  object-fit: cover;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  justify-content: center;
`;

export const Item = styled.div`
  display: grid;
  grid-template-rows: 50% 50%;
  height: 300px;
  margin: 10px;
  border: 1px solid ${props => props.theme.palette.border};
  img {
    margin: auto;
    object-fit: cover;
    width: 90%;
    height: 90%;
  }
`;

export const Description = styled.div`
  display: grid;
  grid-template-rows: 20% 50% 30%;
  margin: 0 15px;
  h3 {
    margin-top: 5px;
  }
`;

export const Tags = styled.li`
  list-style: none;
  font-size: 16px;
  color: ${props => props.theme.palette.main};
  margin-bottom: 5px;
  &::before {
    content: "·";
    font-size: 80px;
    vertical-align: middle;
    line-height: 20px;
  }
  label {
    color: ${props => props.theme.palette.text};
  }
`;

export const UploaderBox = styled.div`
  display: grid;
  grid-template-columns: 20% 65% 15%;
  img {
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 50%;
    margin: 0;
  }
`;

export const UploaderText = styled.span`
  display: grid;
  grid-template-rows: 40% 50%;
`;

export const BookmarksIcon = styled(Bookmark)`
  color: ${props => props.theme.palette.border};
  width: 30px;
  cursor: pointer;
  margin-left: 10px;
`;
