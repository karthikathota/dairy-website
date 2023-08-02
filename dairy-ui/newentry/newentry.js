const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id);

let welcomeMsg = document.getElementById("welcomeMsg");
let userName = localStorage.getItem("USERNAME");
welcomeMsg.innerHTML = `Welcome ${userName}`;

if (id !== null) {
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Set the appropriate content type
      Accept: "application/json",
    },
  };

  let url = `http://localhost:3305/api/v1/dairy/${localStorage.getItem(
    "USERID"
  )}/${id}`;

  fetch(url, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (JSONDATA) {
      if (JSONDATA.hasID) {
        const editor = CKEDITOR.instances.dairyEntry;
        let entry = JSONDATA.data.dairies[0].Entry;
        let dateEntry = JSONDATA.data.dairies[0].DairyDate;
        editor.setData(entry);
        let dateEL = document.getElementById("txtDate");
        dateEL.value = dateEntry;
        dateEL.disabled = true;
      } else {
        alert("Data DoesNot Exist");
        window.location.href = "../Viewentry/viewentr.html";
      }
    });
}

function save() {
  const editor = CKEDITOR.instances.dairyEntry;
  const content = editor.getData();
  // IF NO ID IS PRESENT THEN IT IS A NEW ENTRY
  if (id === null) {
    let entrydate = document.getElementById("txtDate").value;
    let userId = localStorage.getItem("USERID");
    console.log(userId);
    let data = {};
    data.dairyData = content;
    data.dairyDate = entrydate;
    data.userID = userId;
    console.log(data);

    let options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
        Accept: "application/json",
      },
    };
    let URL = "http://localhost:3305/api/v1/dairy";

    fetch(URL, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        if (jsonData.status.toLowerCase() === "success") {
          alert("Dairy Entry created Successfully");
          window.location.href = "../Viewentry/viewentr.html";
          return;
        }
      });
  }
  // ELSE IF AN ID IS PRESENT THEN IT INDIACATES EDITING OF DATA
  else {
    let editedData = {};
    editedData.dairyData = content;

    let options = {
      method: "PATCH",
      body: JSON.stringify(editedData),
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
        Accept: "application/json",
      },
    };
    let URL = `http://localhost:3305/api/v1/dairy/${id}`;

    fetch(URL, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        if (jsonData.status.toLowerCase() === "success") {
          alert("Dairy Entry updated Successfully");
          window.location.href = "../Viewentry/viewentr.html";
          return;
        }
      });
  }
}
