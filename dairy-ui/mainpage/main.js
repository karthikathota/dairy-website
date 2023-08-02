let welcomeMsg = document.getElementById("welcomeMsg");
let userName = localStorage.getItem("USERNAME");
welcomeMsg.innerHTML = `Welcome ${userName}`;
