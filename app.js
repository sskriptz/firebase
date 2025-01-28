// Import Firebase
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

// Check if the user is logged in and handle redirection on page load
onAuthStateChanged(auth, (user) => {
  if (user) {
    // If logged in, redirect to homepage or dashboard without `.html`
    window.location.replace("/firebase"); // Redirecting without `.html`
  } else {
    console.log("No user is signed in.");
  }
});

// Function to handle successful login
function handleLogin(user) {
  // Store user data in localStorage
  localStorage.setItem("user", JSON.stringify({
    name: user.displayName || "User",
    email: user.email,
    profilePic: user.photoURL || "default-profile.png"
  }));
  // Redirect to the home/dashboard page without `.html`
  window.location.replace("/firebase"); // Redirecting without `.html`
}

// Sign Up / Sign In Handling
document.getElementById("auth-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const isSignUp = document.getElementById("isSignUp").checked; // Assuming you have a checkbox to toggle sign-up/login

    if (isSignUp) {
      // Sign Up
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      handleLogin(userCredential.user);
    } else {
      // Login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      handleLogin(userCredential.user);
    }
  } catch (error) {
    document.getElementById("error-message").textContent = "❌ Error: " + error.message;
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

// Handle Logout
document.getElementById("logout").addEventListener("click", async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("user"); // Remove user data from localStorage
    // Redirect to login page after logout
    window.location.replace("/firebase/login"); // Redirect to the login page without `.html`
  } catch (error) {
    console.error("Logout error:", error.message);
  }
});
