import nodemailer from 'nodemailer'
import cron from 'node-cron'
import { serverTimestamp } from 'firebase/firestore'
import {
   getPiecesCollection,
   addNotification,
   pieceAuctionEnd,
   signInAuthUserWithEmailAndPassword,
   extendTime,
   addWinningPayment,
} from '../../utils/firebase.utils'

import Stripe from 'stripe'

let authToken

const refreshAuthToken = async () => {
   try {
      // Sign in to Firebase and get an auth token
      const adminCredentials = await signInAuthUserWithEmailAndPassword(
         process.env.FIREBASE_ADMIN_USER,
         process.env.FIREBASE_ADMIN_PASSWORD
      )
      authToken = {
         Authorization: `Bearer ${adminCredentials.idtoken}`,
      }
   } catch (error) {
      console.error('Error refreshing auth token:', error)
   }
}

let transporter = nodemailer.createTransport({
   service: 'privateemail',
   auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
   },
   host: 'mail.privateemail.com',
   port: 465,
   secure: true,
})

const stripe = new Stripe(process.env.STRIPE_TEST_API, {
   apiVersion: '2020-08-27',
})

const cronJob = cron.schedule('* * * * *', async () => {
   try {
      const time = new Date().toLocaleString()

      if (!authToken || Date.now() - authToken.timestamp > 55 * 60 * 1000) {
         await refreshAuthToken()
      }

      const pieces = await getPiecesCollection() // Fetch the pieces collection from Firebase

      // Loop through the pieces collection and schedule email sending for each piece
      for (const piece of pieces) {
         const {
            id,
            auctionEnd,
            highestBidderUid,
            highestBidder,
            highestBidderEmail,
            highestBid,
            name,
         } = piece

         // Convert auctionEnd date to a JavaScript Date object
         const auctionEndTime = new Date(auctionEnd.seconds * 1000)

         // Check if auctionEnd date is reached and if notification has already been sent
         if (auctionEndTime <= new Date() && !piece.notified) {
            // Add Notification in highestBidders

            if (highestBidderUid) {
               //creaet a customer for winning Item

               const timestamp = serverTimestamp()
               const notification = {
                  title: 'Your Bid Won!',
                  text: `Congratulations ${highestBidder}! You won the auction the macrame 
                  piece '${name}' with the highest bid of $${highestBid}.`,
                  pieceName: name,
                  read: false,
                  visible: true,
                  time: timestamp,
               }
               pieceAuctionEnd(id, authToken)
               await addNotification(notification, highestBidderUid)

               const winningPayment = {
                  itemId: id,
                  itemName: name,
                  itemAmount: highestBid,
               }

               await addWinningPayment(
                  winningPayment,
                  highestBidderUid,
                  authToken
               )

               const mailOptions = {
                  from: process.env.EMAIL_ADDRESS,
                  to: highestBidderEmail,
                  subject: `Auction for ${name} Ended`,
                  text: `Congratulations ${highestBidder}! You won the auction the macrame piece '${name}' with the highest bid of $${highestBid}.
                  We will email you an invoice shortly.  If you are in Waco or Indiana we can deliver the piece free of charge,
                  if you are in another city we can figure out shipping to you. 
                  Thank you so much,
                  Jacob Stabeno`,
                  html: `<p>Congratulations ${highestBidder}!</p>
                  <p>You won the auction for the macrame piece '${name}' with the highest bid of $${highestBid}.</p>
                  <p>We will email you an invoice shortly.  If you are in Waco or Indiana we can deliver the piece free of charge,
                  if you are in another city we can figure out shipping to you.</p>
                  <p>Thank You for Bidding at Middle East Macrame,</p>
                  <p>Jacob Stabeno</p>`,
               }
               console.log(`this will email ${highestBidderEmail}`)
               await transporter.sendMail(mailOptions)
            } else {
               //extend Auction End Time if no bids have been made
               await extendTime(piece.id, authToken, 7)
            }
         }
      }

      console.log('Cron task executed successfully')
   } catch (error) {
      console.error(error)
   }
})

export default async function auctionEndTasks(req, res) {
   cronJob.stop()
   cronJob.start()
}
