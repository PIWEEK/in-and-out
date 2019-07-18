export default function (value) {
  let hourString
  if (value instanceof Date) {
    hourString = value.toLocaleTimeString(
      navigator.language,
      { hour: '2-digit', minute: '2-digit' }
    )
  }
  return hourString
}
