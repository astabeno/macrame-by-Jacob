import { useState, useEffect, useContext } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import { UserContext } from '../contexts/userContext'
import { AuthContext } from '../contexts/AuthContext'

import { getWinningPayments } from '../utils/firebase.utils'

import CheckoutForm from '../components/form/CheckoutForm'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.STRIPE_TEST_PUBLISHABLE_KEY)

export default function Checkout() {
   const { currentUser } = useContext(UserContext)
   const { auth } = useContext(AuthContext)
   const [clientSecret, setClientSecret] = useState('')
   const authToken = {
      Authorization: `Bearer ${auth}`,
   }

   useEffect(() => {
      // Create PaymentIntent for each item in the array
      const retrievePayments = async () => {}
      const winningPayments = getWinningPayments(auth)
      const fetchWinningPayments = async () => {
         const winningPayments = await getWinningPayments(
            currentUser.uid,
            authToken
         )
         if (winningPayments) {
            Promise.all(
               winningPayments.map((item) => {
                  return fetch('/api/create-payment-intent', {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({ items: [{ id: item.itemName }] }),
                  })
                     .then((res) => res.json())
                     .then((data) => data.clientSecret)
               })
            ).then((clientSecrets) => {
               setClientSecrets(clientSecrets)
            })
         }
      }

      fetchWinningPayments()
   }, [])

   const appearance = {
      theme: 'stripe',
   }
   const options = {
      clientSecret,
      appearance,
   }

   return (
      <div className="App">
         {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
               <CheckoutForm />
            </Elements>
         )}
      </div>
   )
}
