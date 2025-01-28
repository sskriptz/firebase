// Firebase configuration
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Get elements
  const loginPage = document.getElementById("loginPage");
  const signupPage = document.getElementById("signupPage");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const loginStatus = document.getElementById("loginStatus");
  const signupStatus = document.getElementById("signupStatus");
  
  // Switch to Sign-Up Page
  document.getElementById("goToSignup").addEventListener("click", () => {
    loginPage.style.display = "none";
    signupPage.style.display = "block";
  });
  
  // Switch to Login Page
  document.getElementById("goToLogin").addEventListener("click", () => {
    signupPage.style.display = "none";
    loginPage.style.display = "block";
  });
  
  // Handle Login
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        loginStatus.textContent = "Logged in successfully!";
        loginStatus.style.color = "green";
        console.log("User:", userCredential.user);
      })
      .catch((error) => {
        loginStatus.textContent = `Error: ${error.message}`;
        loginStatus.style.color = "red";
      });
  });
  
  // Handle Sign-Up
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
  
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        signupStatus.textContent = "Account created successfully!";
        signupStatus.style.color = "green";
        console.log("User:", userCredential.user);
      })
      .catch((error) => {
        signupStatus.textContent = `Error: ${error.message}`;
        signupStatus.style.color = "red";
      });
  });
  
