import Link from 'next/link'
import { Menu } from '@headlessui/react'

function classNames(...classes) {
   return classes.filter(Boolean).join(' ')
}

export default function UserMenuItem({ name, href }) {
   return (
      <Menu.Item>
         {({ active }) => (
            <Link
               key={name}
               href={href}
               className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
               )}>
               {name}
            </Link>
         )}
      </Menu.Item>
   )
}
