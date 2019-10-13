import styled from "styled-components";
import { AuthorAvatar } from "../MementoCard/MementoCardStyles";
import { CardOptions } from "../MementoCard/MementoCardStyles";

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
  margin: 15px 15px 0 0;
  border: 1px solid ${props => props.theme.palette.border};
  border-radius: 4px;

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

export const UploaderBox = styled.div`
  display: grid;
  grid-template-columns: 45px auto 40px;
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

export const UploaderAvatar = styled(AuthorAvatar)`
  margin-right: 5px;

  i {
    font-size: 32px;
  }
`;

export const BookmarksIcon = styled(CardOptions)`
  margin-top: 7px;
`;
