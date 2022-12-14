export const dateFormatter = new Intl.DateTimeFormat("en-AU", {
    day:    'numeric',
    month:  'numeric',
    year:   'numeric',
})

export const timeFormatter = new Intl.DateTimeFormat("en-AU", {
    hour:   '2-digit',
    minute: '2-digit',
})

export function convertToDate(dateString: string): Date {
    return new Date(dateString);
}

export function timeOffset(now: Date, start: Date, end: Date){
    const timeDiffStart = start.getTime() - now.getTime();
    const diffDaysStart = Math.floor(timeDiffStart / (1000 * 3600 * 24));
    const diffHoursStart = Math.floor(timeDiffStart / (1000 * 3600));
    const diffMinutesStart = Math.floor(timeDiffStart / (1000 * 60));
    const diffSecondsStart = Math.floor(timeDiffStart / (1000));
    const timeDiffEnd = end.getTime() - now.getTime();
    const diffSecondsEnd = Math.floor(timeDiffEnd / (1000));

    const updatedMeetingState = {
        meetingStatus: "Happening in",
        meetingOffset: diffDaysStart + " Days"
    }

    if (diffSecondsStart > 0) {
        if (diffDaysStart > 1) {
            updatedMeetingState.meetingOffset = diffDaysStart + " Days";
        } else if (diffDaysStart === 1) {
            updatedMeetingState.meetingOffset = diffDaysStart + " Day";
        } else if (diffDaysStart < 1) {
            updatedMeetingState.meetingOffset = diffHoursStart + " Hours";
            if(diffHoursStart === 1){
                updatedMeetingState.meetingOffset = diffHoursStart + " Hour";
            }
            else if (diffHoursStart < 1) {
                updatedMeetingState.meetingOffset = diffMinutesStart + " Minutes";
                if(diffMinutesStart === 1){
                    updatedMeetingState.meetingOffset = diffMinutesStart + " Minute";
                }
                else if (diffMinutesStart < 1) {
                    updatedMeetingState.meetingOffset = diffSecondsStart + " Seconds";
                    if(diffSecondsStart === 1){
                        updatedMeetingState.meetingOffset = diffSecondsStart + " Second";
                    }
                }
            }
        }
    } else if ((diffSecondsEnd > 0 && diffSecondsStart < 0) || diffSecondsStart === 0) {
        updatedMeetingState.meetingStatus = "Happening";
        updatedMeetingState.meetingOffset = "Now";
    } else if (diffSecondsEnd < 0) {
        updatedMeetingState.meetingStatus = "Happened";
        if (diffDaysStart == -2) {
            updatedMeetingState.meetingOffset = Math.abs(diffDaysStart + 1) + " Day Ago";
        } else {
            updatedMeetingState.meetingOffset = Math.abs(diffDaysStart + 1) + " Days Ago";
        }
    } else {
        throw new Error("Something went wrong");
    }
    return updatedMeetingState;
}
