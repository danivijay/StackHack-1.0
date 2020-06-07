import styled from "styled-components";

export default styled.input`
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  padding: 10px;
  align-self: center;
  font-size: 1em;
  border-radius: 5px 5px 0 0;
  color: black;
  border: 1px solid #e0e0e0;
  min-width: 35px;
  margin-top: 5px;
  margin-left: 4.5%;
  margin-right: 4.5%;
  width: 96.3%;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
`;
