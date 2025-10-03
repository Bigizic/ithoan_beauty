export const DurationTime = (duration: number) => {
  const minutesInHour = 60
  const minutesInDay = 1440 // 24 * 60

  const days = Math.floor(duration / minutesInDay)
  const hours = Math.floor((duration % minutesInDay) / minutesInHour)
  const minutes = duration % minutesInHour

  const parts: string[] = []
  if (days > 0) parts.push(`${days} ${days === 1 ? 'day' : 'days'}`)
  if (hours > 0) parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`)
  if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`)

  // if duration is exactly 0
  if (parts.length === 0) parts.push('0 mins')

  return <span>{parts.join(' and ')}</span>
}
