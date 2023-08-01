import {
  getAuth,
  //database
  connectDB,
  ref,
  get,
  set,
  child,
  update,
  remove,
} from "./firebaseinitialization.js";

const userAuthUid = sessionStorage.getItem("userid<@#(1029384756)#@>");
const userAuthExtra = JSON.parse(
  sessionStorage.getItem("userEmail<@#(0192837465)#@>")
);
const userLogindata = sessionStorage.getItem("LOgiN#@$%^&;;");

// console.log(userAuthEmailerified.emailVerified);
const reference = ref(connectDB);
//initial loader
const initialLoader = document.getElementById("overlayLoader");
// get Data and Check Login Verification---------------
function verifyUser(data) {
  if (data) {
    if (
      !data.uid == userAuthUid ||
      !data.uid == userAuthExtra.uid ||
      !data.UserLoggedIn == true ||
      !data.emailVerified == userAuthExtra.emailVerified
    ) {
      console.log("no data availBLe", data);
      location.replace("index.html");
    } else {
      initialLoader.classList.add("d-none");

      console.log("data avail", data);
      document.getElementById("uname").innerText = data.email;
    }
  } else {
    location.replace("index.html");
    console.log("no data avail", data);
  }
}
//-----------------Get data From Firebase database--------------
get(child(reference, "users/" + userAuthUid))
  .then((snapshot) => {
    let data = snapshot.val();
    verifyUser(data);
  })
  .catch((e) => {
    console.log("error while fetching data", e);
    location.replace("index.html");
  });

// console.log(JSON.parse(localStorage.getItem("userEmail<@#(0192837465)#@>")));

function logout() {
  if (confirm("Are you Sure To Logout!")) {
    console.log("cleared");
    update(child(ref(connectDB), "users/" + userAuthExtra.uid), {
      UserLoggedIn: false,
    })
      .then(() => {
        location.replace("index.html");
        console.log("logged out");
        // localStorage.removeItem("userid<@#(1029384756)#@>");
        // localStorage.removeItem("userEmail<@#(0192837465)#@>");
        sessionStorage.removeItem("userid<@#(1029384756)#@>");
        sessionStorage.removeItem("userEmail<@#(0192837465)#@>");
        sessionStorage.removeItem("LOgiN#@$%^&;;");
      })
      .catch((e) => {
        alert("something Went Wrong\nplease Try Again\nERROR:", e.code);
      });
  } else {
    // alert("you cancel the logout Process");
    return;
  }
}
document.getElementById("logout").addEventListener("click", logout);
