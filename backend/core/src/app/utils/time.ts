export const TIME_SECOND = 1_000;
export const TIME_MINUTE = 60 * TIME_SECOND;
export const TIME_HOUR = 60 * TIME_MINUTE;

export function milliseconds(milliseconds: number) {
    return milliseconds
}
export function seconds(seconds: number) {
    return TIME_SECOND * seconds
}
export function minutes(minutes: number) {
    return seconds(60) * minutes
}
export function hours(hours: number) {
    return minutes(60) * hours
}
