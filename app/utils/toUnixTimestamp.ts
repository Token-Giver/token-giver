function toUnixTimestamp(
  year: number,
  month: number,
  day: number,
  hour: number = 0,
  minute: number = 0,
  second: number = 0,
  timezoneOffset: number = 0
): number {
  const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second)); // js Data months are 0-indexed, so i substract 1 from the provided month

  const adjustedTime = date.getTime() - timezoneOffset * 60 * 1000; //convert hours to minutes

  return Math.floor(adjustedTime / 1000);
}

// Convert 2024-12-12 15:30:00 UTC+2 (timezone offset is -110 minutes)
// const timestamp = toUnixTimestamp(2024, 12, 12, 15, 30, 0, -110);
// console.log(timestamp);