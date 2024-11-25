import React from 'react'

export default function ExpiredNotice({ large }) {
   const largeClasses =
      'block text-lg font-bold rounded-md border border-gray-300 p-2 text-center'
   return (
      <div className={large ? largeClasses : ''}>
         <span className=" text-red-500">Auction Finished</span>
         {large ? <p className="">Check out our other pieces</p> : <></>}
      </div>
   )
}
