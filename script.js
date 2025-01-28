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
  const loginForm = document.getElementById("loginForm");
  const loginStatus = document.getElementById("loginStatus");
  
  // Handle login
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
  
  // Handle signup link
  document.getElementById("signupLink").addEventListener("click", () => {
    const email = prompt("Enter your email:");
    const password = prompt("Enter your password:");
  
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("Account created successfully!");
        console.log("User:", userCredential.user);
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  });
  
