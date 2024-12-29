export function formatDateTime(date: Date) {
    return {
        date: date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'America/New_York',
        }),
        time: date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            timeZone: 'America/New_York',
        }),
        isoString: date.toISOString(),
    };
}
