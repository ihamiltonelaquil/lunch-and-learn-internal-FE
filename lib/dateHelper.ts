
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