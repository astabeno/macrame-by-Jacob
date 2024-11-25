import PieceBidImage from './PieceBidImage'
import BidForm from './BidForm'

import useActionActive from '../../hooks/useActionActive'

import { Cinzel_Decorative } from 'next/font/google'

const titleFont = Cinzel_Decorative({
   weight: '400',
   subsets: ['latin'],
})

export default function Piece({ piece }) {
   const { auctionEnd } = piece

   const auctionActive = useActionActive(auctionEnd)

   return (
      <div
         className=" mx-auto mb-5 flex w-full flex-col overflow-hidden
                     rounded-lg bg-white shadow-2xl sm:max-w-lg  sm:flex-col 
                     md:max-w-2xl md:flex-row lg:max-w-3xl lg:flex-row xl:flex-row">
         <div className="xl:6/12  md:w-6/12 lg:w-6/12">
            <PieceBidImage piece={piece} auctionActive={auctionActive} />
         </div>
         <div className="xl:6/12 p-8  md:w-6/12 lg:w-6/12">
            <h1
               className={`${titleFont.className} w-full text-center text-2xl`}>
               {piece.name}
            </h1>
            <BidForm piece={piece} auctionActive={auctionActive} />
         </div>
      </div>
   )
}
