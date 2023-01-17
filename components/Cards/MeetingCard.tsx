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
import {
  StyledCard,
  StyledMeetingCardButton,
  DarkBG,
} from "../styledComponents";
import ExpandedMeetingCard from "./ExpandedMeetingCard";

interface MeetingData {
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
  const { meetingID, topic, meetingStart, meetingEnd, creatorName } =
    meetingData;

  const start = convertToDate(meetingStart);
  const end = convertToDate(meetingEnd);
  var now = new Date();

  const [meetingState, setMeetingState] = useState({
    meetingStatus: timeOffset(now, start, end).meetingStatus,
    meetingOffset: timeOffset(now, start, end).meetingOffset,
  });

  const handleOpenCard = useCallback(
    (event: any) => {
      toggleCard(event.target.value);
    },
    [toggleCard]
  );

  useEffect(() => {
    setTimeout(() => {
      now = new Date();
      var updatedMeetingState = timeOffset(now, start, end);
      setMeetingState(updatedMeetingState);
    }, 1000);
  }, [meetingState]);

  return (
    <StyledCard
      key={meetingID}
      // className="deactivatedCardElement"
    >
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
        <StyledMeetingCardButton
        // className="deactivatedCardElement"
        >
          Leave a question for {creatorName.split(" ")[0]}
        </StyledMeetingCardButton>
        <StyledMeetingCardButton
          // className="deactivatedCardElement"
          onClick={handleOpenCard}
        >
          More Information
        </StyledMeetingCardButton>
      </span>
    </StyledCard>
  );
};

export default MainCard;
