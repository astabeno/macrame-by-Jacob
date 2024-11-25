import { useState } from 'react'

import { imageUpload } from '../../utils/firebase.utils'

import { useRouter } from 'next/router'
import { deletePiece, updatePiece } from '../../utils/firebase.utils'
import Input from '../form/Input'

export default function ManagePiece({ piece }) {
   const [pieceInfo, setPieceInfo] = useState(piece)
   const [file, setFile] = useState(null)

   const { name, description, dimensions, startingBid, auctionEnd, url, id } =
      pieceInfo

   const router = useRouter()

   function changeHandler(event) {
      const { name, value } = event.target
      if (name === 'width' || name === 'height') {
         setPieceInfo({
            ...pieceInfo,
            dimensions: {
               ...dimensions,
               [name]: parseInt(value),
            },
         })
      } else {
         setPieceInfo({ ...pieceInfo, [name]: value })
      }
   }

   async function handleSubmit(event) {
      event.preventDefault()

      if (!file) {
         updatePiece(pieceInfo)
         return
      }

      try {
         const newUrl = await imageUpload(file)
         if (!newUrl) {
            throw new Error('Url is not defined')
         }
         setPieceInfo({ ...pieceInfo, url: newUrl }) // update the URL
         updatePiece({ ...pieceInfo, url: newUrl }) // pass the updated piece to updatePiece()
      } catch (error) {
         alert(error)
      }
   }

   async function handleDelete() {
      try {
         deletePiece(id)
      } catch (error) {
         console.error(error)
      }
      router.push('/admin/managePieces')
   }

   return (
      <div className="mx-auto w-3/4 rounded-xl bg-white p-8 shadow-2xl">
         <h1 className="text-center">Manage Piece</h1>
         <div className="mx-auto flex w-auto">
            <form onSubmit={handleSubmit} className="mt-5 w-1/2 space-y-4">
               <Input
                  name="name"
                  label="Name of Piece"
                  type="text"
                  value={name}
                  placeholder=" "
                  onChange={changeHandler}
                  isRequired={true}
               />
               <Input
                  name="description"
                  label="Description"
                  type="text"
                  value={description}
                  placeholder=" "
                  onChange={changeHandler}
                  isRequired={true}
               />
               <div className="flex flex-row space-x-5">
                  <Input
                     name="width"
                     label="Width in Inches"
                     type="number"
                     value={dimensions.width}
                     placeholder=" "
                     onChange={changeHandler}
                     isRequired={true}
                  />
                  <Input
                     name="height"
                     label="Height in Inches"
                     type="number"
                     value={dimensions.height}
                     placeholder=" "
                     onChange={changeHandler}
                     isRequired={true}
                  />
               </div>
               <Input
                  name="file"
                  label="change Image"
                  type="file"
                  accept="image/*"
                  placeholder=" "
                  onChange={(event) => setFile(event.target.files[0])}
                  isRequired={false}
               />
               <Input
                  name="startingBid"
                  label="Starting Price"
                  type="number"
                  value={startingBid}
                  placeholder=" "
                  onChange={changeHandler}
                  isRequired={true}
               />
               <Input
                  name="auctionEnd"
                  label="Auction End Date"
                  type="datetime-local"
                  value={auctionEnd}
                  placeholder={''}
                  onChange={changeHandler}
                  isRequired={true}
               />

               <button
                  className="rounded-lg border border-black bg-white p-2 text-black hover:bg-black hover:text-white"
                  type="submit">
                  Update Piece
               </button>
               <button
                  className="rounded-lg border border-black bg-white p-2 text-black hover:bg-black hover:text-white"
                  type="button"
                  onClick={() => router.back()}>
                  Cancel
               </button>
               <button
                  className="rounded-lg border border-black bg-white p-2 text-black hover:bg-black hover:text-white"
                  type="button"
                  onClick={handleDelete}>
                  Delete Piece
               </button>
            </form>

            <div className="m-5 grid w-1/2 content-center rounded-lg border border-gray-300 bg-gray-200 text-center">
               {!file ? (
                  <img src={url} className="max-w-full" />
               ) : (
                  <img src={URL.createObjectURL(file)} className="max-w-full" />
               )}
            </div>
         </div>
      </div>
   )
}
