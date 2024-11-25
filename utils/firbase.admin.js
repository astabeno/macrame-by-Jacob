import firebaseAdmin from 'firebase-admin'

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY

if (!firebaseAdmin.apps.length) {
   firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASEURL,
   })
}
firebaseAdmin.auth()

export default firebaseAdmin
