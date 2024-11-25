import { Cinzel_Decorative } from 'next/font/google'
import { getPiecesCollection } from '../utils/firebase.utils'

import Carousel from '../components/carousel/Carousel'

const titleFont = Cinzel_Decorative({
   weight: '400',
   subsets: ['latin'],
})

export default function Home({ pieces }) {
   return (
      <>
         <div className="site-title">
            <h1 className={titleFont.className}>Middle East Macrame</h1>
         </div>
         <section>
            <Carousel pieces={pieces} />
         </section>
      </>
   )
}

export async function getStaticProps() {
   const piecesCollection = await getPiecesCollection()
   const pieces = piecesCollection.map((piece) => {
      if (!('dateUpdated' in piece)) {
         return {
            ...piece,
            auctionEnd: piece.auctionEnd.toMillis(),
            dateAdded: piece.dateAdded.toMillis(),
         }
      }
      return {
         ...piece,
         auctionEnd: piece.auctionEnd.toMillis(),
         dateAdded: piece.dateAdded.toMillis(),
         dateUpdated: piece.dateUpdated?.toMillis(),
      }
   })

   return {
      props: {
         pieces,
      },
      revalidate: 10,
   }
}
