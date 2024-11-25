import React from 'react'
import Link from 'next/link'
import useUSDate from '../../hooks/useUSDate'
import useFormatTime from '../../hooks/useFormatTime'

export default function Bid({ bid, type }) {
   const { pieceName, userName, bidAmount, bidTime } = bid
   const date = new Date(bidTime)

   const endLetter = userName.length
   const bidderDisplay = `${userName[0]}.......${userName[endLetter - 1]}`

   return (
      <div className="grid grid-cols-3">
         <div>
            {type === 'user' ? (
               <Link href={`/pieces/${bid.pieceId}`}>
                  <span>{pieceName}</span>
               </Link>
            ) : (
               <span>{bidderDisplay}</span>
            )}
         </div>
         <div>
            <span>{bidAmount}</span>
         </div>
         <div>
            <p>{useUSDate(date)}</p>
            <p>{useFormatTime(date)}</p>
         </div>
      </div>
   )
}
