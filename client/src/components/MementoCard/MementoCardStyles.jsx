import { lighten } from "polished";
import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  padding: 18px 20px;
  border: 1px solid ${props => lighten(0.67, props.theme.palette.text)};
  background-color: ${props => props.theme.palette.foreground};
  margin-top: 12px;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLandscape}) {
    border-radius: 4px;
  }
`;

export const AuthorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

export const AuthorAvatar = styled.div`
  margin-right: 8px;

  img {
    border-radius: 50%;
    width: 38px;
    height: 38px;
    object-fit: cover;
  }

  i {
    font-size: 38px;
  }
`;

// export const NameDateWrapper= styled.div`

// `

export const MementoAuthor = styled.div`
  font-weight: bold;
  letter-spacing: 0.02em;
`;

export const CardContent = styled.div`
  i {
    margin-right: 6px;
    color: ${props => props.theme.palette.main};
  }
`;

export const MementoTitle = styled.div`
  font-weight: bold;
  letter-spacing: 0.03em;
  margin-bottom: 12px;
`;

export const MementoCoverImg = styled.div``;

export const MementoDescription = styled.div``;

export const Divider = styled.span`
  display: inline-block;
  margin: 0 4px;
  opacity: 0.6;
`;

export const UploadDate = styled.span`
  opacity: 0.7;
  font-size: 13px;
  display: block;
  margin-top: 2px;
`;

export const MementoLocation = styled.div`
  
`;

export const MementoDate = styled.span`
  display: block;
`;

export const MementoTags = styled.a``;
