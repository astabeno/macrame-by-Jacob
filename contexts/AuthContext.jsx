import React, { createContext } from 'react'
import { auth } from '../utils/firebase.utils'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
   const signIn = async (email, password) => {
      try {
         await auth.signInWithEmailAndPassword(email, password)
      } catch (error) {
         console.log(error)
      }
   }

   const signOut = async () => {
      try {
         await auth.signOut()
      } catch (error) {
         console.log(error)
      }
   }

   const value = {
      auth,
      signIn,
      signOut,
   }

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
