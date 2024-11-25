import { useContext } from 'react'
import { UserContext } from '../../contexts/userContext'

export default function UserBidStatus() {
   const { currentUser } = useContext(UserContext)

   return (
      <div
         className="h-15 relative bg-green-500 p-2 
                      text-center text-3xl font-extrabold 
                      text-white">
         You are Winning
      </div>
   )
}
