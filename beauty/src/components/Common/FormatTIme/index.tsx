export const formatTime = (hour: number, minute: number): string => {
  const suffix = hour >= 12 ? 'PM' : 'AM';
  let adjustedHour = hour % 12;
  if (adjustedHour === 0) adjustedHour = 12;

  const paddedHour = adjustedHour < 10 ? `0${adjustedHour}` : `${adjustedHour}`;
  const paddedMinute = minute < 10 ? `0${minute}` : `${minute}`;

  return `${paddedHour}:${paddedMinute} ${suffix}`;
};