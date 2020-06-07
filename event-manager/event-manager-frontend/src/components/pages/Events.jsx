import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import Button from "../DesignSystem/Button";

const Divider = styled.hr`
  border-top: 1px solid #ffffff;
`;

const ActionSection = styled.div`
  width: 100%;
  text-align: right;
`;

const EventNo = styled.h4`
  margin-bottom: 10px;
  margin-top: 0;
  padding: 0;
`;

const Container = styled.div`
  width: 100%;
`;

const EventTitle = styled.h2`
  margin: 0;
  padding: 0;
`;

const EventDesc = styled.p`
  margin: 0;
  padding: 10px 0;
`;

const Events = ({ events }) => {
  return (
    <Container>
      {events &&
        events.length > 0 &&
        events.map((event, i) => (
          <Fragment key={event.id}>
            <Container>
              <EventNo>Event {i + 1}</EventNo>
              <EventTitle>{event.name}</EventTitle>
              <EventDesc>{event.desc}</EventDesc>
              <NavLink
                key={event.id}
                to={`/event/${event.id}`}
                style={{ textDecoration: "None", color: "black" }}
              >
                <ActionSection>
                  <Button>Register</Button>
                </ActionSection>
              </NavLink>
            </Container>
            {i !== events.length - 1 && <Divider />}
          </Fragment>
        ))}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { events: state.events.events };
};

export default connect(mapStateToProps)(Events);
