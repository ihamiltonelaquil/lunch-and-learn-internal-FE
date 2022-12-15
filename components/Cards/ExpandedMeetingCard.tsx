import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { convertToDate, dateFormatter, timeFormatter, timeOffset } from '../../lib/dateHelper';
import AttachmentsList from '../AttachmentsList';
import { StyledExpandedMeetingCard, StyledMeetingCardButton } from '../styledComponents'

interface MeetingData {
    meetingID: number;
    topic: string;
    meetingStart: string;
    meetingEnd: string;
    creatorName: string;
    description: string;
}

const ExpandedMeetingCard: React.FC<{ meetingData: MeetingData, onClick: Dispatch<SetStateAction<boolean>> }> = ({ meetingData, onClick }) => {
    
    const { meetingID, topic, meetingStart, meetingEnd, creatorName, description } =
    meetingData;

    const handleOnClick = useCallback((event: any) => {
        onClick(event.target.value)
    }, [onClick])

    const start = convertToDate(meetingStart);
    const end = convertToDate(meetingEnd);
    var now = new Date();

    const [meetingState, setMeetingState] = useState({
        meetingStatus: timeOffset(now, start, end).meetingStatus,
        meetingOffset: timeOffset(now, start, end).meetingOffset
    });

    useEffect(() => {
        setTimeout(() => {
            now = new Date();
            var updatedMeetingState = timeOffset(now, start, end);
            setMeetingState(updatedMeetingState);
        }, 1000);
    }, [meetingState]);
    
    return (
        <StyledExpandedMeetingCard>
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
                    <br></br>
                    <p>{description}</p>
                    <br></br>
                    <AttachmentsList/>
            </div>
            <span className="buttons row justify-content-center">
                <StyledMeetingCardButton onClick={handleOnClick}>
                    Close
                </StyledMeetingCardButton>

            </span>
        </StyledExpandedMeetingCard>
    )
}

export default ExpandedMeetingCard