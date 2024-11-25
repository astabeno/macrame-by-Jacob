export default function useUSDate(date) {
   const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
   ]

   const year = date.getUTCFullYear()
   const month = months[date.getMonth()]
   const day = date.getUTCDate()

   return month + ' ' + day + ', ' + year
}
