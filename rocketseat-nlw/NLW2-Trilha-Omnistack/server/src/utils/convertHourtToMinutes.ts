export function convertTimeToMinutes(time: string) {
  const [hour, minute] = time.split(":").map((item) => parseInt(item));

  return hour * 60 + minute;
}
