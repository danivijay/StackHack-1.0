import React, { useState, Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { fileEngineURL } from "../../constants/generalConstants";
import { connect } from "react-redux";
import { addEventRegistrationPreview } from "../../reducers/eventRegistration";
import styled from "styled-components";
import Label from "../DesignSystem/Label";
import Input from "../DesignSystem/Input";
import SelectBox from "../DesignSystem/SelectBox";
import InputButton from "../DesignSystem/InputButton";
import FileButton from "../DesignSystem/FileButton";
import ProgressBar from "../DesignSystem/ProgressBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ErrorBox = styled.span`
  margin: 0;
  font-size: 0.7rem;
  margin-bottom: 15px;
  color: red;
`;

const Form = ({ events, formData, addToPreview }) => {
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: formData,
  });
  const [loading, setloading] = useState(0);
  const [fileUrl, setfileUrl] = useState("");

  const { id: eventId } = useParams();
  const event = events.find((e) => e.id === eventId);
  const history = useHistory();

  useEffect(() => {
    if (!eventId || !event) {
      history.push("/");
    }
  }, [event, eventId, history]);

  const onSubmit = (data) => {
    addToPreview(data);
    history.push(`/event/${eventId}/confirm`);
  };

  const uniqId = uuidv4();

  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("fileContent", file);
    formData.append("fileProject", "event_manager");
    formData.append("fileUniqId", uniqId);
    setloading(true);
    try {
      const data = await axios.post(`${fileEngineURL}/upload`, formData, {
        onUploadProgress: (progressEvent) =>
          setloading((progressEvent.loaded / progressEvent.total) * 100),
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data?.data?.success) {
        const urlPath = data?.data?.url;
        setfileUrl(`${fileEngineURL}${urlPath}`);
        toast.success("ID Card uploaded!");
      }
    } catch (e) {
      console.log(e);
      setloading(0);
      toast.error("Unable to upload file!");
    }
  };

  const registration_type = watch("registration_type");
  return (
    <Container>
      <h2>{event.name}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Label>First Name *</Label>
          <Input name="full_name" ref={register({ required: true })} />
          {errors.full_name && <ErrorBox>Fullname is required</ErrorBox>}
          <Label>Mobile Number *</Label>
          <Input name="mobile" ref={register({ required: true })} />
          {errors.mobile && <ErrorBox>Mobile number is required</ErrorBox>}
          <Label>Email Address *</Label>
          <Input
            name="email"
            ref={register({
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "invalid email address",
              },
            })}
          />
          {errors.email && <ErrorBox>Email is required</ErrorBox>}
          <Label>Registration Type *</Label>
          <SelectBox
            name="registration_type"
            ref={register({ required: true })}
          >
            <option value="">Select</option>
            <option value="Self">Self</option>
            <option value="Group">Group</option>
            <option value="Corporate">Corporate</option>
            <option value="Others">Others</option>
          </SelectBox>
          {errors.registration_type && (
            <ErrorBox>Registration Type is required</ErrorBox>
          )}

          {registration_type !== "" && registration_type !== "Self" && (
            <Fragment>
              <Label>Number of Tickets *</Label>
              <Input
                name="number_of_tickets"
                ref={register({ required: true })}
              />
              {errors.number_of_tickets && (
                <ErrorBox>Number of Tickets are required</ErrorBox>
              )}
            </Fragment>
          )}
          <Label>Upload ID Card *</Label>
          <FileButton
            type="file"
            id="id_card"
            name="id_card"
            accept="image/*"
            required
            disabled={loading !== 0 && loading !== 100}
            fullWidth
            onChange={(e) => handleUploadFile(e)}
          />
          <ProgressBar max="100" value={loading} />
          <input
            type="hidden"
            name="id_url"
            value={fileUrl}
            ref={register({ required: true })}
            accept="image/x-png,image/jpeg"
          />
          {errors.id_url && <ErrorBox>ID Card is required</ErrorBox>}
          <InputButton fullWidth type="submit" value="Preview" />
        </Container>
      </form>
      <ToastContainer />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    events: state?.events?.events,
    formData: state?.eventRegistration?.eventRegistrationDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToPreview: (payload) => dispatch(addEventRegistrationPreview(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
