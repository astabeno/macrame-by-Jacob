import { useEffect } from 'react'
import '../styles/globals.css'
import { UserProvider } from '../contexts/userContext'
import { AuthProvider } from '../contexts/AuthContext'

import MainLayout from '../components/layouts/MainLayout'

export default function App({ Component, pageProps }) {
   useEffect(() => {
      // Fetch request to trigger the /api/auctionEndTasks API route
      fetch('/api/auctionEndTasks')
         .then((response) => {
            if (response.ok) {
               console.log('API call successful')
            } else {
               console.error('API call failed')
            }
         })
         .catch((error) => console.error('API call error:', error))
   }, [])
   return (
      <>
         <AuthProvider>
            <UserProvider>
               <MainLayout>
                  <Component {...pageProps} />
               </MainLayout>
            </UserProvider>
         </AuthProvider>
      </>
   )
}
