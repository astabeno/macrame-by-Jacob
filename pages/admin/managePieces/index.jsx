import { useState, useEffect } from 'react'

import PieceGrid from '../../../components/managePieces/pieceGrid'
import { getPiecesCollection } from '../../../utils/firebase.utils'

export default function ManagePiecesPage() {
   const [pieces, setPieces] = useState([])

   useEffect(() => {
      const getPieces = async () => {
         const piecesCollection = await getPiecesCollection()
         setPieces(piecesCollection)
      }
      getPieces()
   }, [])


   return (
      <div className="h-screen w-screen">
         {pieces.length > 0 && <PieceGrid pieces={pieces} />}
      </div>
   )
}
