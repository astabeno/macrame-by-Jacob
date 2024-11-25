import { useState, useEffect } from 'react'

const useTimestampToDateTime = (timestamp) => {
   const [formattedDateTime, setFormattedDateTime] = useState('')

   useEffect(() => {
      const convertTimestampToDateTime = () => {
         if (
            timestamp &&
            typeof timestamp.seconds === 'number' &&
            typeof timestamp.nanoseconds === 'number'
         ) {
            const seconds = timestamp.seconds
            const milliseconds =
               seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000) // Convert nanoseconds to milliseconds
            const date = new Date(milliseconds)
            const year = date.getFullYear()
            const month = ('0' + (date.getMonth() + 1)).slice(-2)
            const day = ('0' + date.getDate()).slice(-2)
            const hour = ('0' + date.getHours()).slice(-2)
            const minute = ('0' + date.getMinutes()).slice(-2)
            const formattedDateTime = `${year}-${month}-${day}T${hour}:${minute}`
            setFormattedDateTime(formattedDateTime)
         } else {
            setFormattedDateTime('')
         }
      }

      convertTimestampToDateTime()
   }, [timestamp])

   return formattedDateTime
}

export default useTimestampToDateTime
