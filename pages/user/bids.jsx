import { useContext, useState, useEffect } from 'react'

import { UserContext } from '../../contexts/userContext'

import UserBidsGrid from '../../components/bids/UserBidsGrid'

import { getUserBids } from '../../utils/firebase.utils'

export default function Bids() {
   const { currentUser } = useContext(UserContext)
   const { displayName } = currentUser
   const [userBids, setUserBids] = useState([])

   useEffect(() => {
      const getBids = async () => {
         const foundBids = await getUserBids(currentUser.uid)
         const bids = foundBids.map((bid) => ({
            ...bid,
            bidTime: bid.bidTime.toMillis(),
         }))
         setUserBids(bids)
      }
      getBids()
   }, [currentUser.uid])

   return (
      <div className="my-6 mx-auto w-11/12 rounded-2xl bg-white p-8 shadow-lg">
         <h1 className="mb-7 border-b-2 pb-2 text-center text-3xl font-extrabold">
            Bids for {displayName}
         </h1>
         {userBids ? (
            <UserBidsGrid bids={userBids} />
         ) : (
            <p>You haven&apos;t bid on anything</p>
         )}
      </div>
   )
}
