import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

import Input from '../components/form/Input'

import {
   createAuthUserWithEmailAndPassword,
   createUserDocumentFromAuth,
} from '../utils/firebase.utils'

const defaultFormFields = {
   displayName: '',
   email: '',
   password: '',
   confirmPassword: '',
}

export default function SignUp() {
   const router = useRouter()
   const [formFields, setFormFields] = useState(defaultFormFields)
   const { displayName, email, password, confirmPassword } = formFields

   const resetFields = () => {
      setFormFields(defaultFormFields)
   }

   const onSubmitHandler = async (event) => {
      event.preventDefault()

      if (password !== confirmPassword) {
         alert("Password don't match!")
      }
      try {
         const auth = await createAuthUserWithEmailAndPassword(email, password)
         await createUserDocumentFromAuth(auth.user, { displayName })
         resetFields()
         router.push({
            pathname: '/',
            query: { message: 'ACCOUNT_CREATION_SUCCESS' },
         })
      } catch (error) {
         if (error.code === 'auth/email-already-in-use') {
            alert('Email already Registered')
         } else {
            console.error('error creating user', error)
         }
      }
   }

   const changeHandler = (event) => {
      const { name, value } = event.target
      setFormFields({ ...formFields, [name]: value })
   }

   return (
      <div className="bg-grey-lighter flex min-h-screen flex-col">
         <div
            className="container mx-auto flex max-w-sm flex-1 flex-col items-center 
                        justify-center px-2">
            <div className="w-full rounded bg-white px-6 py-8 text-black shadow-md">
               <h1 className="mb-8 text-center text-3xl">Sign up</h1>
               <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={onSubmitHandler}>
                  <Input
                     type="text"
                     name="displayName"
                     label="Display Name"
                     placeholder=" "
                     value={displayName}
                     onChange={changeHandler}
                     isRequired={true}
                  />
                  <Input
                     type="email"
                     name="email"
                     label="Email"
                     placeholder=" "
                     value={email}
                     onChange={changeHandler}
                     isRequired={true}
                  />
                  <Input
                     type="password"
                     name="password"
                     label="Password"
                     placeholder=" "
                     value={password}
                     onChange={changeHandler}
                     isRequired={true}
                  />
                  <Input
                     type="password"
                     name="confirmPassword"
                     label="Confirm Password"
                     placeholder=" "
                     value={confirmPassword}
                     onChange={changeHandler}
                     isRequired={true}
                  />
                  <button
                     type="submit"
                     className="hover:bg-green-dark my-1 w-full rounded bg-green-500 
                                py-3 text-center text-white focus:outline-none">
                     Create Account
                  </button>
               </form>
            </div>

            <div className="text-grey-dark mt-6">
               Already have an account?
               <Link
                  className="border-blue text-blue border-b no-underline"
                  href="../login/">
                  Log in
               </Link>
            </div>
         </div>
      </div>
   )
}
