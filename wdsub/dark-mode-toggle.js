let toggleDiv = document.getElementById("toggle-div");

let modeDiv = document.getElementById("mode-div");

modeDiv.innerHTML = "<p>Dark mode on</p>";

let isLightMode = true;

function mngModeStatus(event) {
  //Determine if light mode is on
  //Flip the isLightMode switch
  isLightMode = !isLightMode
  //Change background color to black if light mode, else white
  if (isLightMode) document.body.style.backgroundColor = "black";
  else document.body.style.backgroundColor = "white";
  //Change text to dark mode on if light mode, else dark mode off
  if (isLightMode) modeDiv.style.color = "white", toggleDiv.style.color = "white";
  else modeDiv.style.color = "black", toggleDiv.style.color = "black";
  //Change text to white if light dark mode, else black
  if (isLightMode) modeDiv.innerHTML = "<p>Dark mode on</p>";
  else modeDiv.innerHTML = "<p>Dark mode off</p>";
  if (isLightMode) toggleDiv.innerHTML = "<p>Click to toggle Light Mode</p>";
  else toggleDiv.innerHTML = "<p>Click to toggle Dark Mode</p>";
}
