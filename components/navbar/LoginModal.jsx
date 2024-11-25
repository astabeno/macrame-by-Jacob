import { useState } from 'react'
import Link from 'next/link'
import { XMarkIcon } from '@heroicons/react/24/outline'

import {
   signInAuthUserWithEmailAndPassword,
   signInWithGooglePopup,
} from '../../utils/firebase.utils'
import GoogleButton from '../form/GoogleButton'

const defaultFormFields = {
   email: '',
   password: '',
}

export default function LoginModal() {
   const [showModal, setShowModal] = useState(false)
   const [formFields, setFormFields] = useState(defaultFormFields)
   const { email, password } = formFields

   function resetFormFields() {
      setFormFields(defaultFormFields)
   }

   function handleClose() {
      setShowModal(false)
   }

   async function handleGoogleSignIn() {
      setShowModal(false)
      try {
         await signInWithGooglePopup()
      } catch (error) {
         console.log(error)
      }
   }

   function handleChange(event) {
      const { name, value } = event.target
      setFormFields({ ...formFields, [name]: value })
   }

   async function handleLogin(event) {
      event.preventDefault()
      try {
         await signInAuthUserWithEmailAndPassword(email, password)
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
   }

   return (
      <>
         <button
            className=" p-1 text-red-400 hover:text-white 
        focus:outline-none focus:ring-2 focus:ring-white 
        focus:ring-offset-2 focus:ring-offset-gray-800"
            type="button"
            onClick={() => setShowModal(true)}>
            Login
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
                           Sign in with:
                        </h1>
                        <GoogleButton onClick={handleGoogleSignIn} />
                        <form
                           className="space-y-4 md:space-y-6"
                           onSubmit={handleLogin}>
                           <div>
                              <label
                                 htmlFor="email"
                                 className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                 Your email
                              </label>
                              <input
                                 type="email"
                                 name="email"
                                 id="email"
                                 onChange={handleChange}
                                 className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg 
                                     border border-gray-300 bg-gray-50 p-2.5 
                                     text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                                     dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 
                                     sm:text-sm"
                                 placeholder="name@company.com"
                                 required=""
                              />
                           </div>
                           <div>
                              <label
                                 htmlFor="password"
                                 className="mb-2 block text-sm font-medium text-gray-900 
                              dark:text-white">
                                 Password
                              </label>
                              <input
                                 type="password"
                                 name="password"
                                 id="password"
                                 onChange={handleChange}
                                 placeholder="••••••••"
                                 className="focus:ring-primary-600 focus:border-primary-600 block w-full 
                                        rounded-lg border border-gray-300 
                                        bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 
                                        dark:bg-gray-700 dark:text-white 
                                        dark:placeholder-gray-400 dark:focus:border-blue-500 
                                        dark:focus:ring-blue-500 sm:text-sm"
                                 required=""
                              />
                           </div>
                           <button
                              type="submit"
                              className="hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 
                               dark:hover:bg-primary-700 dark:focus:ring-primary-800 
                               w-full rounded-lg 
                               bg-black px-5 py-2.5 text-center text-sm 
                               font-medium text-white focus:outline-none 
                               focus:ring-4">
                              Sign in
                           </button>
                           <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                              Don’t have an account yet?
                              <Link
                                 href="/sign-up"
                                 onClick={handleClose}
                                 className="text-primary-600 dark:text-primary-500 font-medium 
                                          hover:underline">
                                 Sign up
                              </Link>
                           </p>
                        </form>
                     </div>
                  </div>
               </div>
            </>
         ) : null}
      </>
   )
}
