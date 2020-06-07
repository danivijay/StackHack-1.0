import React from "react";
import styled from "styled-components";
import Button from "../designSystem/Button";
import { NavLink } from "react-router-dom";

const Wrapper = styled.div`
  margin: auto;
  text-align: center;
  max-width: 600px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 10px 15px 10px;
  align-items: center;
  border-bottom: 1px #e0e0e0 solid;
`;

const TitleBlock = styled.div`
  align-self: auto;
`;

const Links = styled.div`
  align-self: auto;
`;

const Title = styled.h1`
  margin: 0;
  background: rgb(0, 127, 235);
  background: linear-gradient(
    90deg,
    rgba(0, 127, 235, 1) 0%,
    rgba(0, 60, 152, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavBar = () => {
  return (
    <Wrapper>
      <Container>
        <TitleBlock>
          <Title>
            <NavLink
              to="/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Todo List
            </NavLink>
          </Title>
        </TitleBlock>
        <Links>{/* <Button fullWidth>Log out</Button> */}</Links>
      </Container>
    </Wrapper>
  );
};

export default NavBar;
