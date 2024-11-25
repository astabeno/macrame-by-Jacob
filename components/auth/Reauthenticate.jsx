import { useState, useContext } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { UserContext } from '../../contexts/userContext'

import { updateCurrentUser } from '../../utils/firebase.utils'

export default function Reauthenticate({ user }) {
   const [showModal, setShowModal] = useState(false)
   const [password, setPassword] = useState('')

   function resetFormFields() {
      setPassword()
   }

   function handleClose() {
      setShowModal(false)
   }

   function clickHandler() {
      setShowModal(true)
   }

   function handleChange(event) {
      const { name, value } = event.target
      setPassword(value)
   }

   async function revalidateHandler(event) {
      event.preventDefault()

      try {
         await updateCurrentUser(user, password)

         resetFormFields()
      } catch (error) {
         switch (error.code) {
            case 'auth/wrong-password':
               alert('incorrect password for email')
               break
            case 'auth/user-not-found':
               alert('no user associated with this email')
               break
            default:
               console.log(error)
         }
      }
      setShowModal(false)
   }

   return (
      <>
         <button
            onClick={clickHandler}
            className="mt-5 w-52 rounded-md bg-black p-3 text-white shadow-xl">
            Update User Profile
         </button>
         {showModal ? (
            <>
               <div className="fixed inset-0 z-40 bg-black opacity-60"></div>
               <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center">
                  <div className="transform rounded-lg bg-white p-6 shadow-lg transition-all duration-500">
                     <XMarkIcon className="h-5 w-5" onClick={handleClose} />
                     <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                        <h1
                           className="ext-gray-900 text-xl font-bold leading-tight 
                                  tracking-tight dark:text-white md:text-2xl">
                           Enter Your Password:
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                           <div>
                              <label
                                 htmlFor="email"
                                 className="mb-2 block text-sm font-medium text-gray-900">
                                 Your email
                              </label>
                           </div>
                           <div>
                              <label
                                 htmlFor="password"
                                 className="mb-2 block text-sm font-medium text-gray-900 ">
                                 Password
                              </label>
                              <input
                                 type="password"
                                 name="password"
                                 id="password"
                                 onChange={handleChange}
                                 className="focus:ring-primary-600 focus:border-primary-600 block w-full 
                                        rounded-lg border border-gray-300 
                                        bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                                 required
                              />
                           </div>
                           <button
                              onClick={revalidateHandler}
                              className="hover:bg-primary-700 
                              focus:ring-primary-300 w-full rounded-lg 
                               bg-black px-5 py-2.5 text-center text-sm 
                               font-medium text-white focus:outline-none 
                               focus:ring-4">
                              Sign in
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </>
         ) : null}
      </>
   )
}
