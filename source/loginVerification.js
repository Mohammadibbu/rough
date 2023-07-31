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

const userAuthUid = localStorage.getItem("userid<@#(1029384756)#@>");
const userAuthExtra = JSON.parse(
  localStorage.getItem("userEmail<@#(0192837465)#@>")
);
// console.log(userAuthEmailerified.emailVerified);
const reference = ref(connectDB);
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
  });

// user verification

// console.log(JSON.parse(localStorage.getItem("userEmail<@#(0192837465)#@>")));

// ternary if else

document.getElementById("logout").addEventListener("click", (e) => {
  if (confirm("Are you Sure To Logout!")) {
    // localStorage.removeItem("userid<@#(1029384756)#@>");
    // location.replace("index.html");
    console.log("cleared");
    update(child(ref(connectDB), "users/" + userAuthExtra.uid), {
      UserLoggedIn: false,
    })
      .then(() => {
        location.replace("index.html");
        console.log("logged out");
      })
      .catch((e) => {
        alert("something Went Wrong\nplease Try Again\nERROR:", e.code);
      });
  } else {
    // alert("you cancel the logout Process");
  }
});
// console.log(userAuthEmail);
