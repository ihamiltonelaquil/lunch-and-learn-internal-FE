import MeetingCard from "../components/Cards/MeetingCard";

export default function cardTest(){
    const data = {
        meetingID: 1,
        topic: "TailWind CSS",
        meetingStart: "2022-12-13T14:00:00",
        meetingEnd: "2022-12-13T16:00:00",
        creatorName: "Parthey Bhatt",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
    
    return(
        <>
            <br></br>
            <MeetingCard meetingData={data} />
            <script> </script>
        </>
    )
}
