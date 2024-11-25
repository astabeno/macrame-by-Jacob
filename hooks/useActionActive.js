import { useEffect, useState } from 'react'

export default function useAuctionActive(auctionEnd) {
   const targetTimeMils =
      auctionEnd.seconds * 1000 + auctionEnd.nanoseconds / 1000000

   const [isActive, setIsActive] = useState(
      new Date(targetTimeMils) > new Date()
   )

   useEffect(() => {
      const intervalId = setInterval(() => {
         if (new Date(targetTimeMils) < new Date()) {
            setIsActive(false)
         } else {
            setIsActive(true)
         }
      }, 1000)

      return () => clearInterval(intervalId)
   }, [targetTimeMils])

   return isActive
}
