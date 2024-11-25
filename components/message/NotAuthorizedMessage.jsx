import React from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'

export default function NotAuthorizedMessage() {
   return (
      <div
         className="fixed top-24 left-0 z-50 flex h-full 
               w-full justify-center shadow-md">
         <div className="h-80 w-80 rounded bg-white">
            <div className="w-full p-4">
               <XCircleIcon className="mx-auto my-2 h-20 w-20 text-red-500" />
               <div className="text-center">
                  <h2 className="mb-5 text-[28px] text-red-500">
                     Not Authorized!
                  </h2>
                  <p>You are not authorized to access this page.</p>
               </div>
            </div>
         </div>
      </div>
   )
}
