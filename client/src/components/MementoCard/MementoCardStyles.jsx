import { lighten } from "polished";
import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid ${props => lighten(0.65, props.theme.palette.text)};
  background-color: ${props => props.theme.palette.foreground};
  margin-top: 12px;
`;

export const AuthorAvatar = styled.div`
  img {
    border-radius: 50%;
    width: 32px;
    height: 32px;
    object-fit: cover;
  }

  i {
    font-size: 32px;
  }
`;

export const MementoTitle = styled.div``;

export const MementoAuthor = styled.div``;

export const MementoCoverImg = styled.div``;

export const MementoDescription = styled.div``;

export const UploadDate = styled.span``;

export const MementoDate = styled.span`
  display: block;
`;

export const MementoTags = styled.a``;
