//  Firebase configuration with project's configuration
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  //database
  connectDB,
  ref,
  get,
  set,
  child,
  update,
  remove,
} from "/source/firebaseinitialization.js";
//firebase auth init
const auth = getAuth();
const provider = new GoogleAuthProvider();
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

//---------------------showpassword template------------------------------------
//---------------------switch signup and login form------------
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
//--------------------------------------------------------------------------
// firebase realtime data base----------------------

const save = (uid, name, email, pwd, mailverification) => {
  set(ref(connectDB, "users/" + uid), {
    uid: uid,
    UserName: name,
    email: email,
    password: pwd,
    emailVerified: mailverification,
  })
    .then(() => {
      console.log("successfully sent sugn up data");
    })
    .catch((e) => {
      console.log("un success", e);
    });
};

// save("3", "ivbd", "@gmail.nxisj", "whfyew", false);
// const select = (uid) => {
//   let dbref = firebase.database();

//   getAuth(child(ref(dbref, "users/" + uid)))
//     .then((snapshot) => {
//       if (snapshot.exist()) {
//         console.log("data selected ");
//       } else {
//         console.log("no data found ");
//       }
//     })
//     .catch((e) => {
//       console.log(e);
//     });
//   // console.log(e);
// };
// select("1");

// ------------------------------------------------------------
// Login form
var loginForm = document.getElementById("login-form");
var loginForm_btn = document.getElementById("login-btn");
var loginEmail = document.getElementById("login-email");
var loginPassword = document.getElementById("login-password");
var loginError = document.getElementById("login-error");

//google provider log in--------------------------------
//add Display:None for err message template
function add_none(WhichELPerformEventListener, whereTOAddclass) {
  WhichELPerformEventListener.addEventListener("focus", () => {
    whereTOAddclass.classList.add("d-none");
  });
}
add_none(loginEmail, loginError);
add_none(loginPassword, loginError);
document.getElementById("google-login").addEventListener("click", (e) => {
  e.preventDefault();
  loginError.classList.add("d-none");
  loginForm_btn.setAttribute("disabled", "true");
  loginForm_btn.children[0].classList.add("fa-spinner", "fa-spin");
  signInWithPopup(auth, provider)
    .then((result) => {
      loginForm_btn.children[0].classList.remove("fa-spinner", "fa-spin");
      loginForm_btn.removeAttribute("disabled");
      loginError.classList.remove("d-none");

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // console.log(token);

      loginError.innerHTML = `<div class="alert" style="background-color: #53f877 !important;" >Login Successfully...<i class="fa fa-spinner fa-spin"></i></div>`;
      localStorage.setItem("userid<@#(1029384756)#@>", result.user.uid);
      localStorage.setItem(
        "userEmail<@#(0192837465)#@>",
        JSON.stringify(result.user)
      );

      save(
        user.uid,
        user.displayName,
        user.email,
        "Login with google",
        user.emailVerified
      );
      setTimeout(() => {
        location.replace("mainpage.html");
      }, 1500);

      // console.log("user name", user.displayName);
      // console.log("user details", user);
      // console.log("user mail", user.email);
      // console.log("user verified", user.emailVerified);
      // console.log("user pic", user.photoURL);
      console.log("user credential", credential);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      loginForm_btn.children[0].classList.remove("fa-spinner", "fa-spin");
      loginForm_btn.removeAttribute("disabled");
      loginError.classList.remove("d-none");
      if (
        error.code == "auth/popup-closed-by-user" ||
        error.code == "auth/cancelled-popup-request"
      ) {
        loginError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>Something Went Wrong! please try again</div>`;
      } else if (error.code == "auth/popup-blocked") {
        loginError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>Your Browser may Block the Pop-up</div>`;
      } else {
        loginError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>${error.message}</div>`;
      }

      console.log(error.code);
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});

//perform login form action
loginForm_btn.addEventListener("click", (e) => {
  e.preventDefault();
  loginError.classList.remove("d-none");

  loginForm_btn.setAttribute("disabled", "true");
  loginForm_btn.children[0].classList.add("fa-spinner", "fa-spin");
  let email = loginEmail.value;
  let password = loginPassword.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userdetails) => {
      loginForm_btn.children[0].classList.remove("fa-spinner", "fa-spin");
      loginForm_btn.removeAttribute("disabled");
      // console.log("new", auth.currentUser);
      // loginError.innerHTML = "<b style='color:green'>Login Successfully!</b>" ;
      // console.log(JSON.stringify(user));
      console.log(userdetails);
      console.log(userdetails.user.email);
      console.log(userdetails.user.emailVerified);
      if (!userdetails.user.emailVerified) {
        alert(
          "Please verify your email otherwise,you will not be able to login"
        );

        if (confirm("if you want to send Email verification...")) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              alert("Verification Mail Sent Successfully!");
            })
            .catch((e) => {
              console.log(
                "something went wrong in while sending verification mail",
                e
              );
            });
        } else {
          console.log("user denied to send verification mail..");
          alert("If already sent please check your mail id");
        }
      } else {
        loginError.innerHTML = `<div class="alert" style="background-color: #53f877 !important;" >Login Successfully...<i class="fa fa-spinner fa-spin"></i></div>`;
        localStorage.setItem("userid<@#(1029384756)#@>", userdetails.user.uid);
        localStorage.setItem(
          "userEmail<@#(0192837465)#@>",
          JSON.stringify(userdetails.user)
        );

        setTimeout(() => {
          location.replace("mainpage.html");
        }, 1500);
      }
    })
    .catch((e) => {
      // Handle login errors
      loginForm_btn.children[0].classList.remove("fa-spinner", "fa-spin");
      loginForm_btn.removeAttribute("disabled");

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
        loginError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>Too many request <br>please try after sometimes</div>`;
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
// -----------------------------------------

// function SendOTPMail(mail) {
//   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
//     document.getElementById("SendOtp").style.display = "none";
//     RandomOtp = Math.floor(Math.random() * (100000 - 999999)) + 999999;
//     console.log(RandomOtp);
//     otp.value = RandomOtp;
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
//     return true;
//   }
//   alert("You have entered an invalid email address!");
//   return false;
// }
// document.getElementById("SendOtp").addEventListener("click", (e) => {
//   SendOTPMail(signupEmail.value);
//   e.preventDefault();
// });
// document.getElementById("s").addEventListener("click", (e) => {
//   e.preventDefault();
//   document.getElementById("SendOtp").style.display = "block";
// });
// var otp = document.getElementById("otp");
// var RandomOtp = null;

// Sign up form

var signupForm = document.getElementById("signup-form");
var signupName = document.getElementById("signup-name");
var signupEmail = document.getElementById("signup-mail");
var signupPassword = document.getElementById("signup-pwd");
var signupConfirmPassword = document.getElementById("confirm-password");
var signupError = document.getElementById("signup-error");
let signup_btn = document.getElementById("signup_btn");
add_none(signupName, signupError);
add_none(signupEmail, signupError);
add_none(signupPassword, signupError);
add_none(signupConfirmPassword, signupError);

// signup process done here...
signup_btn.addEventListener("click", function (event) {
  event.preventDefault();
  signupError.classList.remove("d-none");
  signup_btn.setAttribute("disabled", "true");
  signup_btn.children[0].classList.add("fa-spinner", "fa-spin");
  // store data in firebase database...............
  var name = signupName.value;
  var email = signupEmail.value;
  var password = signupPassword.value;
  var confirmPassword = signupConfirmPassword.value;

  // Add validation logic for password and confirm password match
  if (password !== confirmPassword) {
    signupError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>password do not match</div>`;
    signup_btn.children[0].classList.remove("fa-spinner", "fa-spin");
    signup_btn.removeAttribute("disabled");

    setTimeout(() => {
      signupError.innerHTML = "";
    }, 4000);
  } else if (
    name === "" ||
    email === "" ||
    confirmPassword === "" ||
    password === ""
  ) {
    signup_btn.children[0].classList.remove("fa-spinner", "fa-spin");
    signup_btn.removeAttribute("disabled");

    signupError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>*Please fill all Required fields</div>`;
    setTimeout(() => {
      signupError.innerHTML = "";
    }, 5000);
  }
  //  else if (Number(otp.value) !== RandomOtp) {
  //   signupError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>Invalid OTP!</div>`;
  //   setTimeout(() => {
  //     signupError.innerHTML = "";
  //   }, 4000);

  //   console.log("invalid Otp", RandomOtp, otp.value);
  // }
  else {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userdetails) => {
        // Sign up successful, redirect or perform additional actions
        signup_btn.children[0].classList.remove("fa-spinner", "fa-spin");
        signup_btn.removeAttribute("disabled");

        console.log(userdetails.user.email);
        console.log(auth.currentUser);
        sendEmailVerification(auth.currentUser)
          .then(() => {
            alert("Verification Mail Sent Successfully!");
          })
          .catch((e) => {
            console.log("error occur in signup verification mail", e);
          });
        save(
          userdetails.user.uid,
          name,
          userdetails.user.email,
          password,
          userdetails.user.emailVerified
        );

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
        signup_btn.children[0].classList.remove("fa-spinner", "fa-spin");
        signup_btn.removeAttribute("disabled");

        if (e.code === "auth/network-request-failed") {
          loginError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>Login Failed Due to Network Issue</div>`;
        } else if (e.code === "auth/email-already-in-use") {
          signupError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>Email id is already Exists</div>`;
        } else if (e.code === "auth/invalid-email") {
          signupError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>Invalid Mailid</div>`;
        } else {
          signupError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>${e.message}</div>`;
        }

        setTimeout(() => {
          signupError.innerHTML = "";
        }, 7000);
      });
  }
});
