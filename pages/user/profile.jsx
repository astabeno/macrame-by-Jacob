import { useContext } from 'react'
import { useRouter } from 'next/router'

import { UserContext } from '../../contexts/userContext'
import ProfileComponent from '../../components/auth/Profile'

export default function Profile() {
   const { currentUser } = useContext(UserContext)
   const router = useRouter()

   if (!currentUser) {
      router.push({
         pathname: '/',
         query: { message: 'LOGIN_REQUIRED' },
      })
      return <></>
   }

   return (
      <>
         <ProfileComponent />
      </>
   )
}
