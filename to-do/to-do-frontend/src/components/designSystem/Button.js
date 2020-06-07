import styled from "styled-components";

const typeDefault = `
  background: rgb(0, 137, 254);
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
`;

const typeSuccess = `
  background: rgb(166,235,0);
  background: linear-gradient(90deg, rgba(166,235,0,1) 0%, rgba(0,152,48,1) 100%);
  &:hover:enabled {
    opacity: 0.7;
  }
`;

const typeDanger = `
  background: rgb(252,0,0);
  background: linear-gradient(90deg, rgba(252,0,0,1) 0%, rgba(142,0,0,1) 100%);
  &:hover:enabled {
    opacity: 0.7;
  }
`;

export default styled.button`
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  padding: 10px;
  align-self: center;
  font-size: 1em;
  border: 0;
  border-radius: 5px;
  color: white;
  min-width: 35px;
  ${(props) => !props.type && typeDefault}
  ${(props) => props.type === "success" && typeSuccess}
  ${(props) => props.type === "danger" && typeDanger}
  &:disabled {
    opacity: 0.5;
  }
`;
