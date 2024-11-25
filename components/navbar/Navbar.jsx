import { useState, useContext } from 'react'
import Image from 'next/image'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
   Bars3Icon,
   BellIcon,
   XMarkIcon,
   UserCircleIcon,
} from '@heroicons/react/24/outline'

import heroBellOutline from '../../public/heroBellOutline.svg'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { navlinks } from './navlinks'

import LoginModal from './LoginModal'
import UserMenu from './UserMenu'
import Message from '../message/Message'
import Notifications from './Notifications'

//user Context
import { UserContext } from '../../contexts/userContext'

function classNames(...classes) {
   return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
   const { currentUser } = useContext(UserContext)
   const [showModal, setShowModal] = useState(false)

   const router = useRouter()

   const isActive = (href) => {
      return href === router.pathname
   }
   return (
      <Disclosure as="nav" className="bg-gray-900">
         {({ open }) => (
            <>
               <div className="mx-auto px-2 sm:px-6 lg:px-8">
                  <div className="relative flex h-16 items-center justify-between">
                     <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <Disclosure.Button
                           className="inline-flex items-center justify-center rounded-md 
                                              p-2 text-gray-400 hover:bg-gray-700 hover:text-white 
                                              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                           <span className="sr-only">Open main menu</span>
                           {open ? (
                              <XMarkIcon
                                 className="block h-6 w-6"
                                 aria-hidden="true"
                              />
                           ) : (
                              <Bars3Icon
                                 className="block h-6 w-6"
                                 aria-hidden="true"
                              />
                           )}
                        </Disclosure.Button>
                     </div>
                     <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center bg-gray-900">
                           <Image
                              className="block h-8 w-auto bg-gray-900"
                              src="/middleEastMacrame.svg"
                              alt="Middle East Macrame"
                              width={10}
                              height={10}
                           />
                        </div>
                        <div className="hidden h-auto sm:ml-6 sm:block">
                           <div className="mt-2 flex space-x-4">
                              {navlinks.map((item) => (
                                 <Link
                                    key={item.key}
                                    href={item.href}
                                    className={classNames(
                                       isActive(item.href)
                                          ? 'bg-gray-900 text-white'
                                          : 'text-gray-400 hover:bg-gray-700 hover:text-white',
                                       'rounded-md px-3 py-2 text-sm font-medium'
                                    )}
                                    aria-current={
                                       isActive(item.href) ? 'page' : undefined
                                    }>
                                    {item.name}
                                 </Link>
                              ))}
                           </div>
                        </div>
                     </div>

                     <div
                        className="absolute inset-y-0 right-0 flex items-center 
                              pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {currentUser ? (
                           <>
                              <Message text="After Login" />

                              <Notifications />
                              <UserMenu />
                           </>
                        ) : (
                           <LoginModal />
                        )}
                     </div>
                  </div>
               </div>

               {/* Drop Down Menu */}
               <Disclosure.Panel className="sm:hidden">
                  <div className="space-y-1 px-2 pt-2 pb-3">
                     {navlinks.map((item) => (
                        <Disclosure.Button
                           key={item.name}
                           as="a"
                           href={item.href}
                           className={classNames(
                              isActive(item.href)
                                 ? 'bg-gray-900 text-white'
                                 : 'text-gray-400 hover:bg-gray-700 hover:text-white',
                              'block rounded-md px-3 py-2 text-base font-medium'
                           )}
                           aria-current={item.current ? 'page' : undefined}>
                           {item.name}
                        </Disclosure.Button>
                     ))}
                  </div>
               </Disclosure.Panel>
            </>
         )}
      </Disclosure>
   )
}
