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

function dropAll(){
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

	function openNav() {
    var welcomeMenuText = "Welcome to the Menu Screen! Here, you go to the Home, Arriving to Venice, Moving Around, Staying the Night, Dining Out, Applications, Organizations, and Map pages. A close button is located at the top-right hand side of the screen. A mute button is located at the top-left hand side of the screen to turn off and on all speech."
    play(welcomeMenuText);

	  document.getElementById("myNav").style.height = "100%";
	}

	function closeNav() {
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
    var mutebtn = document.getElementById("mutebtn");

    if(muteVar){
      localStorage.setItem("mute", "false");
      responsiveVoice.cancel();

      console.log("false");
      muteVar = false;
      mutebtn.checked = false;
      responsiveVoice.speak("Speech Off","UK English Male");
    }
    else{
      localStorage.setItem("mute", "true");
      
      console.log("true");
      muteVar = true;
      mutebtn.checked = true;
      responsiveVoice.speak("Speech On","UK English Male");
    }
  }

  function setUpMuteButton() {
    document.addEventListener("DOMContentLoaded", function() {
      var mutebtn = document.getElementById("mutebtn");
      if(muteVar){
        mutebtn.checked = true;
      }
      else{
        mutebtn.checked = false;
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

    var goArrivalText = "Arrival Button. Click to go to the Arriving to Venice page."
    play(goArrivalText);
  }

  function playGoExplore(){
  	dropExplore();

    var goTravelText = "TMoving Button. Click to go to the Moving Around page."
    play(goTravelText);
  }

  function playGoHotel(){
    dropHotel();

    var goNightText = "Staying the Night Button. Click to go to the Staying the Night page."
    play(goNightText);
  }

  function playGoAttract(){
    dropAttract();

    var goDiningText = "Dining Out Button. Click to go to the Dining Out page."
    play(goDiningText);
  }

  function playGoApp(){
    dropApp();

    var goAppText = "Applications Button. Click to go to the Applications page."
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
    var goBackText = "Close Button. Click to return to previous page."
    play(goBackText);
  }

  function playMute(){
    var muteText = "Speech Button. Click to turn off all speech.";
    play(muteText);
  }