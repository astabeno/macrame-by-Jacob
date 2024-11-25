import React from 'react'

import DateTimeDisplay from './DateTimeDisplay'

export default function ShowCounter({ days, hours, minutes, seconds, large }) {
   const largeClassNames =
      'items-center justify-center rounded-md text-lg font-bold leading-7'

   return (
      <div>
         <div
            className={`flex space-x-5 py-1  ${large ? largeClassNames : ''}`}>
            {days > 0 ? (
               <>
                  <DateTimeDisplay
                     value={days}
                     type={'Day'}
                     isDanger={days <= 3}
                  />
                  <DateTimeDisplay
                     value={hours}
                     type={'Hour'}
                     isDanger={days <= 3}
                  />
                  <DateTimeDisplay
                     value={minutes}
                     type={'Minutes'}
                     isDanger={days <= 3}
                  />
               </>
            ) : (
               <>
                  <DateTimeDisplay
                     value={hours}
                     type={'Hour'}
                     isDanger={days <= 3}
                  />
                  <DateTimeDisplay
                     value={minutes}
                     type={'Minutes'}
                     isDanger={days <= 3}
                  />
                  <DateTimeDisplay
                     value={seconds}
                     type={'Seconds'}
                     isDanger={days <= 3}
                  />
               </>
            )}
         </div>
      </div>
   )
}
