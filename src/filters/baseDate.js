export default function (value) {
  let dateString
  if (value instanceof Date) {
    dateString = value.toLocaleDateString(
      navigator.language,
      { day: '2-digit', month: '2-digit', year: 'numeric' }
    )
  }
  return dateString
}
