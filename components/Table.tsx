import React, { useState } from "react";
import styled from "styled-components";
import ExpandedMeetingCard from "./Cards/ExpandedMeetingCard";
import { DarkBG, RoundedButton } from "./StyleComponents/styledComponents";
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

interface MeetingData {
  authID: string;
  meetingID: string;
  topic: string;
  meetingStart: string;
  meetingEnd: string;
  creatorName: string;
  description: string;
}

const Table: React.FC<Props> = ({ data }) => {
  const [, isMobile] = useViewportWidth();
  const [expandedCardIsVisible, setExpandedCardIsVisible] = useState(false);
  const [expandedCardData, setExpandedCardData] = useState(
    data[0] as MeetingData
  );
  let options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  function toggleExpandedCard() {
    setExpandedCardIsVisible((v) => !v);
  }

  function handleOpenCard(index: number) {
    setExpandedCardData(data[index] as MeetingData);
    toggleExpandedCard();
  }

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
      <>
        {expandedCardIsVisible && (
          <>
            <ExpandedMeetingCard
              meetingData={expandedCardData}
              onClick={toggleExpandedCard}
            />
            <DarkBG
              onClick={() => {
                toggleExpandedCard();
              }}
            ></DarkBG>
          </>
        )}
        <TableContainer>
          <TableStyled style={{ width: isMobile ? "100%" : "50%" }}>
            <thead>
              <tr>
                {/* {(Object.keys(data[0]).slice(2)).map((key) => (
                  <th key={key}>{key}</th>
                ))} */}
                <th>Topic</th>
                <th>Creator</th>
                <th>Time</th>
                <th>More Information</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {/* {(Object.values(row).slice(2)).map((cell, index) => (
                    <td key={index}>{cell}</td>
                    ))} */}
                  <td key={index + " " + 0}>{Object.values(row)[5]}</td>
                  <td key={index + " " + 1}>{Object.values(row)[2]}</td>
                  <td key={index + " " + 2}>
                    {Intl.DateTimeFormat("en-AU", options).format(
                      new Date(Object.values(row)[3])
                    )}
                  </td>
                  <td key={index + " " + 3}>
                    <RoundedButton
                      width={170}
                      onClick={() => handleOpenCard(index)}
                    >
                      More Information
                    </RoundedButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableStyled>
        </TableContainer>
      </>
    );
  }
};

export default Table;
