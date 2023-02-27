import styled from "styled-components";

const Button = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 0.25rem 0.5rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 0.5rem 0.5rem;
  cursor: pointer;
`

const AddButton = styled(Button)`
  background-color: #2ecc71;
`

const SubmitButton = styled(Button)`
  background-color: #3498db;
`

const CancelButton = styled(Button)`
  background-color: #e74c3c;
`

const EditButton = styled(Button)`
  background-color: #f1c40f;
`

const DeleteButton = styled(Button)`
  background-color: #e74c3c;
`

export {AddButton, SubmitButton, CancelButton, EditButton, DeleteButton, Button}