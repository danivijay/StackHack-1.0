import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addEventRegistration } from "../../reducers/eventRegistration";
import styled from "styled-components";
import Button from "../DesignSystem/Button";
import Label from "../DesignSystem/Label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px;
  border: 1px solid #e8e6e6;
  border-radius: 5px;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: auto;
`;

const RegistrationIdLabel = styled.h4`
  padding: 0;
  margin-bottom: 7px;
`;
const RegistrationId = styled.h3`
  border: 1px grey dotted;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  font-size: 2rem;
  margin: 0;
`;

const Confirm = ({ previewData, submitData }) => {
  const [registrationId, setregistrationId] = useState(null);
  const [isNotRedirect, setisNotRedirect] = useState(true);
  const [noOfTickets, setnoOfTickets] = useState(null);
  const history = useHistory();
  const { id: eventId } = useParams();

  useEffect(() => {
    setisNotRedirect(previewData.email !== "");
  }, []);

  useEffect(() => {
    if (!isNotRedirect) {
      history.push(`/event/${eventId}`);
    }
  }, [eventId, history, previewData, isNotRedirect, registrationId]);

  const handleSubmitData = async () => {
    try {
      const data = await submitData(previewData);
      // setisNotRedirect(true);
      setregistrationId(data?.id);
      setnoOfTickets(data?.number_of_tickets);
    } catch (e) {
      console.log(e);
      toast.error("Unable to register!");
    }
  };

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(registrationId);
    toast.info("Registration ID copied");
  };
  return (
    <Wrapper>
      {!registrationId ? (
        <Fragment>
          <Button fullWidth type="success" onClick={() => handleSubmitData()}>
            Confirm and Submit
          </Button>
          <h3>Preview:</h3>
          <Container>
            <div>
              <p>
                <Label>Email:</Label>
                <br />
                {previewData.email}
              </p>
              <p>
                <Label>Full name:</Label>
                <br />
                {previewData.full_name}
              </p>
              <p>
                <Label>Mobile:</Label> <br />
                {previewData.mobile}
              </p>
              <p>
                <Label>Registration type:</Label>
                <br />
                {previewData.registration_type}
              </p>
            </div>
            {previewData.number_of_tickets && (
              <Fragment>
                <p>
                  <Label>No. of tickets:</Label>
                  <br />
                  {previewData.number_of_tickets}
                </p>
              </Fragment>
            )}
            <Label>ID Card:</Label>
            <ImagePreview src={previewData.id_url} alt="ID Preview" />
          </Container>
        </Fragment>
      ) : (
        <div>
          <RegistrationIdLabel>
            {noOfTickets && (
              <span>
                {noOfTickets} ticket{noOfTickets > 1 && "s"} registered,
              </span>
            )}{" "}
            Registration ID:
          </RegistrationIdLabel>
          <RegistrationId onClick={() => copyToClipBoard()}>
            {registrationId}
          </RegistrationId>
        </div>
      )}
      <ToastContainer />
    </Wrapper>
  );
};
const mapStateToProps = (state) => {
  return {
    previewData: state?.eventRegistration?.eventRegistrationDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitData: (payload) => dispatch(addEventRegistration(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
