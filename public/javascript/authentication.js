  // reference your Auth
  const auth = firebase.auth()
var role="user";
// Get the container element for the buttons
var buttonContainer = document.getElementById("button-container");

// Get the logout button element
var logoutButton = document.getElementById("logout-button");

// Get the login and registration button elements
var loginButton = document.getElementById("login-button");
var registerButton = document.getElementById("register-button");

  // Hide the logout button and button container by default
logoutButton.style.opacity = 0;
// buttonContainer.style.display = "none";
  
auth.onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in
         const email = user.email
         getRole(email).then(() => {
            if(location.pathname=="/public/pages/all-applications.html" && !["admin","staff"].includes(role)){
                alert("You are not allowed to access this page.")
                redirectToLogin()
             } else if(location.pathname=="/public/pages/application.html" && !["admin","staff", "user"].includes(role)){
                alert("You need to login first.")
                redirectToLogin()
             }    
             
             // User is logged in, hide the login and registration buttons
             loginButton.style.opacity = 0;
             registerButton.style.opacity = 0;
    
    // Show the logout button and button container
    logoutButton.style.opacity = 1;
    buttonContainer.style.opacity = 1;
            })
        } else {
            if(location.pathname!="/public/Form/login.html" && location.pathname!="/public/Form/Registration.html" && location.pathname!="/public/index.html"){
          redirectToLogin()
            }
             // User is not logged in, show the login and registration buttons
             loginButton.style.opacity = 1;
             registerButton.style.opacity = 1;
    
    // Hide the logout button and button container
    logoutButton.style.opacity = 0;
    // buttonContainer.style.opacity = 1;
        }
      });

  function redirectToLogin(){
    location.href="/public/Form/login.html"
  }

  function getRole(email){
   
    return users.orderByChild("email").equalTo(String(email)).once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          role = childData.role;
          // Do something with the child data
        });
      });
      
  }

  // logout function
function logout(){
    auth.signOut()
    alert("user logged out!")
  }