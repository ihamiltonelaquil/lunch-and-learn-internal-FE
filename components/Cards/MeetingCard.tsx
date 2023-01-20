import {
  convertToDate,
  dateFormatter,
  timeFormatter,
  timeOffset,
} from "../../lib/dateHelper";
import React, {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { StyledCard, StyledMeetingCardButton } from "../styledComponents";
import { useUser } from "@auth0/nextjs-auth0/client";
import UpdateMeeting from "../UpdateMeeting";

interface MeetingData {
  authID: string;
  meetingID: string;
  topic: string;
  meetingStart: string;
  meetingEnd: string;
  creatorName: string;
  description: string;
}

const MainCard: React.FC<{
  meetingData: MeetingData;
  toggleCard: Dispatch<SetStateAction<boolean>>;
}> = ({ meetingData, toggleCard }) => {
  const { authID, meetingID, topic, meetingStart, meetingEnd, creatorName } =
    meetingData;

  const { user } = useUser();
  const [authIDMatches, setAuthIdMatches] = useState(false);
  const start = convertToDate(meetingStart);
  const end = convertToDate(meetingEnd);
  var now = new Date();
  const [editing, setEditing] = useState(false);

  const [meetingState, setMeetingState] = useState({
    meetingStatus: timeOffset(now, start, end).meetingStatus,
    meetingOffset: timeOffset(now, start, end).meetingOffset,
  });

  function toggleEditing() {
    setEditing((v) => !v);
  }

  const handleOpenCard = useCallback(
    (event: any) => {
      toggleCard(event.target.value);
    },
    [toggleCard]
  );

  useEffect(() => {
    if (authID === user?.sub) {
      setAuthIdMatches(true);
    }
  }, [authID, user?.sub, authIDMatches]);

  useEffect(() => {
    setTimeout(() => {
      now = new Date();
      var updatedMeetingState = timeOffset(now, start, end);
      setMeetingState(updatedMeetingState);
    }, 1000);
  }, [meetingState]);

  return (
    <>
      {editing ? (
        <UpdateMeeting
        meetingID={meetingData.meetingID}
        authID={meetingData.authID}
        currentName={meetingData.creatorName}
        currentDesc={meetingData.description}
        currentTopic={meetingData.topic}
        currentStart={meetingData.meetingStart}
        currentEnd={meetingData.meetingEnd}
        toggleOpen={toggleEditing}
        />
      ) : (
        <StyledCard>
          <div className="mainContent">
            <h1>{topic}</h1>
            <p>Presented by</p>
            <h3>{creatorName}</h3>
            <p>{meetingState.meetingStatus}</p>
            <h3>{meetingState.meetingOffset}</h3>
            <p>at</p>
            <h3>
              {timeFormatter.format(convertToDate(meetingStart)) +
                "-" +
                timeFormatter.format(convertToDate(meetingEnd)) +
                " " +
                dateFormatter.format(convertToDate(meetingStart))}
            </h3>
          </div>
          <span className="buttons row justify-content-center">
            {authIDMatches ? (
              <StyledMeetingCardButton onClick={() => setEditing(true)}>
                Edit Details
              </StyledMeetingCardButton>
            ) : (
              ""
            )}
            <StyledMeetingCardButton onClick={handleOpenCard}>
              More Information
            </StyledMeetingCardButton>
          </span>
        </StyledCard>
      )}
    </>
  );
};

export default MainCard;
