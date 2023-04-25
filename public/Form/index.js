function register() {
  // reference your database
  const users = firebase.database().ref("users");
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  number = document.getElementById('number').value
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable

    // DOne
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })

  document.getElementById("users").addEventListener("submit", submitForm);


function submitForm(e) {
  e.preventDefault();

  var full_name = getElementVal("full_name");
  var email = getElementVal("email");
  var number = getElementVal("number");
  var password = getElementVal("password");

  saveMessages(full_name, email, number, password);
  //   reset the form
  document.getElementById("users").reset();

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

}

var saveMessages = (full_name, email, number, password) => {
  var newContactForm = users.push();

  newContactForm.set({
    full_name: full_name,
    email: email,
    number: number,
    password: password,
    role: "user"
  });
  console.log("user created")
};

var getElementVal = (id) => {
  return document.getElementById(id).value;
};
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser
    window.location.href="../pages/application.html";
    
    console.log(user)

    // Done
    alert('User Logged In!!')

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    console.log(error_message)
  })
}

function post() {
  // reference your database
  
  full_name = document.getElementById('full_name').value
  name = document.getElementById('name').value
  email = document.getElementById('email').value
  number = document.getElementById('number').value
  comment = document.getElementById('comment').value
  
  var services = firebase.database().ref("services");
 
  document.getElementById("comments").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    document.getElementById("comments").removeEventListener("submit", submitForm)
    e.preventDefault();
    var comment = getElementVal("comment");
  
    saveMessages(name, email, number, comment, full_name);
  
    //   reset the form
    document.getElementById("comment").value="";

    //   enable alert
    document.querySelector(".alert").style.display = "block";
  
    //   remove the alert
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 3000);
  }
  
  var saveMessages = (name, email, number, comment, full_name) => {
    var newContactForm = services.push();
    newContactForm.set({
      full_name: full_name,
      title: name,
      email: email,
      number: number,
      comment: comment.replaceAll(">"," "),
      status: "pending"
    });
    console.log("COMMENT POSTED")

  };
  
  var getElementVal = (id) => {
    return document.getElementById(id).value;
  };
}