import { placeBid, getPiece } from '../../../../utils/firebase.utils'
import firebaseAdmin from '../../../../utils/firbase.admin'

export default async function handler(req, res) {
   const authToken = req.headers.authorization?.split('Bearer ')[1]
   const { newBid, currentUser } = req.body
   const piece = await getPiece(req.query.id)

   if (req.method !== 'POST') {
      res.status(405).json({ error: 'Only POST requests are allowed' })
      return
   }

   if (!authToken) {
      res.status(405).json({
         error: 'Request not authorized to place bid.',
      })
      return
   }

   if (!piece.id) {
      res.status(405).json({
         error: 'No Piece ID for bid. Piece ID must be provided to post a bid.',
      })
      return
   }

   try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(authToken)

      await placeBid(currentUser, piece, newBid, authToken)
      console.log('Bid added Successfully')
      res.status(200).json({ message: 'Bid added successfully' })
   } catch (error) {
      console.error('Error adding bid', error)
      res.status(500).json({ message: 'Error adding bid' })
   }
}
