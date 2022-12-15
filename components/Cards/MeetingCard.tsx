import {
    convertToDate,
    dateFormatter,
    timeFormatter,
    timeOffset,
} from "../../lib/dateHelper";
import React, { useState, useEffect } from "react";
import { StyledCard, StyledMeetingCardButton, DarkBG } from "../styledComponents";
import ExpandedMeetingCard from "./ExpandedMeetingCard";
import { animated, useTransition, easings } from "@react-spring/web";

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

    const [expandedCardIsVisible, setExpandedCardIsVisible] = useState(false);

    function toggleExpandedCard(){
        setExpandedCardIsVisible(v => !v)
    }

    const transition = useTransition(expandedCardIsVisible, {
        config: {duration:100, easing: easings.easeOutCubic},
        from: {
            y:0, opacity:0, duration: 5000,
        },
        enter: {
            y:0, opacity:1, duration: 5000,
        },
        leave: {
            y:0, opacity:0, duration: 5000,
        },
    });

    useEffect(() => {
        setTimeout(() => {
            now = new Date();
            var updatedMeetingState = timeOffset(now, start, end);
            setMeetingState(updatedMeetingState);
        }, 1000);
    }, [meetingState]);

    return (
        <>
        
            {/* {expandedCardIsVisible &&
                <>
                    <ExpandedMeetingCard meetingData={meetingData} onClick={toggleExpandedCard} />
                    <DarkBG onClick={() => {
                        toggleExpandedCard();
                    }}>
                    </DarkBG>
                </>
            } */}

            {transition((style, item) => 
            item &&
                <>
                    <animated.div style={style}>
                        <ExpandedMeetingCard meetingData={meetingData} onClick={toggleExpandedCard} />  
                        <DarkBG onClick={() => {
                            toggleExpandedCard();
                        }}>
                            </DarkBG>
                    </animated.div>
                </>
            )};
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
                    <StyledMeetingCardButton onClick={() => {
                        toggleExpandedCard();
                    }}>More Information</StyledMeetingCardButton>
                </span>
            </StyledCard>
        </>
    )
};

export default MainCard;
