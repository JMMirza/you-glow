import * as dotenv from 'dotenv';
dotenv.config();
import * as admin from 'firebase-admin';
import * as serviceAccount from './firebase-service-account.json';
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

export const firebaseStorage = admin.storage().bucket();