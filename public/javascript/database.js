var prepareTemplate = (id, name, email, phone, comment, status) => `
<br>
<li>
  <article>
    <address>By <a id="name">${name}</a></address>
    <a id="number">${phone}</a>
    <br>
    <a id="email">${email}</a></header>
    <div>
      <p id="comment">${comment}</p>
      <p class="${status}">${status}</p>
    </div>
    <div style="display: flex; flex-direction:row; justify-conent:space-between;">
    ${ location.pathname=="/public/pages/all-applications.html"?`
        ${status=="pending"?`<div class="primary-btn" onclick="acceptApplication('${id}')">Accept</div>`:""}
        ${status=="pending" && role=="admin"?`<div class="secondary-btn" onclick="deleteApplication('${id}','${email}', '${name}')">Delete</div>`:""}`
        :""
    }
    </div>
  </article>
</li>`
function getData(email = "") {

  console.log("Listening changes...")

  services.on('child_added', (snapshot) => {
    const comment = snapshot.val();
    const id = snapshot.key;
    if (location.pathname == "/public/pages/all-applications.html") {
      const commentHtml = prepareTemplate(id, comment.title, comment.email, comment.number, comment.comment, comment.status)

      document.getElementById("comments_list").innerHTML += commentHtml
    } else if (location.pathname == "/public/pages/my-applications.html" && comment.email == email) {
      const commentHtml = prepareTemplate(id, comment.title, comment.email, comment.number, comment.comment, comment.status)

      document.getElementById("comments_list").innerHTML += commentHtml
    }
  });
  services.on('child_changed', (snapshot) => {
    const comment = snapshot.val();
    if (location.pathname == "/public/pages/all-applications.html") {
      const commentHtml = prepareTemplate(comment.full_name, comment.email, comment.number, comment.comment, comment.status)
      document.getElementById("comments_list").innerHTML += commentHtml
    }
  });
  services.on('child_removed', (snapshot) => {
    const comment = snapshot.val();
    if (location.pathname == "/public/pages/all-applications.html") {
      const commentHtml = prepareTemplate(comment.full_name, comment.email, comment.number, comment.comment, comment.status)
      document.getElementById("comments_list").innerHTML = document.getElementById("comments_list").innerHTML.replace(commentHtml, "")
    }
  });
}


auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in
    const email = user.email
    getRole(email).then(() => {
      getData(email)
      if (location.pathname == "/public/pages/all-applications.html"  && !["admin", "staff"].includes(role)) {
        alert("You are not allowed to access this page.")
        redirectToLogin()
      } else if (location.pathname == "/public/pages/application.html" && !["admin", "staff", "user"].includes(role)) {
        alert("You need to login first.")
        redirectToLogin()
      }
    })
  } else {
    if (location.pathname != "/public/Form/login.html" && location.pathname != "/public/Form/Registration.html" && location.pathname != "/public/index.html") {
      redirectToLogin()
    }

    // Hide the logout button
    logoutButton.style.display = "none";
  }
});

function acceptApplication(id){
  const commentRef = services.child(id)
  commentRef.once("value").then((snapshot)=>{
    var comment = snapshot.val()
    comment["status"]="approved"
    commentRef.update({...comment})
    .then((success)=>{
      alert("Approved Successfully!")
      location.reload()
    })
    .catch((error) => {
      alert("Error while approving: " + error.message)
      console.error(error);
    });
  })
}

function deleteApplication(id, email, name){
  const commentRef = services.child(id)
    commentRef.remove()
    .then((success)=>{
      alert("Removed Successfully!")
      Email.send({
        Host : "smtp.elasticemail.com",
        Username : `vedant.milind.deshpande@gmail.com`,
        Password : "3DE81FEBE4FB3C658FF7DB4D7533E2D736A5",
        To : `${email}`,
        From : "vedant.milind.deshpande@gmail.com",
        Subject : "Test email",
        Body : `Your ${name} service is be rejected.`
      }).then(
        message => alert(message) && location.reload()
      )
      .catch((error) => {
        alert("Error while sending email: " + error.message)
        console.error(error);
      });
    })
    .catch((error) => {
      alert("Error while Deleting the comment: " + error.message)
      console.error(error);
    });
      
}

