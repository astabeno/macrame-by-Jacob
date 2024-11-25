import { useContext } from 'react'
import { useRouter } from 'next/router'

import { UserContext } from '../../contexts/userContext'

import AddPieceForm from '../../components/admin/AddPieceForm'

export default function AddPiece() {
   const { currentUser } = useContext(UserContext)
   const router = useRouter()

   if (!currentUser || currentUser.userType !== 'admin') {
      router.push({
         pathname: '/',
         query: { message: 'NOT_AUTHORIZED' },
      })
      return <></>
   }

   return (
      <div className="m-5">
         <AddPieceForm />
      </div>
   )
}
