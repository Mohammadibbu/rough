import {
  //database
  connectDB,
  ref,
  get,
  set,
  child,
  update,
  remove,
} from "../source/firebaseinitialization.js";

//initial loader
const initialLoader = document.getElementById("overlayLoader");
//water level div
const waterLevelDiv = document.getElementById("waterLevel");
//on/off button
const powerButton = document.querySelector(".power-button");
//auto mode on/off
const toggleButton = document.getElementById("toggleButton");

let isOn = false;
let productid, waterlevel;
//-----------------------functions------------------------------------
// Update water level based on slider value
function updateWaterLevel(level) {
  const percentage = Math.min(Math.max(level, 0), 100); // Limit the range between 0 and 100
  waterLevelDiv.style.height = percentage + "%";
  document.getElementById(
    "text"
  ).innerHTML = `<h2 style="font-family:sans-serif;">${percentage} %</h2>`;
}
//getproduct Data
function productData() {
  get(child(ref(connectDB), "products/" + productid))
    .then((snapshot) => {
      let data = snapshot.val();
      waterlevel = data.Waterlevel;
      updateWaterLevel(waterlevel);
      console.log(data.Waterlevel);
    })
    .catch((e) => {
      console.log("error while fetching data", e);
      // location.replace("index.html");
    });
}
//updatingWorkingmode
function updatingWorkingmode(AutoOrManual, manualbtnstatus) {
  update(child(ref(connectDB), "products/" + productid), {
    Workmode: AutoOrManual,
    manualbutton: manualbtnstatus,
  })
    .then(() => {
      //   console.log(AutoOrManual);
    })
    .catch((e) => {
      console.log("something Went Wrong\nplease Try Again\nERROR:", e.code);
    });
}
///////////////////////////////////////////////////////////////////////////////
//-----------------------END  functions------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const userAuthUid = sessionStorage.getItem("userid<@#(1029384756)#@>");
  const userAuthExtra = JSON.parse(
    sessionStorage.getItem("userEmail<@#(0192837465)#@>")
  );
  if (userAuthUid !== null || userAuthExtra !== null) {
    if (userAuthUid == userAuthExtra.uid) {
      get(child(ref(connectDB), "users/" + userAuthUid))
        .then((snapshot) => {
          let dataL = snapshot.val();
          productid = dataL.Regproductid;
          console.log(dataL.Regproductid);
          productData();
          initialLoader.classList.add("d-none");
        })
        .catch((e) => {
          console.log("error while fetching data wli", e);
          // location.replace("index.html");
        });
    } else {
      console.log("no data");
      alert("something Went Wrong...\nplease login again");
      location.replace("../mainpage.html");
      //redirect to indexpage or mainpage
    }
  } else {
    alert("something Went Wrong...\nplease login again..");
    location.replace("../index.html");
  }
});
// Set initial water level based on the slider's value

// Add a click event listener to the checkbox and toggle the class when clicked
toggleButton.addEventListener("click", function () {
  const slider = document.querySelector(".slider");
  const AutoOrManualToggle = document.getElementById("auto-manual");
  const manualControlBtn = document.getElementById("manual-control-btn");
  const btnstatus = document.getElementById("manual-status");
  slider.classList.toggle("active");
  if (slider.classList.contains("active")) {
    AutoOrManualToggle.innerHTML = "AutoMode On";
    updatingWorkingmode("Auto", "disabled");
    manualControlBtn.setAttribute("disabled", "true");
    btnstatus.innerHTML = "Diasabled=> When Turn on Auto mode";
    powerButton.classList.remove("on", isOn);

    //   console.log(`The class name "${classNameToCheck}" exists on the element.`);
  } else {
    updatingWorkingmode("manual", false);
    document.getElementById("manual-control-btn").removeAttribute("disabled");
    document.getElementById("auto-manual").innerHTML = "AutoMode Off";
    document.getElementById("manual-status").innerHTML = "off";

    //   console.log(`The class name "${classNameToCheck}" does not exist on the element.` );
  }
});
//power button
powerButton.addEventListener("click", () => {
  isOn = !isOn;
  powerButton.classList.toggle("on", isOn);
  if (powerButton.classList.contains("on")) {
    document.getElementById("manual-status").innerHTML = "On";
    updatingWorkingmode("manual", true);
    // productData();
    //   console.log(`The class name "${classNameToCheck}" exists on the element.`);
  } else {
    updatingWorkingmode("manual", false);
    document.getElementById("manual-control-btn").removeAttribute("disabled");
    document.getElementById("manual-status").innerHTML = "Off";

    //   console.log(`The class name "${classNameToCheck}" does not exist on the element.` );
  }
});
