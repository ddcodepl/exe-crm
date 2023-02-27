import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;

const Label = styled.label`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  padding: 0.5rem;
`;

const Span = styled.span`
  text-align: left;
  margin-bottom: 0.5rem;
`;

const Error = styled.span`
  color: red;
  margin-left: 0.5rem;
  padding-top: 0.5rem;
`;

export { Form, Label, Input, Span, Error}