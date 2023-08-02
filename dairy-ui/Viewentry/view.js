let button = document.getElementById("showButton");
let holder = document.getElementById("entries");

load();

function load() {
  holder.innerHTML = "";
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Set the appropriate content type
      Accept: "application/json",
    },
  };

  let url = `http://localhost:3305/api/v1/dairy/${localStorage.getItem(
    "USERID"
  )}`;

  fetch(url, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (JSONDATA) {
      console.log(JSONDATA);
      createitems(JSONDATA.data.dairies);
    });
}

function createitems(dairies) {
  if (dairies.length === 0) {
    let msg = document.createElement("h4");
    msg.innerHTML = "NO ENTRIES FOUND";
    holder.appendChild(msg);
    return;
  }
  for (let i = 0; i < dairies.length; i++) {
    createObj(dairies[i]);
  }
}

function createObj(dairy) {
  let main = document.createElement("div");
  main.classList.add("entry-container");

  // APPENDING DATE TO DAIRY HOLDER
  let maindate = dairy.DairyDate;
  let date = document.createElement("p");
  date.classList.add("date-column"); // Apply the column class
  date.innerHTML = maindate.slice(0, 10);
  main.appendChild(date);

  // APPENDING ENTRY TO DAIRY HOLDER
  let box = document.createElement("div");
  let entryEl = document.createElement("p");
  entryEl.classList.add("entry-text");
  let entry = dairy.Entry;

  var firstTenWords = sanitizeHtml(entry).split(" ").slice(0, 5).join(" ");
  entryEl.innerHTML = firstTenWords;
  box.appendChild(entryEl);
  main.appendChild(box);

  //ADDING EDIT HYPERLINK

  let editLink = document.createElement("a");
  editLink.href = `../newentry/newentry.html?id=${dairy.Id}`; // Replace "edit.html" with the appropriate edit page URL
  editLink.textContent = "Edit";
  editLink.classList.add("edit-link");
  box.appendChild(editLink);

  // DELETING AN ENTRY

  let deleteLink = document.createElement("a");
  deleteLink.textContent = "Delete";
  deleteLink.classList.add("edit-link");
  deleteLink.classList.add("ml-3");
  //
  deleteLink.addEventListener("click", function () {
    let dairyId = dairy.Id;
    let options = {
      method: "DELETE",
    };
    let URL = `http://localhost:3305/api/v1/dairy/${dairyId}`;
    fetch(URL, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsondata) {
        if (jsondata.status.toLowerCase() === "success") {
          alert("Dairy Entry Deleted Successfully");

          load();
        }
      });
  });
  //
  box.appendChild(deleteLink);
  holder.appendChild(main);
}

function sanitizeHtml(html) {
  var tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  return tempElement.textContent || tempElement.innerText || "";
}
