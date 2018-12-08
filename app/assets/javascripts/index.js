function scrollDownHome(){
	var toContent = $('#div1').offset().top - 47;
	$('html, body').animate({
	    scrollTop: toContent
	}, 1000);
}

function handler(ev) {
    var target = $(ev.target);
    var elAlt = target.attr('alt');

    var imgOf = "Image of ";

    if( target.is(".aImg") ) {
       playLong(imgOf + elAlt);
    }
    else if(target.is(".imgRight")){
    	playLong(imgOf + elAlt + " Text left of Image.");
    }
    else if(target.is(".imgLeft")){
    	playLong(imgOf + elAlt + " Text right of Image.");
    }
    else if( target.is(".aImgCar") ) {
       playLong(imgOf + elAlt + " Click to scroll down to more content. ");
    }
}
$(this).mouseover(handler);

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

function playFeatreContent1(){

	var feature1Head = document.getElementById("feature1Head");
	var feature1Par = document.getElementById("feature1Par");

	var feature1HeadText = removeSpacing(feature1Head.textContent);
	var feature1ParText = removeSpacing(feature1Par.textContent);

	playLong(feature1HeadText + " " + feature1ParText);
}

function playFeatreContent2(){

	var feature2Head = document.getElementById("feature2Head");
	var feature2SecHead = document.getElementById("feature2SecHead");
	var feature2Par = document.getElementById("feature2Par");

	var feature2HeadText = removeSpacing(feature2Head.textContent);
	var feature2SecHeadText = removeSpacing(feature2SecHead.textContent);
	var feature2ParText = removeSpacing(feature2Par.textContent);

	playLong(feature2HeadText + " " + feature2SecHeadText + " " + feature2ParText);
}

function playFeatreContent3(){

	var feature3Head = document.getElementById("feature3Head");
	var feature3SecHead = document.getElementById("feature3SecHead");
	var feature3Par = document.getElementById("feature3Par");

	var feature3HeadText = removeSpacing(feature3Head.textContent);
	var feature3SecHeadText = removeSpacing(feature3SecHead.textContent);
	var feature3ParText = removeSpacing(feature3Par.textContent);

	playLong(feature3HeadText + " " + feature3SecHeadText + " " + feature3ParText);
}
