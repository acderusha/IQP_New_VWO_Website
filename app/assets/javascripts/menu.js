/* ----------------- Menu Drop Downs -------------- */
function dropHome(){
    var mapDrop = document.getElementById("mapDrop");
    var arrivDrop = document.getElementById("arrivDrop");
    var exploreDrop = document.getElementById("exploreDrop");
    var attractDrop = document.getElementById("attractDrop");

    mapDrop.classList.remove('show');
    arrivDrop.classList.remove('show');
    exploreDrop.classList.remove('show');
    attractDrop.classList.remove('show');
}

function dropMap() {
    var mapDrop = document.getElementById("mapDrop");
    var arrivDrop = document.getElementById("arrivDrop");
    var exploreDrop = document.getElementById("exploreDrop");
    var attractDrop = document.getElementById("attractDrop");

    arrivDrop.classList.remove('show');
    exploreDrop.classList.remove('show');
    attractDrop.classList.remove('show');

    if(!mapDrop.classList.contains('show')){
    	mapDrop.classList.add("show");
    }
}

function dropArriv() {
	  var mapDrop = document.getElementById("mapDrop");
    var arrivDrop = document.getElementById("arrivDrop");
    var exploreDrop = document.getElementById("exploreDrop");
    var attractDrop = document.getElementById("attractDrop");

    mapDrop.classList.remove('show');
    exploreDrop.classList.remove('show');
    attractDrop.classList.remove('show');

    if(!arrivDrop.classList.contains('show')){
    	arrivDrop.classList.add("show");
    }
}

function dropExplore() {
	 var mapDrop = document.getElementById("mapDrop");
    var arrivDrop = document.getElementById("arrivDrop");
    var exploreDrop = document.getElementById("exploreDrop");
    var attractDrop = document.getElementById("attractDrop");

    mapDrop.classList.remove('show');
    arrivDrop.classList.remove('show');
    attractDrop.classList.remove('show');

    if(!exploreDrop.classList.contains('show')){
    	exploreDrop.classList.add("show");
    }
}

function dropAttract(){
    var mapDrop = document.getElementById("mapDrop");
    var arrivDrop = document.getElementById("arrivDrop");
    var exploreDrop = document.getElementById("exploreDrop");
    var attractDrop = document.getElementById("attractDrop");

    mapDrop.classList.remove('show');
    arrivDrop.classList.remove('show');
    exploreDrop.classList.remove('show');

    if(!attractDrop.classList.contains('show')){
      attractDrop.classList.add("show");
    }
}

function dropHotel(){
    var mapDrop = document.getElementById("mapDrop");
    var arrivDrop = document.getElementById("arrivDrop");
    var exploreDrop = document.getElementById("exploreDrop");
    var attractDrop = document.getElementById("attractDrop");

    mapDrop.classList.remove('show');
    arrivDrop.classList.remove('show');
    exploreDrop.classList.remove('show');
    attractDrop.classList.remove('show');
}

function dropApp(){
    var mapDrop = document.getElementById("mapDrop");
    var arrivDrop = document.getElementById("arrivDrop");
    var exploreDrop = document.getElementById("exploreDrop");
    var attractDrop = document.getElementById("attractDrop");

    mapDrop.classList.remove('show');
    arrivDrop.classList.remove('show');
    exploreDrop.classList.remove('show');
    attractDrop.classList.remove('show');
}

function dropOrg(){
    var mapDrop = document.getElementById("mapDrop");
    var arrivDrop = document.getElementById("arrivDrop");
    var exploreDrop = document.getElementById("exploreDrop");
    var attractDrop = document.getElementById("attractDrop");

    mapDrop.classList.remove('show');
    arrivDrop.classList.remove('show');
    exploreDrop.classList.remove('show');
    attractDrop.classList.remove('show');
}

function hideAll(){
    var mapDrop = document.getElementById("mapDrop");
    var arrivDrop = document.getElementById("arrivDrop");
    var exploreDrop = document.getElementById("exploreDrop");
    var attractDrop = document.getElementById("attractDrop");

    mapDrop.classList.remove('show');
    arrivDrop.classList.remove('show');
    exploreDrop.classList.remove('show');
    attractDrop.classList.remove('show');
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

/* ----------------- End Menu Drop Downs -------------- */



let muteVar;
  if (typeof(Storage) !== "undefined") {
    // Store
    if(localStorage.getItem("mute") !== "true" && localStorage.getItem("mute") !== "false"){
      localStorage.setItem("mute", "true");
    }

    if(localStorage.getItem("mute") === "true"){
      muteVar = true;
    }
    else{
      muteVar = false;
    }

    console.log("muteVar Storage: " + muteVar);
  } 
  else {
    alert("Sorry, your browser does not support Web Storage.");
  }

  setUpMuteButton();

  /* ----------- Menu Display Functions --------- */

	function openSettings() {
    var settingsText = "The settings menu contains an on and off speech switch.";
    play(settingsText);

	  document.getElementById("myNav").style.height = "78px";
	}

	function closeSettings() {
	  document.getElementById("myNav").style.height = "0%";
	}


  /* ------------ Speech Contol -------------- */

  function play(textToPlay){
    if(muteVar){
      responsiveVoice.cancel();
      responsiveVoice.speak(textToPlay,"UK English Male");
    }
    else{
      responsiveVoice.cancel();
    }
  }

  function playSlow(textToPlay){
    if(muteVar){
      responsiveVoice.cancel();
      responsiveVoice.speak(textToPlay,"UK English Male", {rate: .86});
    }
    else{
      responsiveVoice.cancel();
    }
  }


  function muteSpeech() {
    var muteInput = document.getElementById("muteInput");
    var mutebtn = document.getElementById("mutebtn");

    if(muteVar){
      localStorage.setItem("mute", "false");
      responsiveVoice.cancel();

      console.log("false");
      muteVar = false;
      muteInput.checked = false;
      mutebtn.classList.remove("textColor");

      responsiveVoice.speak("Speech Off","UK English Male");
    }
    else{
      localStorage.setItem("mute", "true");
      
      console.log("true");
      muteVar = true;
      muteInput.checked = true;
      mutebtn.classList.add("textColor");
      
      responsiveVoice.speak("Speech On","UK English Male");
    }
  }

  function setUpMuteButton() {
    document.addEventListener("DOMContentLoaded", function() {
      var muteInput = document.getElementById("muteInput");
      var mutebtn = document.getElementById("mutebtn");
      if(muteVar){
        muteInput.checked = true;

        mutebtn.classList.add("textColor");
      }
      else{
        muteInput.checked = false;

        mutebtn.classList.remove("textColor");
      }
    });
  }

  /* ------------ End Speech Contol -------------- */

  /* ------------ Speach Functions -------------- */

  function playGoHome(){
    dropHome();

    var goHomeText = "Home Button. Click to go to the Home Page."
    play(goHomeText);
  }

  function playGoArrival(){
  	dropArriv();

    var goArrivalText = "Arrival Button. Click to go to the Arrival page."
    play(goArrivalText);
  }

  function playGoExplore(){
  	dropExplore();

    var goTravelText = "Traveling Button. Click to go to the Traveling page."
    play(goTravelText);
  }

  function playGoHotel(){
    dropHotel();

    var goNightText = "Hotels Button. Click to go to the Hotels page."
    play(goNightText);
  }

  function playGoAttract(){
    dropAttract();

    var goDiningText = "Attractions Button. Click to go to the Attractions page."
    play(goDiningText);
  }

  function playGoApp(){
    dropApp();

    var goAppText = "Apps Button. Click to go to the Apps page."
    play(goAppText);
  }

  function playGoOrg(){
    dropOrg();

    var goOrgText = "Organizations Button. Click to go to the Organizations page."
    play(goOrgText);
  }

  function playGoMap(){
    dropMap();

    var goMapText = "Map Button. Click to go to the Map page."
    play(goMapText);
  }

  function playGoBack(){
    var goBackText = "Close Settings Button. Click to return the Navigation Menu."
    play(goBackText);
  }

  function playGoSettings(){
    var goSettingsText = "Settings Button. Click to open the Settings Menu."
    play(goSettingsText);
  }

  function playMute(){
    var muteText = "Speech Button. Click to turn off all speech.";
    play(muteText);
  }