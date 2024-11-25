import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import CountdownTimer from '../countdown/CountdownTimer'

export default function PieceGrid({ pieces }) {
   const router = useRouter()

   function selectHandler(id) {
      router.push(`/admin/managePieces/${id}`)
   }

   const imageLoader = ({ src, width, quality }) => {
      return `${src}?w=${width}&q=${quality || 75}`
    }

   return (
      <div className="m-5 rounded-xl bg-white p-5 shadow-lg">
         <div className="mb-3 text-center text-4xl">
            <h1>Piece Manager</h1>
         </div>
         <hr />
         <div className="m-5 space-y-2">
            {pieces.map((piece) => {
               const { name, auctionEnd, url, id } = piece

               const targetTimeMils =
                  auctionEnd.seconds * 1000 + auctionEnd.nanoseconds / 1000000
               return (
                  <>
                     <div
                        className="bg-slate-100 grid h-20 grid-cols-4 border-b shadow-sm
                                    hover:-translate-x-1 hover:-translate-y-1 hover:shadow-lg"
                        onClick={() => {
                           selectHandler(id)
                        }}>
                        <div>
                           <Image loader={imageLoader} src={url} width={50} height={50} />
                        </div>
                        <div>{name}</div>
                        <div>
                           <CountdownTimer targetDate={targetTimeMils} />
                        </div>
                     </div>
                  </>
               )
            })}
         </div>
      </div>
   )
}
