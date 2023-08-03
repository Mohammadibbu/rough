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
} from "./source/firebaseinitialization.js";
//firebase auth init
const auth = getAuth();
const provider = new GoogleAuthProvider();
window.onload = () => {
  sessionStorage.removeItem("userid<@#(1029384756)#@>");
  sessionStorage.removeItem("userEmail<@#(0192837465)#@>");
};
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
//clear all session storage
// window.onload = ;
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

const save = (uid, name, email, pwd, mailverification, loginValue) => {
  set(ref(connectDB, "users/" + uid), {
    uid: uid,
    UserName: name,
    email: email,
    password: pwd,
    emailVerified: mailverification,
    UserLoggedIn: loginValue,
  })
    .then(() => {
      console.log("successfully sent sign up data");
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
var LoginWithGoogle = document.getElementById("google-login");
//google provider log in--------------------------------
//add Display:None for err message template
function add_none(WhichELPerformEventListener, whereTOAddclass) {
  WhichELPerformEventListener.addEventListener("focus", () => {
    whereTOAddclass.classList.add("d-none");
  });
}
//button disable and enable Code Here.....----------------
function btnDisableOrEnable(Element) {
  if (!Element.hasAttribute("disabled")) {
    Element.setAttribute("disabled", "true");
    Element.style.cursor = "not-allowed";
  } else {
    Element.removeAttribute("disabled");
    Element.style.removeProperty("cursor");
  }
}

//funtion setEmail verify
function setEmailVerify(data, refid) {
  //update data emailverified==true....
  !data.emailVerified == true
    ? update(child(ref(connectDB), "users/" + refid), {
        emailVerified: true,
      })
        .then(() => {
          console.log("send verified");
        })
        .catch((e) => {
          alert(e);
        })
    : console.log("mailid already verified true");
}
// ---------------------------------------------------------
add_none(loginEmail, loginError);
add_none(loginPassword, loginError);
//login with google......
LoginWithGoogle.addEventListener("click", (e) => {
  e.preventDefault();
  navigator.vibrate([100]);

  loginError.classList.add("d-none");
  //when click the button BUtton will disabled
  btnDisableOrEnable(loginForm_btn);
  btnDisableOrEnable(LoginWithGoogle);
  loginForm_btn.children[0].classList.add("fa-spinner", "fa-spin");
  signInWithPopup(auth, provider)
    .then((result) => {
      loginForm_btn.children[0].classList.remove("fa-spinner", "fa-spin");
      btnDisableOrEnable(loginForm_btn);
      btnDisableOrEnable(LoginWithGoogle);
      loginError.classList.remove("d-none");

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // console.log(token);

      loginError.innerHTML = `<div class="alert" style="background-color: #53f877 !important;" >Login Successfully...<i class="fa fa-spinner fa-spin"></i></div>`;
      // localStorage.setItem("userid<@#(1029384756)#@>", result.user.uid);
      // localStorage.setItem(
      //   "userEmail<@#(0192837465)#@>",
      //   JSON.stringify(result.user)
      // );
      sessionStorage.setItem("userid<@#(1029384756)#@>", result.user.uid);
      sessionStorage.setItem(
        "userEmail<@#(0192837465)#@>",
        JSON.stringify(result.user)
      );
      // sessionStorage.setItem("LOgiN#@$%^&;;", true);
      save(
        user.uid,
        user.displayName,
        user.email,
        "Login with google",
        user.emailVerified,
        true
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
      btnDisableOrEnable(loginForm_btn);
      btnDisableOrEnable(LoginWithGoogle);
      loginForm_btn.children[0].classList.remove("fa-spinner", "fa-spin");
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
  navigator.vibrate([100]);

  loginError.classList.remove("d-none");
  btnDisableOrEnable(loginForm_btn);
  btnDisableOrEnable(LoginWithGoogle);
  loginForm_btn.children[0].classList.add("fa-spinner", "fa-spin");
  let email = loginEmail.value;
  let password = loginPassword.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userdetails) => {
      loginForm_btn.children[0].classList.remove("fa-spinner", "fa-spin");
      btnDisableOrEnable(loginForm_btn);
      btnDisableOrEnable(LoginWithGoogle);
      console.log("new", auth.currentUser);
      // console.log(JSON.stringify(user));
      // console.log(userdetails);
      // console.log(userdetails.user.email);
      // console.log(userdetails.user.emailVerified);
      if (!userdetails.user.emailVerified) {
        alert(
          "Please verify your email otherwise,you will not be able to login"
        );
        console.log(userdetails.user.email);
        if (
          confirm(
            "if you want to send mail verification for\n" +
              userdetails.user.email
          )
        ) {
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
          console.log("user denied to send  mail verification..");
          alert("If already sent please check your mail id");
        }
      } else {
        loginError.innerHTML = `<div class="alert" style="background-color: #53f877 !important;" >Login Successfully...<i class="fa fa-spinner fa-spin"></i></div>`;
        navigator.vibrate([100, 50, 100]);

        sessionStorage.setItem(
          "userid<@#(1029384756)#@>",
          userdetails.user.uid
        );
        sessionStorage.setItem(
          "userEmail<@#(0192837465)#@>",
          JSON.stringify(userdetails.user)
        );
        sessionStorage.setItem("LOgiN#@$%^&;;", true);

        //set mail verified
        get(child(ref(connectDB), "users/" + userdetails.user.uid))
          .then((snapshot) => {
            let data = snapshot.val();
            setEmailVerify(data, userdetails.user.uid);
          })
          .catch((e) => {
            console.log("error while fetching data", e);
          });
        //Login auth userLogged in or not
        update(child(ref(connectDB), "users/" + userdetails.user.uid), {
          UserLoggedIn: true,
        })
          .then(() => {
            console.log("login");
          })
          .catch((e) => {
            alert(e);
          });
        setTimeout(() => {
          location.replace("mainpage.html");
        }, 1500);
      }
    })
    .catch((e) => {
      // Handle login errors
      loginForm_btn.children[0].classList.remove("fa-spinner", "fa-spin");
      btnDisableOrEnable(loginForm_btn);
      btnDisableOrEnable(LoginWithGoogle);
      navigator.vibrate([100, 50, 100]);

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
  navigator.vibrate([50]);

  showpassword("login-password", "eye-1");
});
signUpShowpwd.addEventListener("click", (e) => {
  e.preventDefault();
  navigator.vibrate([50]);

  showpassword("signup-pwd", "eye-2");
});
signUpConfirmShowpwd.addEventListener("click", (e) => {
  e.preventDefault();
  navigator.vibrate([50]);

  showpassword("confirm-password", "eye-3");
});
// ------------------------------------------------------------

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
  navigator.vibrate([100]);

  event.preventDefault();
  signupError.classList.remove("d-none");
  btnDisableOrEnable(signup_btn);

  signup_btn.children[0].classList.add("fa-spinner", "fa-spin");
  // store data in firebase database...............
  var name = signupName.value;
  var email = signupEmail.value;
  var password = signupPassword.value;
  var confirmPassword = signupConfirmPassword.value;

  // Add validation logic for password and confirm password match
  if (password !== confirmPassword) {
    navigator.vibrate([100, 50, 100]);

    signupError.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>password do not match</div>`;
    signup_btn.children[0].classList.remove("fa-spinner", "fa-spin");
    btnDisableOrEnable(signup_btn);

    setTimeout(() => {
      signupError.innerHTML = "";
    }, 4000);
  } else if (
    name === "" ||
    email === "" ||
    confirmPassword === "" ||
    password === ""
  ) {
    navigator.vibrate([100, 50, 100]);

    signup_btn.children[0].classList.remove("fa-spinner", "fa-spin");
    btnDisableOrEnable(signup_btn);

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
        btnDisableOrEnable(signup_btn);
        navigator.vibrate([200, 100, 300]);

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
          userdetails.user.emailVerified,
          false
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
        btnDisableOrEnable(signup_btn);
        navigator.vibrate([100, 50, 100]);
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
