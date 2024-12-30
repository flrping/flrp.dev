export function formatDateTime(dateString: string) {
    const date = new Date(dateString);
    return {
        date: date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC',
        }),
        time: date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            timeZone: 'UTC',
        }),
        isoString: date.toISOString(),
    };
}

export function parseAndNormalizeDate(dateString: string): Date {
    const date = new Date(dateString);
    if (!dateString.endsWith('Z') && !dateString.includes('+')) {
        return new Date(Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        ));
    }
    return date;
}

export function formatDateForPath(date: Date): string {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hour = String(date.getUTCHours()).padStart(2, '0');
    const minute = String(date.getUTCMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}_${hour}-${minute}`;
}