import PieceBidGrid from '../../../components/piece/PieceBidGrid'
import { getPieceBids } from '../../../utils/firebase.utils'

import React from 'react'

export default function Bids({ bids }) {
   const pieceName = bids[0].pieceName
   return (
      <div className="my-6 mx-auto w-11/12 rounded-2xl bg-white p-8 shadow-lg">
         <h1 className="mb-7 border-b-2 pb-2 text-center text-3xl font-extrabold">
            Bids for {pieceName}
         </h1>
         <PieceBidGrid bids={bids} />
      </div>
   )
}
export async function getServerSideProps(context) {
   const pieceBids = await getPieceBids(context.params.id)

   const bids = pieceBids.map((bid) => ({
      ...bid,
      bidTime: bid.bidTime.toMillis(),
   }))

   return { props: { bids: bids } }
}
