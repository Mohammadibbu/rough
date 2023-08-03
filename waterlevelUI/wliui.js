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
} from "../source/firebaseinitialization.js";
let productid, waterlevel;
const initialLoader = document.getElementById("overlayLoader");

document.addEventListener("DOMContentLoaded", function () {
  const waterLevelDiv = document.getElementById("waterLevel");
  const userAuthUid = sessionStorage.getItem("userid<@#(1029384756)#@>");
  const userAuthExtra = JSON.parse(
    sessionStorage.getItem("userEmail<@#(0192837465)#@>")
  );
  if (userAuthUid == userAuthExtra.uid) {
    get(child(ref(connectDB), "users/" + userAuthUid))
      .then((snapshot) => {
        let dataL = snapshot.val();
        productid = dataL.Regproductid;
        console.log(dataL.Regproductid);
        // uicheck(data.productid, data);
        productData();
        initialLoader.classList.add("d-none");
      })
      .catch((e) => {
        console.log("error while fetching data", e);
        // location.replace("index.html");
      });
  } else {
    console.log("no data");
    alert("something Went Wrong...");
    location.replace("../mainpage.html");
    //redirect to indexpage or mainpage
  }

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
  // Set initial water level based on the slider's value

  // Update water level based on slider value
  const updateWaterLevel = (level) => {
    const percentage = Math.min(Math.max(level, 0), 100); // Limit the range between 0 and 100
    waterLevelDiv.style.height = percentage + "%";
    document.getElementById(
      "text"
    ).innerHTML = `<h2 style="font-family:sans-serif;">${percentage}</h2>`;
  };
});

// Add a click event listener to the checkbox and toggle the class when clicked
const toggleButton = document.getElementById("toggleButton");
toggleButton.addEventListener("click", function () {
  document.querySelector(".slider").classList.toggle("active");
  if (document.getElementById("slider").classList.contains("active")) {
    document.getElementById("auto-manual").innerHTML = "AutoMode On";
    updatingWorkingStatus("Auto");
    document
      .getElementById("manual-control-btn")
      .setAttribute("disabled", "true");

    //   console.log(`The class name "${classNameToCheck}" exists on the element.`);
  } else {
    updatingWorkingStatus("manual");
    document.getElementById("manual-control-btn").removeAttribute("disabled");
    document.getElementById("auto-manual").innerHTML = "AutoMode Off";

    //   console.log(`The class name "${classNameToCheck}" does not exist on the element.` );
  }
});
function updatingWorkingStatus(AutoOrManual) {
  update(child(ref(connectDB), "products/" + productid), {
    Workstatus: AutoOrManual,
  })
    .then(() => {
      //   console.log(AutoOrManual);
    })
    .catch((e) => {
      console.log("something Went Wrong\nplease Try Again\nERROR:", e.code);
    });
}
