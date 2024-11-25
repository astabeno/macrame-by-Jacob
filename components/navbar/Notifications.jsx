import react, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { UserContext } from '../../contexts/userContext'
import { Popover, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'

export default function Notifications() {
   const { currentUser } = useContext(UserContext)
   const { notifications } = currentUser

   return (
      <Popover className="relative mt-2">
         <Popover.Button className="text-white">
            <BellIcon className="block h-6 w-6" />
         </Popover.Button>

         <Popover.Panel className="absolute right-0 z-10 w-64 space-x-1 rounded-lg bg-white p-3 opacity-90">
            {notifications
               ? notifications.map((notification) => (
                    <div className="border-b" key={notification.id}>
                       <div className="flex flex-row justify-between bg-orange-400">
                          <p className=" p-1 text-white">
                             {notification.title}
                          </p>
                          <p className="flex p-1 text-sm text-white">
                             {notification.time}
                          </p>
                       </div>
                       <p className="p-1 text-xs">{notification.text}</p>
                       <Link
                          className="text-blue-500"
                          href={notification.pieceUrl}>
                          {notification.pieceName}
                       </Link>
                    </div>
                 ))
               : 'no notifications'}
         </Popover.Panel>
      </Popover>
   )
}
