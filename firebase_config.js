import admin from 'firebase-admin';
import { serviceAccount } from './fireConfig.js'

//init 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chiave5-default-rtdb.europe-west1.firebasedatabase.app"
})

export { admin }