import { getPiecesCollection, addPiece } from '../../../utils/firebase.utils'

export default function handler(req, res) {
   const { method } = req

   switch (method) {
      case 'GET':
         handleGet(req, res)
         break
      case 'POST':
         handlePost(req, res)
         break
      default:
         res.status(405).end()
         break
   }
}

async function handleGet(req, res) {
   const pieces = await getPiecesCollection()

   res.status(200).json(pieces)
}

async function handlePost(req, res) {
   const { piece, currentUser } = req.body

   if (!currentUser || currentUser.userType !== 'admin') {
      res.status(401).send('unauthorized')
      return
   }

   if (!piece) {
      res.status(500).send('No Piece Data available for Posting.')
      return
   }

   try {
      await addPiece(piece)
      res.status(200).send('Piece Created Successfully', piece)
   } catch (error) {
      res.status(500).json({ message: 'Error adding Piece', error: error })
   }
}
