function scrollDownHome(){
	var toContent = $('#div1').offset().top - 47;
	$('html, body').animate({
	    scrollTop: toContent
	}, 1000);
}

function playHomeIntro(){
  var carouselH1 = document.getElementById("carouselH1");
  var carouselH2 = document.getElementById("carouselH2");
  var logo = document.getElementById("logo");

  var carouselH1Text = removeSpacing(carouselH1.textContent);
  var carouselH2Text = removeSpacing(carouselH2.textContent);
  var logoText = removeSpacing(logo.textContent) + " Home page.";

  play(logoText);
  play(carouselH1Text);
  play(carouselH2Text);
}

function playHeader1(){
	var carouselH1 = document.getElementById("carouselH1");
	var carouselH1Text = removeSpacing(carouselH1.textContent);

	play(carouselH1Text);
}

function playHeader2(){
	var carouselH2 = document.getElementById("carouselH2");
	var carouselH2Text = removeSpacing(carouselH2.textContent);

	play(carouselH2Text);
}

function playGetStarted(){
	var getStartBtn = document.getElementById("getStartBtn");
	var getStartBtnText = removeSpacing(getStartBtn.textContent) + " Button. Click to go to Arrival page.";

	play(getStartBtnText);
}

function playHomeDesc1(){
	var homeP1 = document.getElementById("homeP1");

	var homeP = removeSpacing(homeP1.textContent);

	playLong(homeP);
}

function playHomeDesc2(){
	var homeP2 = document.getElementById("homeP2");

	var homeP = removeSpacing(homeP2.textContent);

	playLong(homeP);
}
