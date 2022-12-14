import MeetingCard from "../components/Cards/MeetingCard";

export default function cardTest(){
    const data = {
        meetingID: 1,
        topic: "TailWind CSS",
        meetingStart: "2022-12-11T10:57:00",
        meetingEnd: "2022-12-11T13:00:00",
        creatorName: "Parthay Bhatt",
        description: "Test Description"
    }
    
    return(
        <MeetingCard meetingData={data} />
    )
}