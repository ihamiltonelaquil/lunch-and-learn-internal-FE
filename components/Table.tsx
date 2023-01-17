import React from "react";
import styled from "styled-components";
import { useViewportWidth } from "./Utils/useViewportWidth";

interface Props {
  data: { [key: string]: any }[];
}

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const TableStyled = styled.table`
  border-collapse: collapse;
`;

const TableError = styled.h2`
  margin-top: 15px;
`;

const TableErrorSmaller = styled.h5`
  margin-bottom: 15px;
`;

const TableErrorContainer = styled.h5`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: red;
`;

const Table: React.FC<Props> = ({ data }) => {
  const [, isMobile] = useViewportWidth();
  if (data.keys == undefined) {
    return (
      <TableErrorContainer>
        <TableError>Error 404</TableError>
        <TableErrorSmaller>Cannot find</TableErrorSmaller>
      </TableErrorContainer>
    );
  } else if (data.length === 0) {
    return (
      <TableErrorContainer>
        <TableError>Error</TableError>
        <TableErrorSmaller>No data found</TableErrorSmaller>
      </TableErrorContainer>
    );
  } else {
    return (
      <TableContainer>
        <TableStyled style={{ width: isMobile ? "100%" : "50%" }}>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </TableStyled>
      </TableContainer>
    );
  }
};

export default Table;
