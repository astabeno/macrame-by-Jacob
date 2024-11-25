import { collection, query, where, getDocs } from 'firebase/database'

import { db } from '../utils/firebase.utils'

export default async function useUserBidCount(userId) {
   const q = query(collection(db, 'bids'), where('userId', '==', userId))
   const querySnapshot = await getDocs(q)
   querySnapshot.forEach((doc) => {
      console.log(doc.data().userName)
   })
}
