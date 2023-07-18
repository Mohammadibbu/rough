

// Replace the Firebase configuration with your own project's configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvSaKQo98k6DSzrG01bLjkOeYoeq4E7DY",
  authDomain: "water-level-indicator-14606.firebaseapp.com",
  projectId: "water-level-indicator-14606",
    databaseURL:"https://water-level-indicator-14606-default-rtdb.firebaseio.com/",
  storageBucket: "water-level-indicator-14606.appspot.com",

  messagingSenderId: "56987502786",
  appId: "1:56987502786:web:fdf8ea92b2f14bdec1935b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

window.onload=()=>{
  render();
}
function render(){
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container");
  recaptchaVerifier.render();
}
document.getElementById("sendotp").addEventListener("click",(e)=>{
  let number="+91"+8270230603;
  let app=window.recaptchaVerifier;
  console.log(number);
  firebase.auth().signInWithPhoneNumber(number,app)
  .then((confirmResult)=>
  {
    window.confirmResult=confirmResult;
    var coderesult=confirmResult;
    console.log(coderesult)
  }).catch((e)=>{
    console.log(e)
    alert(e.message)
  })
  // const code = 789456;
  // confirmationResult.confirm(code).then((result) => {
  //   // User signed in successfully.
  //   const user = result.user;
  //   console.log(user);
  //   // ...
  // }).catch((error) => {
  //   // User couldn't sign in (bad verification code?)
  //   // ...
  //   alert(e.message)

  // });
});

document.querySelector('.signup-link a').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('.login-form').style.display = 'none';
  document.querySelector('.signup-form').style.display = 'block';
});

document.querySelector('.login-link a').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('.login-form').style.display = 'block';
  document.querySelector('.signup-form').style.display = 'none';
});

  // Login form
  var loginForm = document.getElementById("login-form");
  var loginEmail = document.getElementById("login-email");
  var loginPassword = document.getElementById("login-password");
  var loginError = document.getElementById("login-error");
  
  loginForm.addEventListener("submit", (e)=> {
    e.preventDefault();

    let email = loginEmail.value;
    let password = loginPassword.value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(()=> {
        // Login successful, redirect or perform additional actions
        loginError.innerHTML = "<b style='color:green'>Login Successfully!</b>" ;


      })
      .catch((e)=> {
        // Handle login errors
        console.log(e)
        if(email==="" || password===""){
          loginError.innerHTML = "<b style='color:red'> Please fill all Required fields</b>" ;

        }
        else if (e.code==="auth/invalid-email"){
           loginError.innerHTML = "<b style='color:red'> invalid mail id</b>" ;
        }else if(e.code==="auth/user-disabled"){
          loginError.innerHTML = `<b style='color:red'>Your account has been suspended Please Contact Admin</b>` ;
        }else if(e.code==="auth/user-not-found"){
          loginError.innerHTML = `<b style='color:red'>No User found in this mail-id\nplease sign-up</b>` ;

        }else if(e.code==="auth/wrong-password"){
          loginError.innerHTML = `<b style='color:red'>Wrong Password</b>` ;

        }
        else if(e.code==="auth/too-many-requests"){
          loginError.innerHTML = `<b style='color:red'>${e.message}</b>` ;

        }else{
          loginError.innerHTML = `<b style='color:red'>${e.message}</b>` ;

        }
        
        
          setTimeout(() => {
          loginError.innerHTML = "" ;
            
          }, 10000);

        // }
      });
  });
  // document.getElementById("showpwd").addEventListener("click",(e)=>{
  //   var x = document.getElementById("login-password");
  //   if (x.type === "password") {
  //     navigator.vibrate([50]);
  //     x.type = "text";
  //   } else {
  //     navigator.vibrate([50]);
  //     x.type = "password";
  //   }
  // }
  // );
  
 // Sign up form
 var signupForm = document.getElementById("signup-form");
 var signupName = document.getElementById("signup-name");
 var signupEmail = document.getElementById("signup-mail");
 var signupPassword = document.getElementById("signup-pwd");
 var signupConfirmPassword = document.getElementById("confirm-password");
 var signupError = document.getElementById("signup-error");
 
 signupForm.addEventListener("submit", function(event) {
   
   event.preventDefault();
   
   var name = signupName.value;
   var email = signupEmail.value;
   var password = signupPassword.value;
   var confirmPassword = signupConfirmPassword.value;
  var contactformDB=firebase.database().ref('user');
   const save= (name,email,pwd)=>{
   var newform=contactformDB.push();
   newform.set({
       UserName :name,
       email:email,
       password:pwd
   });
   };
   
   // Add validation logic for password and confirm password match
   if (password !== confirmPassword) {

    signupError.innerHTML = `<b style='color:red'>Passwords do not match</b>` ;
    setTimeout(() => {
      signupError.innerHTML = "" ;
        
      }, 4000);
     return;
   }
 
   firebase.auth().createUserWithEmailAndPassword(email, password)
     .then(function() {
       // Sign up successful, redirect or perform additional actions
       save(name,email,password);
       alert("Sign up successful!");
       document.querySelector('.login-form').style.display = 'block';
  document.querySelector('.signup-form').style.display = 'none';
  
     })
     .catch(function(e) {
       // Handle sign up errors
       console.log(e)
       if(name==="" ||email==="" ||confirmPassword==="" || password===""){
        signupError.innerHTML = "<b style='color:red'> Please fill all Required fields</b>" ;

      }else{
        signupError.innerHTML = `<b style='color:red'>${e.message}</b>` ;

      }
       

          setTimeout(() => {
            signupError.innerHTML = "" ;
            
          }, 10000);
     });
 });
 