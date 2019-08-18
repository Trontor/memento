import React, { Component } from 'react'
import styled from "styled-components"
import { FormInput } from 'ui/Forms'

const LoginWrapper = styled.div`
  width: 280px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export class Login extends Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <LoginWrapper>
          <FormInput placeholder="Email" type="text" name="email"/>
          <FormInput placeholder="Password" type="password" name="password"/>
        </LoginWrapper>
      </div>
    )
  }
}

export default Login
