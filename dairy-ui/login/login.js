function opensignup() {
  window.location.href = "../singup/signup.html";
}

let button = document.getElementById("btnLogin");
let usernameAlert = document.getElementById("usernameAlert");

button.addEventListener("click", function () {
  let usernameInput = document.getElementById("txtUsername").value;
  let passwordInput = document.getElementById("txtPassword").value;

  // if (usernameInput && passwordInput)
  // {
  //     window.location.href="../mainpage/main.html"
  // }
  // else if(!usernameInput)
  // {
  //     alert("Please enter UserName");
  // }
  // else if(!passwordInput)
  // {
  //     alert("Please enter Password");
  // }
  if (validateUserName(usernameInput) && validatePassword(passwordInput)) {
    checkCredentials(usernameInput, passwordInput);
    //window.location.href = "../mainpage/main.html";
  }
});

function checkCredentials(username, password) {
  // let isvalid=false;
  // if( username==="KARTHIK" && password==="123" )
  // {
  //     isvalid=true;
  // }
  // else
  // {
  //     isvalid=false;
  // }
  // return isvalid;

  let options = {
    method: "POST",
    body: JSON.stringify({
      UserName: username,
      UserPassword: password,
    }),
    headers: {
      "Content-Type": "application/json", // Set the appropriate content type
      Accept: "application/json",
    },
  };
  let URL = "http://localhost:3305/api/v1/users";

  fetch(URL, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      console.log(jsonData);
      if (jsonData.hasUser) {
        // Set a cookie named "username" with the value "John Doe"
        localStorage.setItem("USERNAME", jsonData.data.users[0].UserName);
        localStorage.setItem("USERID", jsonData.data.users[0].UserID);
        //document.cookie = `username=${encodeURIComponent(jsonData.data.users[0].UserName)}; expires=Fri, 31 Dec 2023 23:59:59 GMT; path=/`;
        //document.cookie = `userid=${encodeURIComponent(jsonData.data.users[0].UserId)}; expires=Fri, 31 Dec 2023 23:59:59 GMT; path=/`;
        window.location.href = "../mainpage/main.html";
      } else {
        alert("INVALID USERNAME OR PASSWORD!!!");
        return;
      }
    });
}

function validateUserName(userName) {
  let msg = "";
  if (userName) {
    if (userName.indexOf(" ") >= 0) {
      msg = "!!!Please enter a valid UserName!!!";
      alert(msg);
      return false;
    } else {
      return true;
    }
  } else {
    msg = "Please enter username!!!";
    alert(msg);
    return false;
  }
}
function validatePassword(password) {
  let msg = "";
  if (password) {
    if (password.indexOf(" ") >= 0) {
      msg = "Please enter a valid Passwrod!!!";
      alert(msg);
      return false;
    } else {
      return true;
    }
  } else {
    msg = "Please enter Password!!!";
    alert(msg);
    return false;
  }
}

function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}
