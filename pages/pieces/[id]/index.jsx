import { getPiecesCollection, getPiece } from '../../../utils/firebase.utils'
import SuperJSON from 'superjson'

import Piece from '../../../components/piece/Piece'

export default function PieceInfo({ pieceString }) {
   const piece = SuperJSON.parse(pieceString)
   return (
      <div className="centered">
         <Piece piece={piece} />
      </div>
   )
}

export async function getStaticPaths() {
   const pieces = await getPiecesCollection()

   const paths = pieces.map((piece) => ({
      params: { id: piece.id },
   }))

   return {
      paths,
      fallback: 'blocking',
   }
}

export async function getStaticProps(context) {
   const pieceRaw = await getPiece(context.params.id)

   const pieceString = SuperJSON.stringify(pieceRaw)

   return { props: { pieceString }, revalidate: 10 }
}
