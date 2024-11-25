import { useState, useEffect } from 'react'

import {
   collection,
   query,
   onSnapshot,
   orderBy,
   limit,
   where,
} from 'firebase/firestore'

import { db } from '../utils/firebase.utils'

export default function useLatestBid(pieceId) {
   const [latestBid, setLatestBid] = useState(null)
   const [bidderId, setBidderId] = useState(null)
   const [bidderName, setBidderName] = useState(null)
   const [bidTime, setBidTime] = useState(null)
   const [unsubscribe, setUnsubscribe] = useState(null)

   useEffect(() => {
      const bidsRef = collection(db, `bids`)
      const latestBidQuery = query(
         bidsRef,
         orderBy('bidTime', 'desc'),
         where('pieceId', '==', pieceId),
         limit(1)
      )

      const unsubscribe = onSnapshot(latestBidQuery, (snapshot) => {
         snapshot.forEach((doc) => {
            const newBid = doc.data()
            setLatestBid(newBid.bidAmount)
            setBidderId(newBid.userId)
            setBidderName(newBid.userName)
            setBidTime(newBid.bidTime)
         })
      })

      setUnsubscribe(() => unsubscribe)
   }, [pieceId])

   useEffect(() => {
      return () => {
         unsubscribe && unsubscribe()
      }
   }, [])

   return {
      amount: latestBid,
      bidderId: bidderId,
      bidderName: bidderName,
      bidTime: bidTime,
   }
}
