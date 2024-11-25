import PieceThumb from '../components/piece/PieceThumb'
import { getPiecesCollection } from '../utils/firebase.utils'

export default function Gallery({ pieces }) {
   return (
      <div className="flex flex-wrap">
         {pieces.map((piece) => {
            const pieceFormatted = {
               ...piece,
               auctionEnd: new Date(piece.auctionEnd),
            }
            return <PieceThumb piece={pieceFormatted} key={piece.id} />
         })}
      </div>
   )
}

export async function getStaticProps(context) {
   const piecesCollection = await getPiecesCollection()
   const pieces = piecesCollection.map((piece) => {
      if (!piece.dateUpdated) {
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
