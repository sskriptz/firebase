// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

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

// Get Form Elements
const authForm = document.getElementById("auth-form");
const googleAuthBtn = document.getElementById("google-auth");
const formTitle = document.getElementById("form-title");
const authBtn = document.querySelector(".auth-btn");
const toggleText = document.getElementById("toggle-text");
const errorMessage = document.getElementById("error-message");

let isSignUp = false;

// 🛠 Fix: Ensure event listeners persist even after HTML changes
document.addEventListener("click", (e) => {
  if (e.target.id === "toggle-auth") {
    e.preventDefault();
    isSignUp = !isSignUp;
    formTitle.textContent = isSignUp ? "Sign Up" : "Sign In";
    authBtn.textContent = isSignUp ? "Sign Up" : "Sign In";
    toggleText.innerHTML = isSignUp
      ? `Already have an account? <a href="#" id="toggle-auth">Sign In</a>`
      : `Don't have an account? <a href="#" id="toggle-auth">Sign Up</a>`;
  }
});

// 🛠 Fix: Ensure form submission is handled properly
authForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form behavior
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  try {
    if (isSignUp) {
      // 🔥 Sign Up with Email/Password
      await createUserWithEmailAndPassword(auth, email, password);
      alert("✅ Account created successfully!");
    } else {
      // 🔥 Sign In with Email/Password
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Login successful!");
    }
  } catch (error) {
    errorMessage.textContent = "❌ Error: " + error.message;
    console.error(error);
  }
});

// 🔥 Google Authentication
googleAuthBtn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
    alert("✅ Google Sign-In successful!");
  } catch (error) {
    errorMessage.textContent = "❌ Google Sign-In Error: " + error.message;
    console.error(error);
  }
});
