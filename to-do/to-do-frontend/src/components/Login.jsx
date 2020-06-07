import React from "react";
import styled from "styled-components";
import Label from "./designSystem/Label";
import Input from "./designSystem/Input";
import Button from "./designSystem/Button";
import LinkButton from "./designSystem/LinkButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  align-content: space-around;
  max-width: 500px;
  width: 100%;
`;

const Register = ({ handleIsNotHaveAccount }) => {
  return (
    <Container>
      <Label>Email</Label>
      <Input type="email" name="email" value="" />
      <Label>Password</Label>
      <Input type="password" name="password" value="" />
      <Button fullWidth>Login</Button>
      <LinkButton onClick={handleIsNotHaveAccount}>
        I don't have an account - register
      </LinkButton>
    </Container>
  );
};

export default Register;
