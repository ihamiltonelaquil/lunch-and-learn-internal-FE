
export const dateFormatter = new Intl.DateTimeFormat("en-AU", {
    day:    'numeric',
    month:  'numeric',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
})

export function convertToDate(dateString: string): Date {
    return new Date(dateString);
}