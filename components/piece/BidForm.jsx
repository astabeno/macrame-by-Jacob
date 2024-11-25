import { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import { UserContext } from '../../contexts/userContext'

import useLatestBid from '../../hooks/useLatestBid'

import { placeBid, getPieceBidCount } from '../../utils/firebase.utils'

import Input from '../form/Input'
import { Button } from '@material-tailwind/react'

export default function BidForm({ piece, auctionActive }) {
   const { id, description, dimensions, startingBid } = piece

   const { currentUser } = useContext(UserContext)

   const latestBid = useLatestBid(id)

   const [newBid, setNewBid] = useState(Number(startingBid))
   const [highestBid, setHighestBid] = useState(
      Number(latestBid.amount ? latestBid.amount : startingBid)
   )
   const [pieceBidCount, setPieceBidCount] = useState(0)

   useEffect(() => {
      setHighestBid(Number(latestBid.amount ? latestBid.amount : startingBid))
      setNewBid(Number(highestBid) + 1)
   }, [highestBid])

   useEffect(() => {
      const getBidCount = async () => {
         const count = await getPieceBidCount(id)
         setPieceBidCount(count)
      }
      setHighestBid(latestBid.amount ? latestBid.amount : startingBid)
      getBidCount()
   }, [latestBid, id, startingBid])

   function handleBidChange(event) {
      const { value } = event.target
      setNewBid(value)
   }

   async function submitBid(event) {
      event.preventDefault()

      if (newBid > latestBid.amount) {
         try {
            placeBid(currentUser, piece, newBid)
         } catch (error) {
            console.error(error)
         }
      } else {
         alert('Bid Must be greater than current bid')
      }
   }

   return (
      <div>
         <form className="flex flex-col" onSubmit={submitBid}>
            <div className="space-y-3">
               <div className="border border-gray-200 bg-gray-200 p-2 text-center text-gray-800">
                  <p className="text-xs">Dimensions</p>
                  <p>
                     &quot;{dimensions.height} x &quot;{dimensions.width}
                  </p>
               </div>
               <div className="rounded-lg border border-gray-200 p-2 text-gray-600 shadow-inner">
                  {description}
               </div>

               {currentUser ? (
                  <div className="border-300 flex border-b border-t py-2">
                     <span className="mr-2 text-gray-600"># of Bids: </span>{' '}
                     <Link
                        href={`/pieces/${id}/bids`}
                        className="cursor-pointer text-blue-600 hover:underline">
                        {pieceBidCount}{' '}
                     </Link>
                     <span className="ml-14 text-gray-600">
                        {latestBid.bidderId === currentUser.uid
                           ? 'You are winning'
                           : 'You are not winning'}
                     </span>
                  </div>
               ) : (
                  <></>
               )}
               <p className="text-center text-xl text-gray-600">Current Bid</p>
               <div className=" m-auto h-14 w-32 justify-center rounded-lg border border-gray-400 bg-gray-200 text-gray-600">
                  <p className="m-auto w-10 pt-3 text-lg">${highestBid}</p>
               </div>

               <Input
                  type="number"
                  name="newBid"
                  label="New Bid"
                  id="bid"
                  onChange={handleBidChange}
                  value={newBid}
                  disabled={!auctionActive}
               />
            </div>
            {auctionActive ? (
               <div className="my-5 mx-auto">
                  {currentUser ? (
                     <Button
                        type="submit"
                        className="w-60 bg-gray-200 text-gray-700 shadow-md shadow-gray-400">
                        Place Bid
                     </Button>
                  ) : (
                     <Button
                        type="submit"
                        className="bg-stone-700 text-stone-400 w-60"
                        disabled>
                        Sign In to Bid
                     </Button>
                  )}
               </div>
            ) : (
               <div className="my-5 mx-auto">
                  <Button
                     type="submit"
                     className="bg-stone-700 text-stone-400 w-60"
                     disabled>
                     Auction Finished
                  </Button>
               </div>
            )}
         </form>
      </div>
   )
}
