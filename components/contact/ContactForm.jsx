import { useState } from 'react'
import { Input, Textarea, Button } from '@material-tailwind/react'

export default function ContactForm() {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [message, setMessage] = useState('')

   async function handleSubmit(event) {
      event.preventDefault()
      let emailerUrl = ''
      if (process.env.NODE_ENV === 'development') {
         emailerUrl = `http://localhost:3000/api/emailer`
      } else {
         emailerUrl = `https://www.middleeastmacrame.com/api/emailer`
      }

      //send question email to suppor@middleeastmacrame.com
      const questionEmailData = {
         to: 'support@middleeastmacrame.com',
         from: 'support@middleeastmacrame.com',
         subject: `Inquiry from ${name}`,
         text: `${name} - ${email}: ${message}`,
      }
      try {
         const response = await fetch(emailerUrl, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionEmailData),
         })
         if (response.ok) {
            console.log('Email sent successfully')
            // Handle success response here
         } else {
            console.error('Failed to send email')
            // Handle error response here
         }
      } catch (error) {
         console.error('error sending confirmaition email', error)
      }

      //send confirmatotion email to inquirer
      const confirmationEmailData = {
         // Define the email data here, for example:
         to: email,
         from: 'support@middleeastmacrame.com',
         subject: `Thank you for contacting us!`,
         html: `<p>Greetings ${name}, </p> 
                <p>We have recieved you message and we will get back with
                 you shortly.  We value your relationship with Midde 
                 East Macrame.<p/>
                 <p>Customer Support</p>
                 <p>Middle East Macrame<p/>`,
      }
      try {
         const response = await fetch(emailerUrl, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(confirmationEmailData),
         })
         if (response.ok) {
            console.log('Email sent successfully')
            // Handle success response here
         } else {
            console.error('Failed to send email')
            // Handle error response here
         }
      } catch (error) {
         console.error('error sending confirmaition email', error)
      }
   }

   return (
      <div className="mx-auto max-w-lg rounded-lg bg-white p-5 shadow-lg">
         <h2 className="mb-5 text-center text-xl font-bold text-gray-700">
            Contact Form
         </h2>
         <form className="" onSubmit={handleSubmit}>
            <div className="mb-4">
               <Input
                  label="Name"
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
               />
            </div>
            <div className="mb-4">
               <Input
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
               />
            </div>
            <div className="mb-4">
               <Textarea
                  label="Message"
                  id="message"
                  name="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required></Textarea>
            </div>
            <div className="flex justify-end">
               <Button
                  className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
                  type="submit">
                  Send
               </Button>
            </div>
         </form>
      </div>
   )
}
