import styled from "styled-components";
import {ReactNode} from "react";

export const StyledTable = styled.table`
  font-family: arial, sans-serif;
  //make table responsive
  border-collapse: collapse;
  width: 100%;
  overflow: auto;
`;

export const THead = styled.thead`
  background-color: #333;
`;

export const TBody = styled.tbody`

`;

export const TR = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
    color: #333;
  }
`;

export const TH = styled.th`
  padding: 0.5rem;
  cursor: pointer;

  &:last-of-type {
    cursor: default;
  }
`;

export const TD = styled.td`
  padding: 0.5rem;
  min-width: 100px;
  text-align: center;
`;

export const TDActions = styled.td`
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

export const Table = ({children, ...rest}: any) => {
    return <StyledTable {...rest}>{children}</StyledTable>;
};

Table.Head = ({children, ...rest}: any) => {
    return <THead {...rest}>{children}</THead>;
};

Table.Body = ({children, ...rest}: any) => {
    return <TBody {...rest}>{children}</TBody>;
};

Table.TH = ({children, ...rest}: any) => {
    return <TH {...rest}>{children}</TH>;
};

Table.TR = ({children, ...rest}: any) => {
    return <TR {...rest}>{children}</TR>;
};

Table.TD = ({children, ...rest}: any) => {
    return <TD {...rest}>{children}</TD>;
};

Table.TDActions = ({children, ...rest}: any) => {
    return <TDActions {...rest}>{children}</TDActions>;
};