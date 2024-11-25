import React from 'react'

export default function DateTimeDisplay({ value, type, isDanger }) {
   let twStyles
   if (!isDanger) {
      twStyles =
         'countdown w-10 h-10 text-black rounded bg-blue-500 items-center flex flex-auto'
   } else {
      twStyles =
         'countdown p-2 bg-black rounded-lg text-yellow-300 items-center flex flex-auto text-red-600'
   }

   return (
      <div className="m-1 flex flex-col">
         <span
            className="leading-non text-center text-xs uppercase"
            style={{ fontSize: 10 }}>
            {type}
         </span>
         <div className={twStyles}>
            <p className="mx-auto">{value}</p>
         </div>
      </div>
   )
}
