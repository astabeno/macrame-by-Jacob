import { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Modal({
   children,
   buttonText,
   isOpen,
   onClose,
   ...props
}) {
   const [showModal, setShowModal] = useState(false)

   function closeModal() {
      setShowModal(false)
      onClose && onClose()
   }

   function openModal() {
      setShowModal(true)
   }

   return (
      <>
         <button
            className=" p-1 text-red-400 hover:text-white 
                        focus:outline-none focus:ring-2 focus:ring-white 
                        focus:ring-offset-2 focus:ring-offset-gray-800"
            type="button"
            onClick={openModal}>
            {buttonText}
         </button>
         {showModal ? (
            <>
               <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
               <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center">
                  <div className="transform rounded-lg bg-white p-6 shadow-lg transition-all duration-500">
                     <XMarkIcon className="h-5 w-5" onClick={closeModal} />
                     <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                        {children}
                     </div>
                  </div>
               </div>
            </>
         ) : null}
      </>
   )
}
