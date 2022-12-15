import MeetingCard from "../components/Cards/MeetingCard";

export default function cardTest() {
  const data = {
    meetingID: 1,
    topic: "TailWind CSS",
    meetingStart: "2022-12-15T11:26:31.0852618",
    meetingEnd: "2022-12-15T11:26:31.0852618",
    creatorName: "Parthay Bhatt",
    description: "Test Description",
  };

  return <MeetingCard meetingData={data} />;
}
