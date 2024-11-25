import { useContext } from 'react'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'
import { UserContext } from '../../contexts/userContext'

export default function AccountCreationMessage() {
   const { currentUser } = useContext(UserContext)
   let displayName = 'guest'

   if (currentUser.displayName) {
      displayName = currentUser.displayName
   }

   return (
      <div
         className="fixed top-24 left-0 z-50 flex h-full 
                    w-full justify-center shadow-md">
         <div className="h-80 w-80 rounded bg-white">
            <div className="w-full p-4">
               <ShieldCheckIcon className="mx-auto my-2 h-20 w-20 text-green-500" />
               <div className="text-center">
                  <h2 className="mb-5 text-[28px] text-green-500">
                     Greetings {currentUser.displayName}
                  </h2>
                  <p>
                     Thank you for signing up! You can now start bidding on
                     pieces.
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}
