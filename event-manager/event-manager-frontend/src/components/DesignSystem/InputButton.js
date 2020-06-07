import styled from "styled-components";

export default styled.input`
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  padding: 10px;
  align-self: center;
  font-size: 1em;
  border: 0;
  border-radius: 5px;
  color: white;
  min-width: 35px;
  margin-top: 5px;
  background: rgb(0, 137, 254);
  font-weight: bold;
  cursor: pointer;
  background: linear-gradient(
    90deg,
    rgba(0, 137, 254, 1) 0%,
    rgba(0, 64, 162, 1) 100%
  );
  &:hover:enabled {
    background: rgb(0, 127, 235);
    background: linear-gradient(
      90deg,
      rgba(0, 127, 235, 1) 0%,
      rgba(0, 60, 152, 1) 100%
    );
  }
  &:disabled {
    opacity: 0.5;
  }
`;
