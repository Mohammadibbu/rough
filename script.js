import firebaseConfig from "./source/firebaseinitialization.js";
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// window.onload=()=>{
//   render();
// }
// function render(){
//   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container");
//   recaptchaVerifier.render();
// }
// document.getElementById("sendotp").addEventListener("click",(e)=>{
//   let number="+91"+8270230603;
//   let app=window.recaptchaVerifier;
//   console.log(number);
//   firebase.auth().signInWithPhoneNumber(number,app)
//   .then((confirmResult)=>
//   {
//     window.confirmResult=confirmResult;
//     var coderesult=confirmResult;
//     console.log(coderesult)
//   }).catch((e)=>{
//     console.log(e)
//     alert(e.message)
//   })
//   // const code = 789456;
//   // confirmationResult.confirm(code).then((result) => {
//   //   // User signed in successfully.
//   //   const user = result.user;
//   //   console.log(user);
//   //   // ...
//   // }).catch((error) => {
//   //   // User couldn't sign in (bad verification code?)
//   //   // ...
//   //   alert(e.message)

//   // });
// });

// -------------showpassword Template--------------------

let showpassword = (showpwdElId, styleclassElId) => {
  var x = document.getElementById(`${showpwdElId}`);
  document.getElementById(`${styleclassElId}`).classList.toggle("fa-eye-slash");
  if (x.type === "password") {
    // navigator.vibrate([50]);
    x.type = "text";
  } else {
    // navigator.vibrate([50]);
    x.type = "password";
  }
};

//-----------------------------------------------------

document
  .querySelector(".signup-link a")
  .addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".login-form").style.display = "none";
    document.querySelector(".signup-form").style.display = "block";
  });

document.querySelector(".login-link a").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".login-form").style.display = "block";
  document.querySelector(".signup-form").style.display = "none";
});

// Login form
var loginForm = document.getElementById("login-form");
var loginForm_btn = document.getElementById("login-btn");
var loginEmail = document.getElementById("login-email");
var loginPassword = document.getElementById("login-password");
var loginError = document.getElementById("login-error");

//perform form action
loginForm_btn.addEventListener("click", (e) => {
  e.preventDefault();

  let email = loginEmail.value;
  let password = loginPassword.value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      // Login successful, redirect or perform additional actions
      // loginError.innerHTML = "<b style='color:green'>Login Successfully!</b>" ;
      console.log(JSON.stringify(user));
      loginError.innerHTML = `<div class="alert" style="background-color: #53f877 !important;" >Login Successfully...<i class="fa fa-spinner fa-spin"></i></div>`;
      localStorage.setItem("user", JSON.stringify(user));
      // localStorage.setItem("password", password);

      setTimeout(() => {
        location.replace("mainpage.html");
      }, 1500);

      // if (localStorage.getItem("Email") == email) {
      //   location.replace("mainpage.html");
      // }
      // setTimeout(() => {
      // location.replace("mainpage.html")

      // }, 2500);
      // setTimeout(() => {
      //   localStorage.clear();

      //   }, 5500);
    })
    .catch((e) => {
      // Handle login errors

      console.log(e);
      if (email === "" || password === "") {
        loginError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>*Please fill all Required fields</div>`;
      } else if (e.code === "auth/invalid-email") {
        loginError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>invalid mail id</div>`;
      } else if (e.code === "auth/user-disabled") {
        loginError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>Your account has been suspended Please Contact Admin</div>`;
      } else if (e.code === "auth/user-not-found") {
        loginError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>No User found in this mail-id\nplease sign-up</div>`;
      } else if (e.code === "auth/wrong-password") {
        loginError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>Wrong Password</div>`;
      } else if (e.code === "auth/network-request-failed") {
        loginError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>Login Failed Due to Network Issue</div>`;
      } else if (e.code === "auth/too-many-requests") {
        loginError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>${e.message}</div>`;
      } else {
        loginError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>${e.message}</div>`;
      }

      setTimeout(() => {
        loginError.innerHTML = "";
      }, 10000);

      // }
    });
});
//------------showpassword Process Here-------------------
const showpwd = document.getElementById("login-showpwd");
const signUpShowpwd = document.getElementById("signup-showpwd");
const signUpConfirmShowpwd = document.getElementById("signupCnfrm-showpwd");

showpwd.addEventListener("click", (e) => {
  e.preventDefault();
  showpassword("login-password", "eye-1");
});
signUpShowpwd.addEventListener("click", (e) => {
  e.preventDefault();
  showpassword("signup-pwd", "eye-2");
});
signUpConfirmShowpwd.addEventListener("click", (e) => {
  e.preventDefault();
  showpassword("confirm-password", "eye-3");
});
// ------------------------------------------------------------>>?

// document.getElementById("login-email").addEventListener("focus", (e) => {
//   document.getElementById("login-email").removeAttribute("placeholder");
// });
// document.getElementById("login-email").addEventListener("blur", (e) => {
//   document
//     .getElementById("login-email")
//     .setAttribute("placeholder", "example321@gmail.com");
// });
// document.getElementById("login-password").addEventListener("focus", (e) => {
//   document.getElementById("login-password").removeAttribute("placeholder");
// });
// document.getElementById("login-password").addEventListener("blur", (e) => {
//   document
//     .getElementById("login-password")
//     .setAttribute("placeholder", "*******");
// });
//email.js
// function sendOtp(mail, otp) {
//   var params = {
//     ToEmail: mail,
//     message: otp,
//   };

//   // console.log(params);
//   emailjs
//     .send("service_0qguk7m", "template_q8tiidj", params, "Wv2X6C6WGZ-K-YYKL")
//     .then(
//       function (response) {
//         console.log("SUCCESS!", response.status, response.text);
//       },
//       function (error) {
//         if (error.status == 422) {
//           alert("Please enter the mail id");
//         }
//         console.log("FAILED...", error);
//       }
//     );
// }
// Sign up form
function SendOTPMail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    document.getElementById("SendOtp").style.display = "none";
    RandomOtp = Math.floor(Math.random() * (100000 - 999999)) + 999999;
    console.log(RandomOtp);
    otp.value = RandomOtp;
    // var params = {
    //   ToEmail: signupEmail.value,
    //   message: RandomOtp,
    // };

    // // console.log(params);
    // emailjs
    //   .send("service_0qguk7m", "template_q8tiidj", params, "Wv2X6C6WGZ-K-YYKL")
    //   .then(
    //     function (response) {
    //       console.log("SUCCESS!", response.status, response.text);
    //     },
    //     function (error) {
    //       if (error.status == 422) {
    //         signupError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>please enter Mail id For otp verification</div>`;
    //       }
    //       console.log("FAILED...", error);
    //     }
    //   );
    return true;
  }
  alert("You have entered an invalid email address!");
  return false;
}
var signupForm = document.getElementById("signup-form");
var signupName = document.getElementById("signup-name");
var signupEmail = document.getElementById("signup-mail");
var signupPassword = document.getElementById("signup-pwd");
var signupConfirmPassword = document.getElementById("confirm-password");
var signupError = document.getElementById("signup-error");
var otp = document.getElementById("otp");
var RandomOtp = null;
document.getElementById("SendOtp").addEventListener("click", (e) => {
  SendOTPMail(signupEmail.value);
  e.preventDefault();
});

document.getElementById("signup").addEventListener("click", function (event) {
  event.preventDefault();

  var name = signupName.value;
  var email = signupEmail.value;
  var password = signupPassword.value;
  var confirmPassword = signupConfirmPassword.value;
  var contactformDB = firebase.database().ref("user");
  const save = (name, email, pwd) => {
    var newform = contactformDB.push();
    newform.set({
      UserName: name,
      email: email,
      password: pwd,
    });
  };

  // Add validation logic for password and confirm password match
  if (password !== confirmPassword) {
    signupError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>password do not match</div>`;
    setTimeout(() => {
      signupError.innerHTML = "";
    }, 4000);
  } else if (
    name === "" ||
    email === "" ||
    confirmPassword === "" ||
    password === "" ||
    otp.value == ""
  ) {
    signupError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>*Please fill all Required fields</div>`;
    setTimeout(() => {
      signupError.innerHTML = "";
    }, 5000);
  } else if (Number(otp.value) !== RandomOtp) {
    signupError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>Invalid OTP!</div>`;
    setTimeout(() => {
      signupError.innerHTML = "";
    }, 4000);

    console.log("invalid Otp", RandomOtp, otp.value);
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function () {
        // Sign up successful, redirect or perform additional actions
        save(name, email, password);
        signupError.innerHTML = `<div class="alert" style="background-color: green !important;" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>sign up successfully</div>`;
        setTimeout(() => {
          signupForm.reset();
          signupError.innerHTML = "";

          document.querySelector(".login-form").style.display = "block";
          document.querySelector(".signup-form").style.display = "none";
        }, 2000);
      })
      .catch(function (e) {
        // Handle sign up errors
        console.log(e);
        if (e.code === "auth/network-request-failed") {
          loginError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>Login Failed Due to Network Issue</div>`;
        } else {
          signupError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>${e.message}</div>`;
        }

        setTimeout(() => {
          signupError.innerHTML = "";
        }, 7000);
      });
  }
});

document.getElementById("s").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("SendOtp").style.display = "block";
});
