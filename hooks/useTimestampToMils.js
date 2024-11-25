export default function (timestamp) {
   const timeInMils = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
   return timeInMils
}
