export default function (value) {
  const totalSeconds = value / 1000
  const hours = Math.floor(totalSeconds / 3600)
  const remainder = totalSeconds % 3600
  const minutes = Math.floor(remainder / 60)
  const remainder2 = remainder % 60
  const seconds = Math.floor(remainder2)
  return `${hours}:${minutes}:${seconds}`
}
