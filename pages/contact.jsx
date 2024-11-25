import React from 'react'

import ContactForm from '../components/contact/ContactForm'

export default function Contact() {
   return (
      <div className="">
         <ContactForm />

         <div className="text center mt-5"></div>
         <p className="text-center font-bold">
            Email Address:
            <a
               href="mailto: Support@middleeastmacrame.com"
               className="ml-3 font-thin text-blue-600">
               Support@middleeastmacrame.com
            </a>
         </p>
      </div>
   )
}
