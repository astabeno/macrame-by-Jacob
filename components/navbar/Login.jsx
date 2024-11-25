import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'

import Modal from '../form/modal'
import Input from '../form/Input'

import {
   signInAuthUserWithEmailAndPassword,
   signInWithGooglePopup,
} from '../../utils/firebase.utils'
import GoogleButton from '../form/GoogleButton'

const defaultFormFields = {
   email: '',
   password: '',
}

export default function Login() {
   const [formFields, setFormFields] = useState(defaultFormFields)
   const [showModal, setShowModal] = useState(false)
   const { email, password } = formFields

   function resetFormFields() {
      setFormFields(defaultFormFields)
   }

   function handleClose() {
      setShowModal(false)
   }

   async function handleGoogleSignIn() {
      try {
         await signInWithGooglePopup()
         setShowModal(false) // Close the modal
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
         <Modal buttonText="Login" isOpen={showModal} onClose={handleClose}>
            <h1
               className="text-xl font-bold leading-tight tracking-tight 
                         text-gray-900 dark:text-white md:text-2xl">
               Sign in with:
            </h1>
            <GoogleButton onClick={handleGoogleSignIn} />
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
               <Input
                  type="email"
                  label="Email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  placeholder=" "
                  required
               />

               <Input
                  type="password"
                  label="Password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  placeholder=" "
                  required
               />
               <button
                  type="submit"
                  className="hover:bg-primary-700 focus:ring-primary-300  
                               w-full rounded-lg bg-black px-5 py-2.5 text-center text-sm 
                               font-medium text-white focus:outline-none 
                               focus:ring-4">
                  Sign in
               </button>
               <button
                  onClick={() => {
                     setShowModal(false)
                  }}>
                  close test
               </button>
               <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?
                  <Link
                     href="/sign-up"
                     onClick={handleClose}
                     className="text-primary-600 dark:text-primary-500 
                                font-medium hover:underline">
                     Sign up
                  </Link>
               </p>
            </form>
         </Modal>
      </>
   )
}
