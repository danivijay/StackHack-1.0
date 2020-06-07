import React, { useState } from "react";
import Label from "./designSystem/Label";
import Input from "./designSystem/Input";
import Button from "./designSystem/Button";
import LinkButton from "./designSystem/LinkButton";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  align-content: space-around;
  max-width: 500px;
  width: 100%;
`;

const Register = ({ handleIsHaveAccount }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  return (
    <Container>
      <Label>Name</Label>
      <Input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
      <Label>Email</Label>
      <Input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <Label>Password</Label>
      <Input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      <Label>Confirm Password</Label>
      <Input
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setconfirmPassword(e.target.value)}
      />
      <Button fullWidth>Register</Button>
      <LinkButton onClick={handleIsHaveAccount}>
        I already have an account - login
      </LinkButton>
    </Container>
  );
};

export default Register;
