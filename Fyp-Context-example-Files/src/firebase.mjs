// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore , collection, addDoc} from "firebase/firestore"; // Import Firestore
import { getStorage } from 'firebase/storage'; // Import Storage


const firebaseConfig = {
  apiKey: "AIzaSyDC0glSHqufJxB5QP47gCH1xBI0Rx3t52g",
  authDomain: "fyp-eduverse.firebaseapp.com",
  projectId: "fyp-eduverse",
  storageBucket: "fyp-eduverse.appspot.com",
  messagingSenderId: "448222352240",
  appId: "1:448222352240:web:ee7685b060746ed3f035b5",
  measurementId: "G-NB49KB69E6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export const storage = getStorage(app);


export const auth = getAuth();

// Function to add questions to Firestore
export const addQuestionsToFirestore = async (quizName, questionsData) => {
  const quizCollectionRef = collection(db, quizName); 
  try {
    questionsData.forEach(async (question) => {
      await addDoc(quizCollectionRef, question);
    });

    console.log("Questions added successfully!");
  } catch (error) {
    console.error("Error adding questions: ", error);
  }
};


export default app;
