import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/userContext'
import useUSDate from '../../hooks/useUSDate'
import {
   getUserBidCount,
   updateCurrentUser,
   updateDisplayName,
   updateUserPassword,
} from '../../utils/firebase.utils'

import Input from '../form/Input'

import Reauthenticate from './Reauthenticate'

export default function ProfileComponent() {
   const { currentUser, setCurrentUser } = useContext(UserContext)
   const [updatedUser, setUpdatedUser] = useState(currentUser)
   const [userBidCount, setUserBidCount] = useState(0)
   const [passwords, setPasswords] = useState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
   })

   const { currentPassword, newPassword, confirmPassword } = passwords

   const {
      displayName,
      userType,
      createdAt,
      email,
      numberOfBids,
      uid,
      provider,
   } = currentUser

   const initialsMatch = displayName.match(/\b(\w)/g)
   const initials = initialsMatch.join('')

   useEffect(() => {
      const getBidCount = async () => {
         const count = await getUserBidCount(uid)
         setUserBidCount(count)
      }
      getBidCount()
   })

   function changeHandler(event) {
      const { name, value } = event.target
      setUpdatedUser({ ...updatedUser, [name]: value })
   }

   function reauthWithGoogle(event) {
      event.preventDefault()
      updateDisplayName(updatedUser.displayName, uid)
      setCurrentUser(updatedUser)
   }

   function passwordsChangeHandler(event) {
      const { name, value } = event.target
      setPasswords({ ...passwords, [name]: value })
   }

   function passwordsSubmitHandler(event) {
      event.preventDefault()

      if (newPassword === confirmPassword) {
         try {
            updateUserPassword(currentPassword, newPassword)
         } catch (error) {
            console.error('error changing password', error)
         }
      } else {
         alert('Passwords Do Not Match')
      }
   }

   const dateSignedup = useUSDate(createdAt.toDate())

   return (
      <div className="justify container m-auto w-3/4 rounded-md bg-white p-8 shadow-2xl">
         <h1 className="text-center text-4xl">{displayName}</h1>
         {userType === 'admin' ? (
            <p className="fon text-center">{userType}</p>
         ) : (
            <p>bidder</p>
         )}
         <hr className="my-5" />
         <div className="flex flex-row">
            <div className="flex w-1/3 flex-col">
               <div className="mb-6">
                  <span
                     className="mx-auto inline-block h-28 w-28 rounded-full bg-black
                                   text-center align-middle text-6xl text-white"
                     style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}>
                     {initials}
                  </span>
               </div>
               <div className="flex flex-col px-10 text-center">
                  <span className="text text-neutral-600">Member Since </span>
                  <span className="mb-3 text-sm text-blue-500">
                     {dateSignedup}
                  </span>
                  <span className="text-neutral-600 text-lg font-thin">
                     Bids{' '}
                  </span>
                  <span className="mb-3 text-sm text-blue-500">
                     {userBidCount}
                  </span>
                  <div className="flex flex-row justify-between">
                     <div>
                        <p>Active</p>
                        <span>2</span>
                     </div>
                     <div>
                        <p>Won</p>
                        <span>0</span>
                     </div>
                     <div>
                        <p>Out Bid</p>
                        <span>0</span>
                     </div>
                  </div>
               </div>
            </div>
            <div className="flex w-2/3 flex-col">
               <form className="flex flex-col rounded-lg border border-gray-300 p-4">
                  <div className="mx-auto mb-3 w-5/6">
                     <Input
                        type="email"
                        name="email"
                        id="email"
                        value={updatedUser.email}
                        onChange={changeHandler}
                        isRequired
                        disabled={!provider !== 'password'}
                     />
                  </div>
                  <div className="mx-auto mb-3 w-5/6">
                     <Input
                        type="text"
                        name="displayName"
                        id="displayName"
                        value={updatedUser.displayName}
                        onChange={changeHandler}
                        isRequired
                     />
                  </div>
                  <div className="mx-auto mb-3 w-5/6">
                     {provider === 'password' ? (
                        <Reauthenticate user={updatedUser} />
                     ) : (
                        <button
                           onClick={reauthWithGoogle}
                           className="mt-5 w-52 rounded-md bg-black p-3 text-white shadow-xl">
                           Update Display Name
                        </button>
                     )}
                  </div>
               </form>
               {provider === 'password' ? (
                  <form
                     className="passwords flex flex-col bg-gray-300 p-4"
                     onSubmit={passwordsSubmitHandler}>
                     <div className="mb-3 flex">
                        <label className="mt-2 w-44" htmlFor="currentPassword">
                           Current Password:
                        </label>
                        <input
                           onChange={passwordsChangeHandler}
                           className="w-2/3 border-b border-gray-400"
                           type="password"
                           name="currentPassword"
                           id="currentPassword"
                        />
                     </div>
                     <div className="mb-3 flex">
                        <label className="mt-2  w-44" htmlFor="password">
                           New Password:
                        </label>
                        <input
                           onChange={passwordsChangeHandler}
                           className="w-2/3 border-b border-gray-400"
                           type="password"
                           name="newPassword"
                           id="newPassword"
                        />
                     </div>
                     <div className="mb-3 flex">
                        <label className="mt-2  w-44" htmlFor="confirmPassword">
                           Confirm Password:
                        </label>
                        <input
                           onChange={passwordsChangeHandler}
                           className="w-2/3 border-b border-gray-400"
                           type="password"
                           name="confirmPassword"
                           id="confirmPassword"
                        />
                     </div>
                     <button
                        type="submit"
                        className="mt-5 w-52 rounded-md bg-black p-3 text-white shadow-xl">
                        Update Password
                     </button>
                  </form>
               ) : (
                  <></>
               )}
            </div>
         </div>
      </div>
   )
}
