// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgRiZlU_FexZUUL8qpkXa0mgjhAKZ8bVU",
  authDomain: "goodschain-af944.firebaseapp.com",
  projectId: "goodschain-af944",
  storageBucket: "goodschain-af944.appspot.com",
  messagingSenderId: "699172006470",
  appId: "1:699172006470:web:93944174121ac950257847",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
