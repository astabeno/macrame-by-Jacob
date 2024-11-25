import React from 'react'
import Image from 'next/image'
import CountdownTimer from '../countdown/CountdownTimer'

import useTimestampToMils from '../../hooks/useTimestampToMils'

export default function PieceBidImage({ piece, auctionActive }) {
   const { auctionEnd, highestBid, url, name } = piece

   const auctionEndFormatted = useTimestampToMils(auctionEnd)

   return (
      <div className="relative">
         {auctionActive ? (
            <div
               className="bg-stone-500 relative w-auto bg-gray-600 
                            p-2 text-center text-2xl text-white">
               <CountdownTimer targetDate={auctionEndFormatted} large />
            </div>
         ) : (
            <div className="bg-stone-500 relative p-2 text-center text-3xl font-extrabold text-white">
               Piece Sold for ${highestBid}
            </div>
         )}
         <Image
            src={url}
            width={400}
            height={400}
            alt={name}
            className="mx-auto"
         />
      </div>
   )
}
