import { convertToDate, dateFormatter, timeFormatter } from "../../lib/dateHelper";

interface MeetingData {
    meetingID: number;
    topic: string;
    meetingStart: string;
    meetingEnd: string;
    creatorName: string;
    description: string;
}

const MainCard: React.FC<{ meetingData: MeetingData }> = ({ meetingData }) => {
    const { meetingID, topic, meetingStart, meetingEnd, creatorName } = meetingData;

    const now = new Date();
    console.log(now.getTime());
    console.log(convertToDate(meetingEnd).getTime());
    var timeDiff = ((convertToDate(meetingStart)).getTime() - now.getTime());
    const diffDaysStart = Math.floor(timeDiff / (1000 * 3600 * 24));
    const diffHoursStart = Math.floor(timeDiff / (1000 * 3600));
    const diffMinutesStart = Math.floor(timeDiff / (1000 * 60));
    const diffSecondsStart = Math.floor(timeDiff / (1000));
    timeDiff = ((convertToDate(meetingEnd)).getTime() - now.getTime());
    const diffSecondsEnd = Math.floor(timeDiff / (1000))

    const meetingState = {
        meetingStatus: "Happening in",
        meetingOffset: diffDaysStart + " Days"
    }

    console.log(diffSecondsStart)
    console.log(diffSecondsEnd + " " + diffSecondsStart);

    if(diffSecondsStart > 0){
        if (diffDaysStart > 1) {
            meetingState.meetingOffset = diffDaysStart + " Days";
        } else if (diffDaysStart === 1) {
            meetingState.meetingOffset = diffDaysStart + " Day";
        } else if (diffDaysStart < 1) {
            meetingState.meetingOffset = diffHoursStart + " Hours";
            if (diffHoursStart < 1) {
                meetingState.meetingOffset = diffMinutesStart + " Minutes";
                if (diffMinutesStart < 1) {
                    meetingState.meetingOffset = diffSecondsStart + " Seconds";
                }
            }
        }
    }
    else if(diffSecondsEnd > 0 && diffSecondsStart < 0){
        meetingState.meetingStatus = "Happening";
        meetingState.meetingOffset = "Now";
    }
    else{
        meetingState.meetingStatus = "Happened";
        meetingState.meetingOffset = "Today";
        if(diffDaysStart == -2){
            meetingState.meetingOffset = Math.abs(diffDaysStart+1) + " Day Ago";
        }
        else if(diffDaysStart < -2){
            meetingState.meetingOffset = Math.abs(diffDaysStart+1) + " Days Ago";
        }
    }



    return (
        <div key={meetingID}>
            <div className="mainContent">
                <h1><strong>{topic}</strong></h1>
                <p>Presented by</p>
                <h3>{creatorName}</h3>
                <br></br>
                
                <p>{meetingState.meetingStatus}</p>
                <h3>{meetingState.meetingOffset}</h3>
                
                <p>at</p>
                <h3>
                    {
                    (timeFormatter.format(convertToDate(meetingStart)))+"-"
                    +(timeFormatter.format(convertToDate(meetingEnd)))+" "
                    +(dateFormatter.format(convertToDate(meetingStart)))
                    }
                </h3>
            </div>
            <div className="buttons">
                <button>Leave a question for Parthay</button>
                <button>More Information</button>
            </div>
        </div>
    )
};

export default MainCard;