const firebaseConfig = {
  apiKey: "AIzaSyCvSaKQo98k6DSzrG01bLjkOeYoeq4E7DY",
  authDomain: "water-level-indicator-14606.firebaseapp.com",
  projectId: "water-level-indicator-14606",
  databaseURL:
    "https://water-level-indicator-14606-default-rtdb.firebaseio.com/",
  storageBucket: "water-level-indicator-14606.appspot.com",

  messagingSenderId: "56987502786",
  appId: "1:56987502786:web:fdf8ea92b2f14bdec1935b",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var userAuthUid = localStorage.getItem("userid<@#(1029384756)#@>");
var userAuthEmail = JSON.parse(
  localStorage.getItem("userEmail<@#(0192837465)#@>")
).email;
// user verification
const db = firebase.database().ref("user");
db.on("value", (snapshot) => {
  var i = 1;
  var useridverify = [];
  snapshot.forEach((usersdata) => {
    key = usersdata.key;
    uservalue = usersdata.val();
    // push values to Array
    useridverify.push(uservalue.uid);
    // console.log(uservalue);

    i++;
    // console.log(key)
  });
  console.log(useridverify);
  console.log(useridverify.includes(userAuthUid));
  if (!useridverify.includes(userAuthUid)) {
    console.log("no data avail");
    location.replace("index.html");
  } else {
    console.log(" data avail");
  }
});

// console.log(userAuth);

// ternary if else

document.getElementById("logout").addEventListener("click", (e) => {
  if (confirm("Are you Sure To Logout!")) {
    localStorage.removeItem("userid<@#(1029384756)#@>");
    location.replace("index.html");
    console.log("cleared");
  } else {
    // alert("you cancel the logout Process");
  }
});
document.getElementById("uname").innerText = userAuthEmail;
// console.log(userAuthEmail);
