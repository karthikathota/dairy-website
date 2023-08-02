let submitBtn = document.getElementById("submitBtn");
let details = {};

submitBtn.onclick = function () {
  let phoenNo = document.getElementById("Phoneno").value;
  let firstname = document.getElementById("Firstname").value;
  let lastname = document.getElementById("Lastname").value;
  let username = document.getElementById("username").value;
  let email = document.getElementById("Email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  if (!validatePhoneNo(phoenNo)) return;

  if (!validateFirstName(firstname)) return;

  if (!validateUserName(username)) return;

  if (!validateEmail(email)) return;

  if (!validatepassword(password)) return;

  if (!validateconfirmpassword(password, confirmPassword)) return;

  details.PhoneNo = phoenNo;
  details.FirstName = firstname;
  details.LastName = lastname;
  details.UserName = username;
  details.Email = email;
  details.UserPassword = password;

  // JSON.stringify(details);
  console.log(details);
  let options = {
    method: "POST",
    body: JSON.stringify(details),
    headers: {
      "Content-Type": "application/json", // Set the appropriate content type
      Accept: "application/json",
    },
  };

  let URL = "http://localhost:3305/api/v1/signup";

  fetch(URL, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      if (jsonData.status.toLowerCase() === "failed") {
        alert("USERNAME ALREADY EXISTS!!!");
        return;
      } else {
        alert("User created succesfully, PLEASE LOGIN........");
        window.location.href = "../login/login.html";
      }
    });

  //window.location.href = "../mainpage/main.html";
};

function validatePhoneNo(phoenNo) {
  let isvalid = false;
  if (phoenNo) {
    if (phoenNo.indexOf(" ") >= 0) {
      alert("Please Enter Valid Phone-no");
      isvalid = false;
    } else {
      isvalid = true;
    }
  } else {
    alert("Please enter phone-no");
    isvalid = false;
  }
  return isvalid;
}

function validateFirstName(firstname) {
  if (firstname) {
    return true;
  } else {
    alert("Please Enter Firstname");
    return false;
  }
}

function validateUserName(userName) {
  if (userName) {
    if (userName.indexOf(" ") >= 0) {
      msg = "Please enter a valid UserName!!!";
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

function validateEmail(email) {
  const atIndex = email.indexOf("@");
  if (atIndex <= 0 || atIndex === email.length - 1) {
    alert("Enter valid Email");
    return false;
  }

  const dotIndex = email.lastIndexOf(".");
  if (dotIndex <= atIndex + 1 || dotIndex === email.length - 1) {
    alert("Enter valid Email");
    return false;
  }

  return true;
}

function validatepassword(password) {
  let isvalid = false;
  if (password) {
    if (password.indexOf(" ") >= 0) {
      msg = "Please enter a valid Password!!!";
      alert(msg);
      return false;
    } else {
      return true;
    }
  } else {
    alert("Please enter valid Password");
    isvalid = false;
  }
  return isvalid;
}

function validateconfirmpassword(password, confirmPassword) {
  let isvalid = false;
  if (confirmPassword === password) {
    isvalid = true;
  } else {
    alert("Password and Confirm password should be same!!");
    isvalid = false;
  }
  return isvalid;
}
