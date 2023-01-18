export const dateFormatter = new Intl.DateTimeFormat("en-AU", {
	day: 'numeric',
	month: 'numeric',
	year: '2-digit',
})

export const timeFormatter = new Intl.DateTimeFormat("en-AU", {
	hour: '2-digit',
	minute: '2-digit',
	hour12: false,
})

export function convertToDate(dateString: string): Date {
	return new Date(dateString);
}

export function timeOffset(now: Date, start: Date, end: Date) {
	const timeDiffStart = start.getTime() - now.getTime();
	const diffDaysStart = Math.floor(timeDiffStart / (1000 * 3600 * 24));
	const diffHoursStart = Math.floor(timeDiffStart / (1000 * 3600));
	const diffMinutesStart = Math.floor(timeDiffStart / (1000 * 60));
	const diffSecondsStart = Math.floor(timeDiffStart / 1000);
	const timeDiffEnd = end.getTime() - now.getTime();
	const diffSecondsEnd = Math.floor(timeDiffEnd / 1000);

	const updatedMeetingState = {
		meetingStatus: "Happening in",
		meetingOffset: diffDaysStart + " Days",
	};
	if ((end.getTime()-start.getTime())<0){
		throw new Error("Meeting can not end before it starts!")
	}
	if (diffSecondsStart > 0) {
		if (diffDaysStart > 730) {
			updatedMeetingState.meetingOffset = Math.floor(diffDaysStart/365) + " Years";
		}
		else if (diffDaysStart > 365) {
			updatedMeetingState.meetingOffset = Math.floor(diffDaysStart/365) + " Year";
		}
		else if (diffDaysStart > 61){
			updatedMeetingState.meetingOffset = Math.floor(diffDaysStart/30) + " Months";
		}
		else if (diffDaysStart > 30){
			updatedMeetingState.meetingOffset = Math.floor(diffDaysStart/30) + " Month";
		}
		else if (diffDaysStart > 13) {
			updatedMeetingState.meetingOffset = Math.floor(diffDaysStart/7) + " Weeks";
		}
		else if (diffDaysStart > 6) {
			updatedMeetingState.meetingOffset = "Next Week";
		}
		else if (diffDaysStart > 1) {
			updatedMeetingState.meetingOffset = diffDaysStart + " Days";
		} else if (diffDaysStart === 1) {
			updatedMeetingState.meetingOffset = diffDaysStart + " Day";
		} else if (diffDaysStart < 1) {
			updatedMeetingState.meetingOffset = diffHoursStart + " Hours";
			if (diffHoursStart === 1) {
				updatedMeetingState.meetingOffset = diffHoursStart + " Hour";
			} else if (diffHoursStart < 1) {
				updatedMeetingState.meetingOffset = diffMinutesStart + " Minutes";
				if (diffMinutesStart === 1) {
					updatedMeetingState.meetingOffset = diffMinutesStart + " Minute";
				} else if (diffMinutesStart < 1) {
					updatedMeetingState.meetingOffset = diffSecondsStart + " Seconds";
					if (diffSecondsStart === 1) {
						updatedMeetingState.meetingOffset = diffSecondsStart + " Second";
					}
				}
			}
		}
	} else if (
		(diffSecondsEnd > 0 && diffSecondsStart < 0) ||
		diffSecondsStart === 0
	) {
		updatedMeetingState.meetingStatus = "Happening";
		updatedMeetingState.meetingOffset = "Now";
	} else if (diffSecondsEnd < 0) {
		updatedMeetingState.meetingStatus = "Happened";
		updatedMeetingState.meetingOffset = "Today";
		if (diffDaysStart == -2) {
			updatedMeetingState.meetingOffset =
				Math.abs(diffDaysStart + 1) + " Day Ago";
		}
		else if (diffDaysStart < -730) {
			updatedMeetingState.meetingOffset = Math.floor(Math.abs(diffDaysStart + 1)/365) + " Years Ago";
		}
		else if (diffDaysStart < -365) {
			updatedMeetingState.meetingOffset = Math.floor(Math.abs(diffDaysStart + 1)/365) + " Year Ago";
		}
		else if (diffDaysStart < -14) {
			updatedMeetingState.meetingOffset = Math.floor(Math.abs(diffDaysStart + 1)/7) + " Weeks Ago";
		}
		else if(diffDaysStart < -7){
			updatedMeetingState.meetingOffset = "Last week";
		} 
		
		else if (diffDaysStart < -2) {
			updatedMeetingState.meetingOffset =
				Math.abs(diffDaysStart + 1) + " Days Ago";
		}
	} else {
		throw new Error("Error parsing date offset: \n"+
						"Start time: " + start +"\n"+
						"End time: " + end +"\n"+
						"Current time: " + now +"\n"+
						"Computed offsets (now-start, now-end)(seconds): " + diffSecondsStart + " " + diffSecondsEnd);
	}
	return updatedMeetingState;
}
