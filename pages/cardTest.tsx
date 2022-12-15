import MeetingCard from "../components/Cards/MeetingCard";

export default function cardTest(){
    const data = {
        meetingID: 1,
        topic: "TailWind CSS",
        meetingStart: "2022-12-13T14:00:00",
        meetingEnd: "2022-12-13T16:00:00",
        creatorName: "Parthey Bhatt",
        description: "Test Description"
    }
    
    return(
        <>
            <MeetingCard meetingData={data} />
            <script> </script>
        </>
    )
}
