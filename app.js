// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_1k5m_Xvz_JPlZ_9ZOR52UJUQWZKxfxo",
  authDomain: "login-1ca6e.firebaseapp.com",
  projectId: "login-1ca6e",
  storageBucket: "login-1ca6e.firebasestorage.app",
  messagingSenderId: "230736267753",
  appId: "1:230736267753:web:ddd5e59c36a6e360136378"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Function to handle user login/signup
async function handleLogin(user) {
  const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);
  
  let score = 0;
  if (userDoc.exists()) {
    score = userDoc.data().score || 0;
  }

  await setDoc(userRef, {
    name: user.displayName || "User",
    email: user.email,
    profilePic: user.photoURL || "default-profile.png",
    score: score
  }, { merge: true });

  localStorage.setItem("user", JSON.stringify({
    uid: user.uid,
    name: user.displayName || "User",
    email: user.email,
    profilePic: user.photoURL || "default-profile.png",
    score: score
  }));

  window.location.href = "landing.html";
}

// Email/Password Authentication
document.getElementById("auth-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const isSignUp = document.getElementById("toggle-auth").textContent.includes("Sign Up");

  try {
    let userCredential;
    if (isSignUp) {
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
    } else {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    }
    handleLogin(userCredential.user);
  } catch (error) {
    document.getElementById("error-message").textContent = "❌ " + error.message;
  }
});

// Google Authentication
document.getElementById("google-auth").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    handleLogin(result.user);
  } catch (error) {
    document.getElementById("error-message").textContent = "❌ Google Sign-In Error: " + error.message;
  }
});

// Toggle between Sign In and Sign Up
document.getElementById("toggle-auth").addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.getElementById("form-title");
  const submitBtn = document.querySelector(".auth-btn");
  
  if (title.textContent === "Sign In") {
    title.textContent = "Sign Up";
    submitBtn.textContent = "Sign Up";
    e.target.textContent = "Already have an account? Sign In";
  } else {
    title.textContent = "Sign In";
    submitBtn.textContent = "Sign In";
    e.target.textContent = "Don't have an account? Sign Up";
  }
});
