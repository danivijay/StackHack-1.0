import styled from "styled-components";

export default styled.input`
  margin-top: 3px;
  margin-bottom: 7px;
  height: ${({ type }) => (type === "date" ? "2.5em" : "2em")};
  font-size: 1em;
  padding: 0 0.4em;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
`;
