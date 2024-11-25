import { useContext } from 'react'
import { UserContext } from '../contexts/userContext'

import { db } from '../utils/firebase.utils'
import { getDocs, collection, orderBy } from 'firebase/firestore'

export async function useNotifications() {
   const { currentUser } = useContext(UserContext)
   const { uid } = currentUser

   const notificationsSnapshot = await getDocs(
      collection(db, 'user', uid, 'notifications')
   )
   const notfications = notificationsSnapshot.docs.map((notification) => ({
      id: notification.id,
      ...notification.data(),
   }))

   return notfications
}
