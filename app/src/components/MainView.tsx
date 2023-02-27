import styled from "styled-components";

const MainView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 0.5rem;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  font-family: "Roboto", sans-serif;
`

const HorizontalOverlay = styled.div`
  overflow-x: auto;
  max-width: 100%;
`;

export {MainView, HorizontalOverlay}