import styled, { css } from "styled-components";

import { lighten } from "polished";

export const AcceptFieldWrapper = styled.div`
  max-width: 380px;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 40px;
`;

export const InvitationWrapper = styled.div`
  padding: 20px 0 30px;

  p {
    line-height: 0.8em;
  }

  i {
    font-size: 80px;
    margin-bottom: 16px;
    color: ${props => lighten(0.1, props.theme.palette.main)};
  }
`