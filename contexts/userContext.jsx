import { createContext, useEffect, useState } from 'react'
import {
   onAuthStateChangedListener,
   getUserDocument,
   getNotifications,
} from '../utils/firebase.utils'

export const UserContext = createContext({
   setCurrentUser: () => null,
   currentUser: null,
})

export const UserProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState(null)
   const [loading, setLoading] = useState(true)
   const value = { currentUser, setCurrentUser }

   useEffect(() => {
      const unsubscribe = onAuthStateChangedListener(async (user) => {
         if (user) {
            const userDocument = await getUserDocument(user.uid)
            const notifications = await getNotifications(user.uid)

            setCurrentUser({
               uid: user.uid,
               email: user.email,
               displayName: user.displayName,
               notifications: notifications,
               ...userDocument,
            })
         } else {
            setCurrentUser(null)
         }
         setLoading(false)
      })
      return unsubscribe
   }, [])

   return (
      <UserContext.Provider value={value}>
         {loading ? null : children}
      </UserContext.Provider>
   )
}
