import styled from "styled-components";
import { lighten } from "polished";

export const Card = styled.div`
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid ${props => lighten(0.6, props.theme.palette.text)};
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
