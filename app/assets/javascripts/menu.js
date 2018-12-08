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
  var settingsText = "The settings menu contains an on and off speech switch located to the right.";
  play(settingsText);

  document.getElementById("myNav").style.height = "78px";
}

function closeSettings() {
  document.getElementById("myNav").style.height = "0%";
}


/* ------------ Speech Contol -------------- */

function play(textToPlay){
  responsiveVoice.cancel();

  if(muteVar){
    responsiveVoice.cancel();
    responsiveVoice.speak(textToPlay,"UK English Male");
  }
  else{
    responsiveVoice.cancel();
  }
}

function playLong(textToPlay){

  if(muteVar){
    responsiveVoice.speak(textToPlay,"UK English Male");
  }
  else{
    responsiveVoice.cancel();
  }
}

function playSlow(textToPlay){
  responsiveVoice.cancel();

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


function removeSpacing(text){
  text = text.trim();

  return text;
}

/* ------------ Menu Speach Functions -------------- */

function playLogo(){
  var logo = document.getElementById("logo");
  var logoText = logo.textContent.trim() + " logo";

  play(logoText);
}

function playGoHome(){
  dropHome();

  var homeBtn = document.getElementById("homeBtn");
  var homeBtnText = removeSpacing(homeBtn.textContent);

  var goHomeText = homeBtnText  + "Button. Click to go to the " + homeBtnText + " Page.";
  play(goHomeText);
}

function playGoArrival(){
	dropArriv();

  var arrivalBtn = document.getElementById("arrivalBtn");
  var arrivalBtnText = removeSpacing(arrivalBtn.textContent);

  var goArrivalText = arrivalBtnText + " Button. Click to go to the " + arrivalBtnText +" page. Drop down included.";
  play(goArrivalText);
}

function playGoArrivalBoat(){
  var arrivBoat = document.getElementById("arrivBoat");
  var arrivBoatText = removeSpacing(arrivBoat.textContent);

  var goArrivBoatText = arrivBoatText + " Button. Click to go to the Arrival by " + arrivBoatText +" page.";
  play(goArrivBoatText);
}

function playGoArrivalCar(){
  var arrivCar = document.getElementById("arrivCar");
  var arrivCarText = removeSpacing(arrivCar.textContent);

  var goArrivCarText = arrivCarText + " Button. Click to go to the Arrival by " + arrivCarText +" page.";
  play(goArrivCarText);
}

function playGoArrivalPlane(){
  var arrivPlane = document.getElementById("arrivPlane");
  var arrivPlaneText = removeSpacing(arrivPlane.textContent);

  var goArrivPlaneText = arrivPlaneText + " Button. Click to go to the Arrival by " + arrivPlaneText +" page.";
  play(goArrivPlaneText);
}

function playGoArrivalTrain(){
  var arrivTrain = document.getElementById("arrivTrain");
  var arrivTrainText = removeSpacing(arrivTrain.textContent);

  var goArrivTrainText = arrivTrainText + " Button. Click to go to the Arrival by " + arrivTrainText +" page.";
  play(goArrivTrainText);
}

function playGoExplore(){
	dropExplore();

  var travelBtn = document.getElementById("travelBtn");
  var travelBtnText = removeSpacing(travelBtn.textContent);

  var goTravelText = travelBtnText + " Button. Click to go to the " + travelBtnText + " page. Drop down included.";
  play(goTravelText);
}

function playGoExploreBoat(){
  var travelBoatBtn = document.getElementById("travelBoatBtn");
  var travelBoatBtnText = removeSpacing(travelBoatBtn.textContent);

  var goTravelBoatText = travelBoatBtnText + " Button. Click to go to the Traveling by " + travelBoatBtnText + " page.";
  play(goTravelBoatText);
}

function playGoExploreWalk(){
  var travelWalkBtn = document.getElementById("travelWalkBtn");
  var travelWalkBtnText = removeSpacing(travelWalkBtn.textContent);

  var goTravelWalkText = travelWalkBtnText + " Button. Click to go to the Traveling by " + travelWalkBtnText + " page.";
  play(goTravelWalkText);
}

function playGoHotel(){
  dropHotel();

  var hotelsBtn = document.getElementById("hotelsBtn");
  var hotelsBtnText = removeSpacing(hotelsBtn.textContent);

  var goNightText = hotelsBtnText + " Button. Click to go to the " + hotelsBtnText +" page.";
  play(goNightText);
}

function playGoAttract(){
  dropAttract();

  var attractBtn = document.getElementById("attractBtn");
  var attractBtnText = removeSpacing(attractBtn.textContent);

  var goAttractText = attractBtnText + " Button. Click to go to the " + attractBtnText + " page. Drop down included.";
  play(goAttractText);
}

function playGoAttractRest(){
  var attractRestBtn = document.getElementById("attractRestBtn");
  var attractRestBtnText = removeSpacing(attractRestBtn.textContent);

  var goAttractRestText = attractRestBtnText + " Button. Click to go to the " + attractRestBtnText + " page.";
  play(goAttractRestText);
}

function playGoAttractChur(){
  var attractChurBtn = document.getElementById("attractChurBtn");
  var attractChurBtnText = removeSpacing(attractChurBtn.textContent);

  var goAttractChurText = attractChurBtnText + " Button. Click to go to the " + attractChurBtnText + " page.";
  play(goAttractChurText);
}

function playGoAttractMus(){
  var attractMusBtn = document.getElementById("attractMusBtn");
  var attractMusBtnText = removeSpacing(attractMusBtn.textContent);

  var goAttractMusText = attractMusBtnText + " Button. Click to go to the " + attractMusBtnText + " page.";
  play(goAttractMusText);
}

function playGoAttractMore(){
  var attractMoreBtn = document.getElementById("attractMoreBtn");
  var attractMoreBtnText = removeSpacing(attractMoreBtn.textContent);

  var goAttractMoreText = attractMoreBtnText + " Button. Click to go to the " + attractMoreBtnText + " page.";
  play(goAttractMoreText);
}

function playGoApp(){
  dropApp();

  var appsBtn = document.getElementById("appsBtn");
  var appsBtnText = removeSpacing(appsBtn.textContent);

  var goAppText = appsBtnText + " Button. Click to go to the " + appsBtnText + " page.";
  play(goAppText);
}

function playGoOrg(){
  dropOrg();

  var orgBtn = document.getElementById("orgBtn");
  var orgBtnText = removeSpacing(orgBtn.textContent);

  var goOrgText = orgBtnText + " Button. Click to go to the " + orgBtnText +" page.";
  play(goOrgText);
}

function playGoMap(){
  dropMap();

  var mapBtn = document.getElementById("mapBtn");
  var mapBtnText = removeSpacing(mapBtn.textContent);    

  var goMapText = mapBtnText + " Button. Click to go to the " + mapBtnText + " page. Drop down included.";
  play(goMapText);
}

function playGoMapInformative(){
  dropMap();

  var mapInformBtn = document.getElementById("mapInformBtn");
  var mapInformBtnText = removeSpacing(mapInformBtn.textContent);    

  var goMapInformBtnText = mapInformBtnText + " Button. Click to go to the " + mapInformBtnText + " Map page.";
  play(goMapInformBtnText);
}

function playGoMapInteractive(){
  dropMap();

  var mapInterBtn = document.getElementById("mapInterBtn");
  var mapInterBtnText = removeSpacing(mapInterBtn.textContent);    

  var goMapInterBtnText = mapInterBtnText + " Button. Click to go to the " + mapInterBtnText + " Map page.";
  play(goMapInterBtnText);
}

function playGoBack(){
  var goBackText = "Close Settings Button. Click to return the Navigation Menu.";
  play(goBackText);
}

function playGoSettings(){
  var goSettingsText = "Settings Button. Click to open the Settings Menu.";
  play(goSettingsText);
}

function playMute(){
  var muteText = "Speech Button. Click to turn off all speech.";
  play(muteText);
}

/* ------------ End Menu Speach Functions -------------- */
