import {
   getPiece,
   updatePiece,
   deletePiece,
} from '../../../../utils/firebase.utils'

export default async function handler(req, res) {
   const { method } = req

   switch (method) {
      case 'GET':
         handleGet(req, res)
         break
      case 'PUT':
         handlePut(req, res)
         break
      case 'DELETE':
         handleDelete(req, res)
         break
      default:
         res.status(405)
         break
   }
}

async function handleGet(req, res) {
   const piece = await getPiece(req.query.id)

   res.status(200).json({
      ...piece,
      id: req.query.id,
   })
}

async function handlePut(req, res) {
   const { updatedPiece } = req.body
   if (!updatedPiece.id) {
      res.status(500).json({ message: 'piece ID Missing' })
      return
   }

   if (updatedPiece.id != req.query.id) {
      res.status(500).json({ message: 'missmatched piece ids' })
      return
   }
   try {
   } catch (error) {
      res.status(500).json({
         message: `Error occured while updating piece ${pieceId}`,
         error,
      })
   }
   await updatePiece(updatedPiece)
   res.status(200).json({ message: 'PUT request received' })
}

async function handleDelete(req, res) {
   const pieceId = req.query.id
   try {
      deletePiece(pieceId)
      res.status(200).json({
         message: `Piece with ${pieceId} was succesfully deleted`,
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         message: `Error occured while Deleting piece ${pieceId}`,
         error,
      })
   }
}
