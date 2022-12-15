import {
  convertToDate,
  dateFormatter,
  timeFormatter,
  timeOffset,
} from "../../lib/dateHelper";
import React, { useState, useEffect } from "react";
import { StyledCard, StyledMeetingCardButton, DarkBG } from "../styledComponents";
import ExpandedMeetingCard from "./ExpandedMeetingCard";

interface MeetingData {
  meetingID: number;
  topic: string;
  meetingStart: string;
  meetingEnd: string;
  creatorName: string;
  description: string;
}

const MainCard: React.FC<{ meetingData: MeetingData }> = ({ meetingData }) => {
  const { meetingID, topic, meetingStart, meetingEnd, creatorName } =
    meetingData;

  const start = convertToDate(meetingStart);
  const end = convertToDate(meetingEnd);
  var now = new Date();

    const [meetingState, setMeetingState] = useState({
        meetingStatus: timeOffset(now, start, end).meetingStatus,
        meetingOffset: timeOffset(now, start, end).meetingOffset
    });

    const [expandedCardIsVisible, setExpandedCardIsVisible]= useState(false);


    useEffect(() => {
        setTimeout(() => {
            now = new Date();
            var updatedMeetingState = timeOffset(now, start, end);
            setMeetingState(updatedMeetingState);
        }, 1000);
    }, [meetingState]);

    return (
        <>
            {expandedCardIsVisible && 
            <>
                <ExpandedMeetingCard />
                <DarkBG onClick={() =>{
                        setExpandedCardIsVisible(v => !v)
                    }}>
                </DarkBG>
            </>
            }
            <StyledCard key={meetingID}>
                <div className="mainContent">
                    <h1>{topic}</h1>
                    <p>Presented by</p>
                    <h3>{creatorName}</h3>

                    <p>{meetingState.meetingStatus}</p>
                    <h3>{meetingState.meetingOffset}</h3>

                    <p>at</p>
                    <h3>
                        {
                            (timeFormatter.format(convertToDate(meetingStart))) + "-"
                            + (timeFormatter.format(convertToDate(meetingEnd))) + " "
                            + (dateFormatter.format(convertToDate(meetingStart)))
                        }
                    </h3>
                </div>
                <span className="buttons row justify-content-center">
                    <StyledMeetingCardButton>Leave a question for {creatorName.split(' ')[0]}</StyledMeetingCardButton>
                    <StyledMeetingCardButton onClick={() =>{
                        setExpandedCardIsVisible(v => !v)
                    }}>More Information</StyledMeetingCardButton>
                </span>
            </StyledCard>
        </>
    )
};

export default MainCard;
