import React from 'react'
import { useCountdown } from '../../hooks/useCountdown'
import useUSDate from '../../hooks/useUSDate'
import useFormatTime from '../../hooks/useFormatTime'

import ExpiredNotice from './ExpiredNotice'
import ShowCounter from './ShowCounter'

export default function CountdownTimer({ targetDate, large }) {
   const [days, hours, minutes, seconds] = useCountdown(targetDate)
   const dateDisplay = useUSDate(new Date(targetDate))
   const timeDisplay = useFormatTime(new Date(targetDate))

   if (days + hours + minutes + seconds <= 0) {
      return <ExpiredNotice large={large} />
   }
   return (
      <>
         <p className="text-lg">{`${dateDisplay} ${timeDisplay}`}</p>
         <ShowCounter
            large={large}
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
         />
      </>
   )
}
