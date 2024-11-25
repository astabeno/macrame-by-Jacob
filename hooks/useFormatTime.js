export default function useFormatTime(date) {
   const hour24 = date.getHours()
   const minute = date.getMinutes().toString().padStart(2, '0')
   const seconds = date.getSeconds().toString().padStart(2, '0')
   const ampm = hour24 >= 12 ? 'pm' : 'am'
   let hour12 = hour24 % 12
   hour12 = hour12 ? hour12 : 12
   return hour12 + ':' + minute + '.' + seconds + ' ' + ampm
}
