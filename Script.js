function Validate() {
  var checkbox = document.getElementById("checkbox");

  if (checkbox.checked == true) {
    Download();
  }
  else {
    alert("You have not accepted our Terms and Conditions");
  }
}

function Download() {
  location.href = "https://www.cyanidetruckgames.tk/ta_ne_launcher.zip";
}
