import { initializeApp } from 'firebase/app'
import {
   getAuth,
   GoogleAuthProvider,
   signInWithPopup,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   onAuthStateChanged,
   updateProfile,
   updatePassword,
   updateEmail,
   reauthenticateWithCredential,
   EmailAuthProvider,
} from 'firebase/auth'

import {
   getFirestore,
   getCountFromServer,
   doc,
   getDoc,
   collection,
   where,
   query,
   getDocs,
   setDoc,
   addDoc,
   updateDoc,
   deleteDoc,
   Timestamp,
   serverTimestamp,
   orderBy,
} from 'firebase/firestore'

import outBidEmail from '../utils/outBidEmail'

import {
   getDownloadURL,
   getStorage,
   ref as storeRef,
   uploadBytes,
} from 'firebase/storage'

import { getFunctions } from 'firebase/functions'

import useUSDate from '../hooks/useUSDate'

import { v4 as uuidv4 } from 'uuid'

const firebaseConfig = {
   apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
   databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASEURL,
   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
   storageBucket: process.env.NEXT_PUBLIC_FIREBSE_STORAGEBUCKET,
   messagingSenderId: process.env.NEXT_PUBLIC_FIREBSE_MESSAGING_SENDER_ID,
   appId: process.env.NEXT_PUBLIC_FIREBSE_APP_ID,
   measurementId: process.env.NEXT_PUBLIC_FIREBSE_MEASUREMENT_ID,
}

export const app = initializeApp(firebaseConfig)

export const googleProvider = new GoogleAuthProvider()

//sign in with Google or create account with Google
googleProvider.setCustomParameters({ promt: 'select_account' })

//create Firebase Auth object
export const auth = getAuth()
//create db link
export const db = getFirestore()
export const functions = getFunctions()

export const createUserDocumentFromAuth = async (
   userAuth,
   additionalInformation = {}
) => {
   if (!userAuth) return

   const userDocRef = doc(db, 'users', userAuth.uid)

   const userSnapshot = await getDoc(userDocRef)
   const loginTime = new Date()

   if (!userSnapshot.exists()) {
      const { displayName, email, providerData } = userAuth

      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt: loginTime,
            lastLogin: loginTime,
            provider: providerData[0]?.providerId,
            ...additionalInformation,
         })
      } catch (error) {
         console.error('error creating user', error.message, 'color: #bada55')
      }
   }

   try {
      await updateDoc(userDocRef, {
         lastLogin: loginTime,
      })
   } catch (error) {
      console.error('error updating user', error.message, 'color: #bada55')
   }
   return userDocRef
}

export const getUserDocument = async (uid) => {
   const userRef = doc(db, 'users', uid)
   const userSnapshot = await getDoc(userRef)
   if (userSnapshot.exists()) {
      return userSnapshot.data()
   } else {
      try {
         await setDoc(userRef, {
            // set some default user data if the user document doesn't exist yet
            createdAt: new Date(),
         })
         const newUserSnapshot = await getDoc(userRef)
         return newUserSnapshot.data()
      } catch (error) {
         console.error('Error creating user document', error, 'color: #bada55')
      }
   }
}

export async function updateCurrentUser(user, password) {
   try {
      const userRef = doc(db, 'users', user.uid)
      const userSnapshot = await getDoc(userRef)

      if (userSnapshot.exists()) {
         // Reauthenticate the user with their current password
         const credentials = EmailAuthProvider.credential(
            auth.currentUser.email,
            password
         )

         const reAuthResult = await reauthenticateWithCredential(
            auth.currentUser,
            credentials
         )

         // Update the user's email
         await updateEmail(auth.currentUser, user.email)

         // Update the user document in Firestore
         await updateDoc(userRef, user)
      }
   } catch (error) {
      console.error('error updating user', error)
   }
}

export async function updateDisplayName(displayName, uid) {
   const userRef = doc(db, 'users', uid)
   const userSnapshot = await getDoc(userRef)

   await updateDoc(userRef, { displayName: displayName })
}

export async function updateUserPassword(currentPassword, newPassword) {
   const credentials = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
   )
   try {
      const result = await reauthenticateWithCredential(
         auth.currentUser,
         credentials
      )

      // console.log(result)

      // const passChangeResult = await updatePassword(
      //    auth.currentUser,
      //    newPassword
      // )

      return 'success'
   } catch (error) {
      console.error('error changing password', error)
      return error
   }
}

export async function getNotifications(uid) {
   const notificationsSnapshot = await getDocs(
      collection(db, 'users', uid, 'notifications')
   )

   const notifications = notificationsSnapshot.docs.map((notification) => ({
      id: notification.id,
      ...notification.data(),
      time: useUSDate(notification.data().time.toDate()),
   }))
   return notifications
}

export async function addNotification(notification, uid) {
   try {
      const userNotificationsCol = collection(db, 'users', uid, 'notifications')
      await addDoc(userNotificationsCol, notification)
   } catch (error) {
      console.error('error adding notification', error)
   }
}

export async function addWinningPayment(winningPayment, uid, authToken) {
   try {
      const userWinningPaymentsCol = collection(
         db,
         'users',
         uid,
         'winningPayments'
      )
      await addDoc(userWinningPaymentsCol, winningPayment, {
         headers: {
            Authorization: authToken,
         },
      })
   } catch (error) {
      console.error('error adding winningPayment', error)
   }
}

export async function getWinningPayments(uid, authToken) {
   const winningPaymentSnapshot = await getDocs(
      collection(db, 'users', uid, 'winningPayments'),
      {
         headers: {
            Authorization: authToken,
         },
      }
   )
   const winningPayments = winningPaymentSnapshot.docs.map((payment) => ({
      id: payment.id,
      ...payment.data(),
   }))
   return winningPayments
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return

   return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return

   return await signInWithEmailAndPassword(auth, email, password)
}

export const signInWithGooglePopup = async () => {
   const { user } = await signInWithPopup(auth, googleProvider)
   createUserDocumentFromAuth(user)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) =>
   onAuthStateChanged(auth, callback)

//Pieces Collection

export async function getPiecesCollection() {
   const allPiecesSnapshot = await getDocs(collection(db, 'pieces'))

   const pieces = allPiecesSnapshot.docs.map((piece) => ({
      id: piece.id,
      ...piece.data(),
   }))
   return pieces
}

export async function getPiece(id) {
   const pieceRef = doc(db, 'pieces', id)
   const pieceSnap = await getDoc(pieceRef)

   if (pieceSnap.exists()) {
      return { id, ...pieceSnap.data() }
   } else {
      throw new Error(`No Piece with ID: ${id}`)
   }
}

export async function addPiece(pieceInfo) {
   const newPiece = {
      name: pieceInfo.name,
      description: pieceInfo.description,
      dimensions: pieceInfo.dimensions,
      url: pieceInfo.imageUrl,
      startingBid: pieceInfo.startingBid,
      highestBid: pieceInfo.startingBid,
      auctionEnd: Timestamp.fromDate(new Date(pieceInfo.auctionEnd)),
      dateAdded: serverTimestamp(),
   }

   try {
      const pieceRef = await addDoc(collection(db, 'pieces'), newPiece)
      console.log(`Successfully Added new piece`, pieceRef.id)
   } catch (error) {
      console.error('Error while creating firestore doc for new piece.', error)
   }
}

export async function updatePiece(pieceInfo) {
   const updatedPiece = {
      name: pieceInfo.name,
      dimensions: pieceInfo.dimensions,
      url: pieceInfo.url,
      startingBid: pieceInfo.startingBid,
      highestBid: pieceInfo.startingBid,
      auctionEnd: Timestamp.fromDate(new Date(pieceInfo.auctionEnd)),
      dateUpdated: serverTimestamp(),
   }

   const pieceRef = doc(db, 'pieces', pieceInfo.id)
   await updateDoc(pieceRef, { ...updatedPiece })
}

export async function deletePiece(pieceID) {
   await deleteDoc(doc(db, 'pieces', pieceID))
}

export async function pieceAuctionEnd(pieceId, authToken) {
   const pieceRef = doc(db, 'pieces', pieceId)
   try {
      await updateDoc(
         pieceRef,
         { notified: true },
         {
            headers: {
               Authorization: authToken,
            },
         }
      )
   } catch (error) {
      console.error('error updating notification status for piece.', error)
   }
}
export async function extendTime(pieceId, authToken, days) {
   const pieceRef = doc(db, 'pieces', pieceId)
   try {
      await updateDoc(
         pieceRef,
         {
            auctionEnd: Timestamp.fromDate(
               new Date(today.getTime() + days * 24 * 60 * 60 * 1000)
            ),
         },
         {
            headers: {
               Authorization: authToken,
            },
         }
      )
   } catch (error) {
      console.error('error updating notification status for piece.', error)
   }
}

//Bids Functions

export async function placeBid(user, piece, amount) {
   const timestamp = serverTimestamp()
   const bid = {
      userId: user.uid,
      userName: user.displayName,
      pieceId: piece.id,
      pieceName: piece.name,
      bidAmount: Number(amount),
      bidTime: timestamp,
   }
   const pieceMod = {
      highestBid: Number(amount),
      highestBidderUid: user.uid,
      highestBidder: user.displayName,
      highestBidderEmail: user.email,
      numberOfBids: piece.numberOfBids ? piece.numberOfBids + 1 : 1,
   }
   const userMod = {
      numberOfBids: user.numberOfBids ? user.numberOfBids + 1 : 1,
   }
   const notification = {
      title: 'Outbid',
      text: `You have been outbid for piece ${piece.name}!  The new
      price is now $${bid.bidAmount}.  Go back and place a new bid 
      if you still by clicking the link below to stay in the lead.`,
      time: timestamp,
      read: false,
      visible: true,
      pieceUrl: `/pieces/${piece.id}`,
      pieceName: piece.name,
   }

   await addNotification(notification, piece.highestBidderUid)

   try {
      const bidRef = await addDoc(collection(db, 'bids'), bid)
      const pieceRef = doc(db, 'pieces', piece.id)

      if (piece.highestBidder && piece.highestBidderUid !== user.uid) {
         await outBidEmail(
            piece.highestBidderEmail,
            piece.highestBidder,
            piece.name,
            amount
         )
      }
      await updateDoc(pieceRef, pieceMod)
      const userRef = doc(db, 'users', user.uid)
      await updateDoc(userRef, userMod)
   } catch (error) {
      console.error('Error adding bid', error)
   }
}

//return all bids for one userId ordered by piece
export async function getUserBids(userId) {
   try {
      const bidsCollection = collection(db, 'bids')
      const userBidsQuery = query(
         bidsCollection,
         where('userId', '==', userId),
         orderBy('bidTime', 'desc')
      )
      const snapshot = await getDocs(userBidsQuery)
      const bids = snapshot.docs.map((bid) => ({
         id: bid.id,
         ...bid.data(),
      }))

      return bids
   } catch (error) {
      console.error('Error in userBidQuery ', error)
   }
}

//returns number of bids for a userID
export async function getUserBidCount(userId) {
   try {
      const bidsCollection = collection(db, 'bids')
      const userBidsQuery = query(bidsCollection, where('userId', '==', userId))
      const snapshot = await getCountFromServer(userBidsQuery)
      return snapshot.data().count
   } catch (error) {
      console.error('Error getting user bid count: ', error)
   }
}

export async function getPieceBids(pieceId) {
   //add code to query and return all bids for specified piece
   try {
      const bidsCollection = collection(db, 'bids')
      const pieceBidsQuery = query(
         bidsCollection,
         where('pieceId', '==', pieceId),
         orderBy('bidTime', 'desc')
      )
      const snapshot = await getDocs(pieceBidsQuery)
      const bids = snapshot.docs.map((bid) => ({
         id: bid.id,
         ...bid.data(),
      }))

      return bids
   } catch (error) {
      console.error('Error in userBidQuery ', error)
   }
}

export async function getPieceBidCount(pieceId) {
   try {
      const bidsCollection = collection(db, 'bids')
      const pieceBidsQuery = query(
         bidsCollection,
         where('pieceId', '==', pieceId)
      )
      const snapshot = await getCountFromServer(pieceBidsQuery)
      return snapshot.data().count
   } catch (error) {
      console.error('Error in getPieceBidCount: ', error)
   }
}

export async function userBidsForPiece(userId, pieceId) {
   //add code to query all bids from specified user for specified piece
}

//image storage
const storage = getStorage()

export async function imageUpload(file) {
   const filename = uuidv4()
   const metadata = {
      contentType: 'image/webp',
   }
   try {
      const storageRef = storeRef(
         storage,
         `piece-images/large/${filename}.webp`
      )
      const snapshot = await uploadBytes(storageRef, file, metadata)

      const downloadURL = await getDownloadURL(snapshot.ref)

      if (!downloadURL) {
         throw new Error('Image URL did was not captured')
      }

      return downloadURL
   } catch (error) {
      console.log(error)
   }
}
