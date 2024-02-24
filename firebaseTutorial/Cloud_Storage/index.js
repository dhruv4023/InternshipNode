import admin from "firebase-admin";
import serviceAccount from "../liquid-virtue-370510-firebase-adminsdk-w9cyn-f455ffe729.json" assert { type: "json" };
import { initializeApp } from "firebase/app";
// Initialize Firebase Admin SDK
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: "gs://liquid-virtue-370510.appspot.com",
// });

const firebaseConfig = {
  apiKey: "AIzaSyANUWh_e99OVPwu3x9wxqK734rMRu5ZEVk",
  authDomain: "chatbot-llb.firebaseapp.com",
  projectId: "chatbot-llb",
  storageBucket: "chatbot-llb.appspot.com",
  messagingSenderId: "770281905460",
  appId: "1:770281905460:web:7339e0f9fa6419cf9e5961"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig,bucket="gs://liquid-virtue-370510.appspot.com");


const bucket = app.storage().bucket();

// Path to the local file you want to upload
const filePath = 'file.txt';

// Destination path in Firebase Storage
const destinationPath = 'file.txt';

// Upload file to Firebase Storage
bucket.upload(filePath, {
  destination: destinationPath
})
.then(() => {
  console.log(`File ${filePath} uploaded to ${destinationPath}`);
})
.catch((error) => {
  console.error('Error uploading file:', error);
});