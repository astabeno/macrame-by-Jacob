import { useEffect, useState } from 'react'

import useTimestampToDateTime from '../../../hooks/useTimestampToDateTime'
import { getPiece } from '../../../utils/firebase.utils'
import ManagePiece from '../../../components/admin/ManagePiece'

export default function ManagePiecePage({ id }) {
   const [piece, setPiece] = useState(null)
   const dateTime = useTimestampToDateTime(piece?.auctionEnd) // Call hook conditionally

   useEffect(() => {
      const findPiece = async () => {
         const foundPiece = await getPiece(id)
         setPiece(foundPiece)
      }
      findPiece()
   }, [id])
   let formattedPiece = null
   if (dateTime && piece) {
      formattedPiece = { ...piece, auctionEnd: dateTime }
   }

   return (
      <>
         {formattedPiece !== null ? (
            <ManagePiece piece={{ ...formattedPiece }} />
         ) : (
            // Render a placeholder or loading indicator while `piece` is `null`
            <p>Loading...</p>
         )}
      </>
   )
}

export async function getServerSideProps(context) {
   const { id } = context.params
   return {
      props: {
         id,
      },
   }
}
