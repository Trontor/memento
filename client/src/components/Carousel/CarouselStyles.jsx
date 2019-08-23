import styled from "styled-components";

export const CarouselWrapper = styled.div`
  padding: 40px;

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLanscape}) {
    width: 50vw;
    position: absolute;
    top: 50%;
    transform: translate(-20px, -50%);
  }
`;

export const Description = styled.h2`
  font-weight: normal;
  margin: 0 auto;
  text-align: center;
  width: 65%;
  margin-top: 10px;
  line-height: 1.2em;
`;

export const CarouselSlide = styled.div`
  display: block!important;
  margin: auto;

  img {
    object-fit: cover;
    width: 60vw;
    height: 60vw;
    border-radius: 4px;
    margin: auto;

    @media screen and (min-width: ${props => props.theme.breakpoints.tabletPortrait}) {
      width: 50vw;
      height: 50vw;
  }

    @media screen and (min-width: ${props => props.theme.breakpoints.tabletLanscape}) {
      width: 200px;
      height: 200px;
  }
}
`;