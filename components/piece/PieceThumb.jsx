import Image from 'next/image'
import Link from 'next/link'
import CountdownTimer from '../../components/countdown/CountdownTimer'

import { Cinzel_Decorative } from 'next/font/google'

const titleFont = Cinzel_Decorative({
   weight: '400',
   subsets: ['latin'],
})

const imageLoader = ({ src, width, quality }) => {
   return `${src}?w=${width}&q=${quality || 75}`
 }

export default function PieceThumb({ piece, showCounter }) {
   return (
      <Link href={`/pieces/${piece.id}`}>
         {showCounter ? <CountdownTimer /> : <></>}
         <div
            className="group m-5 overflow-hidden rounded-xl border
                       border-transparent shadow-lg duration-500 ease-in-out hover:scale-110">
            <div className="relative">
               <Image
                  loader={imageLoader}
                  src={piece.url}
                  alt={piece.name}
                  height={250}
                  width={250}
               />
            </div>
            <div
               className={`${titleFont.className} name-banner h-10 bg-gray-800 pt-2 
                          text-center text-white opacity-70 
                          transition-opacity duration-500 ease-in-out 
                          group-hover:opacity-100`}>
               {piece.name}
            </div>
         </div>
      </Link>
   )
}
