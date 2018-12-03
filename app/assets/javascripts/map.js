console.log("map loaded");

/* --------------- Global Layer Vars ------------ */
var bridgeLayer;
var islesLayer;
var boatLayer;

var islesWalkLayer;
var islesBoatLayer;
var islesTotalLayer;


/* ---------------------------- Map Interaction Functions --------------------------- */

// Custom Info Control
var info = L.control();

// Style for bridges
function style(feature) {
    return {
        fillColor: "#ff7800",
        weight: 2,
        opacity: 1,
        color: 'purple',
        dashArray: '3',
        fillOpacity: 1
    };
}

// Style for islands bridges
function isleStyleNone(feature) {
    return {
        fillColor: getColorWalk(feature.properties.Access_type),
        weight: 0.4,
        opacity: 2,
        color: 'gray',
        fillOpacity: 0
    };
}

function isleStyleWalk(feature) {
    return {
        fillColor: getColorWalk(feature.properties.Access_type),
        weight: 0.5,
        opacity: 2,
        color: 'gray',
        fillOpacity: 0.6
    };
}

function isleStyleBoat(feature) {
    return {
        fillColor: getColorBoat(feature.properties.Access_type),
        weight: 0.5,
        opacity: 2,
        color: 'gray',
        fillOpacity: 0.6
    };
}

function isleStyleTotal(feature) {
    return {
        fillColor: getColorTotal(feature.properties.Access_type),
        weight: 0.5,
        opacity: 2,
        color: 'gray',
        fillOpacity: 0.6
    };
}

function getColorWalk(d) {
    return d === 'walk'  ? '#6e8b3d' :
           d === 'both'  ? '#6e8b3d' :
                      '#dcdcdc';
}

function getColorBoat(d) {
    return d === 'boat'  ? '#104e8b' :
           d === 'both'  ? '#104e8b' :
                      '#dcdcdc';
}

function getColorTotal(d) {
    return d === 'boat'  ? '#104e8b' :
           d === 'walk'  ? '#6e8b3d' :
           d === 'both'  ? '#ffff00' :
                      '#dcdcdc';
}

// Style for boat stops
var geojsonMarkerOptions = {
    radius: 7,
    fillColor: "#9999CC",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

function boatStyle(feature)  {
    return {
        radius: 7,
        fillColor: "#9999CC",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
}


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 4,
        color: '#666',
        dashArray: '',
        fillOpacity: 1
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    bridgeLayer.resetStyle(e.target);
    info.update();
}

function highlightFeatureIsland(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#666',
        dashArray: '',
        fillOpacity: 0
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        //layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlightIsland(e) {
    islesLayer.resetStyle(e.target);
    info.update();
}

function resetHighlightIslandWalk(e) {
    islesWalkLayer.resetStyle(e.target);
    info.update();
}

function resetHighlightIslandBoat(e) {
    islesBoatLayer.resetStyle(e.target);
    info.update();
}

function resetHighlightIslandTotal(e) {
    islesTotalLayer.resetStyle(e.target);
    info.update();
}


function highlightFeatureBoat(e) {
    var layer = e.target;

    layer.setStyle({
        radius: 7,
        fillColor: "#9999CC",
        color: "#000",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        //layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlightBoat(e) {
    boatLayer.resetStyle(e.target);
    info.update();
}


function describeFeature(e) {
    var layer = e.target;

    var container = document.getElementById("descBoxContainer");
    var description = document.getElementById("descBox");
    container.style.width = "300px";
    description.style.width = "300px";
    description.style.padding = "10px";

    addDescription(layer.feature.properties);
}

function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: describeFeature,
        dblclick: zoomToFeature
    });
}

function onEachFeatureIsland(feature, layer) {
    layer.on({
        mouseover: highlightFeatureIsland,
        mouseout: resetHighlightIsland,
        dblclick: zoomToFeature
    });
}

function onEachFeatureIslandWalk(feature, layer) {
    layer.on({
        mouseover: highlightFeatureIsland,
        mouseout: resetHighlightIslandWalk,
        dblclick: zoomToFeature
    });
}

function onEachFeatureIslandBoat(feature, layer) {
    layer.on({
        mouseover: highlightFeatureIsland,
        mouseout: resetHighlightIslandBoat,
        dblclick: zoomToFeature
    });
}

function onEachFeatureIslandTotal(feature, layer) {
    layer.on({
        mouseover: highlightFeatureIsland,
        mouseout: resetHighlightIslandTotal,
        dblclick: zoomToFeature
    });
}

function onEachFeatureBoat(feature, layer) {
    layer.on({
        mouseover: highlightFeatureBoat,
        mouseout: resetHighlightBoat,
        //dblclick: zoomToFeature
    });
}

/* ------------------------  End Map Interaction Functions -------------------------- */

/* ------------------------  Map Element Functions -------------------------- */
function addMapElements() {

    /* ------ GET Layer Data ------------ */
    getLayers();


    /* ------ Custom Info Control ----------- */

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
        try {
            var attrs = Object.keys(props);
            var attributeBridge;
            var attributeIsland;
            var attributeBoat;


            attributeBridge = attrs[0];
            attributeIsland = attrs[2];
            attributeBoat = attrs[1];

        }
        /* --------- Always Goes Here ---------- */
        catch (e) {
            /* -------- Only here to suppress null pointer error ---------- */
        }

        /* --------- Feature Check ---------- */
        //bridge
        if(attributeBridge === "name"){

            var dist2Bridge = attrs[2];
            var value = props[dist2Bridge];


            // check to see if brisge has 2 districts
            if(value != "null") {
                this._div.style.letterSpacing = "0px";
                this._div.innerHTML = '<h4>General Info</h4>' + (props ?
                    '<b>Bridge: </b>' + props.name + '</b><br />' + '<b> District1: </b>' + props.district1 + '</b><br />' + '<b> District2: </b>' + props.district2
                    : 'Hover over a feature');
            }
            else{
                this._div.style.letterSpacing = "0px";
                this._div.innerHTML = '<h4>General Info</h4>' +  (props ?
                    '<b>Bridge: </b>' + props.name + '</b><br />' + '<b> District: </b>' + props.district1
                    : 'Hover over a feature');
            }
        }
        //boat stop
        else if(attributeBoat === "name"){
            this._div.style.letterSpacing = "0px";
            this._div.innerHTML = '<h4>General Info</h4>' +  (props ?
                '<b> Boat Stop: </b>' + props.name
                : 'Hover over a feature'); 
        }
        //island
        else{
           this._div.style.letterSpacing = "0px";
            this._div.innerHTML = '<h4>General Info</h4>' +  (props ?
                '<b> Island: </b>' + props.name
                : 'Hover over a feature'); 
        }

    };

    info.addTo(mymap);

    /* ------ End Custom Info Control ----------- */

    setUpLegend();
}

/* ------------------------  End Map Element Functions -------------------------- */

/* -------------- GET Layer Data Functions ----------------- */
function getLayers() {
    getIsles();
    getBridges();
    getBoatStops();

    getIslesWalk();
    getIslesBoat();
    getIslesTotal();

    orderLayers();

    setUpSearch();
}

function getBridges() {
    $.get( "http://ckdata2.herokuapp.com/api/v1/dataset.json?group_name=bridges%202018", function( data ) {
        console.log("Data: ")
        console.log(data);
        //$( ".result" ).html( data );
        //alert( "Load was performed." );
    });

    bridgeLayer = L.geoJson(bridges, {style: style, onEachFeature: onEachFeature});
    bridgeLayer.addTo(mymap);
}

function getIsles(){
    islesLayer = L.geoJson(isles, {style: isleStyleNone, onEachFeature: onEachFeatureIsland});
    islesLayer.addTo(mymap);
}

function getIslesWalk(){
    islesWalkLayer = L.geoJson(isles, {style: isleStyleWalk, onEachFeature: onEachFeatureIslandWalk});
}

function getIslesBoat(){
    islesBoatLayer = L.geoJson(isles, {style: isleStyleBoat, onEachFeature: onEachFeatureIslandBoat});
}

function getIslesTotal(){
    islesTotalLayer = L.geoJson(isles, {style: isleStyleTotal, onEachFeature: onEachFeatureIslandTotal});
}

function getBoatStops(){
    boatLayer = L.geoJSON(boatStops, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: onEachFeatureBoat
    });
    boatLayer.addTo(mymap);
}

function orderLayers(){
    bridgeLayer.bringToFront();
    boatLayer.bringToFront();
    islesLayer.bringToBack();
}


/* ------------- Fuzzy Search Bar ----------- */
function setUpSearch(){
    var layers = combineLayers();
    console.log(layers);

    var totalLayers = L.layerGroup([bridgeLayer, islesLayer, boatLayer]);

    var fuse = new Fuse(layers, {
        keys: [
            'properties.name',
        ]
    });

    L.control.search({
        layer: totalLayers,
        collapsed: false,
        propertyName: 'name',
        filterData: function(text, records) {
            var jsons = fuse.search(text),
                ret = {}, key;
            
            for(var i in jsons) {
                key = jsons[i].properties.name;
                ret[ key ]= records[key];
            }
            console.log(jsons,ret);
            return ret;
        }
    })
    .on('search:locationfound', function(e) {
        e.layer.openPopup();
    })
    .addTo(mymap);
}


function combineLayers(){
    var combineLayers = isles;

    //console.log("Isles: ");
    //console.log(isles);

    //console.log("Bridges: ");
    //console.log(bridges);

    bridges.forEach(function (element){
        combineLayers.push(element);
    });

    boatStops.forEach(function (element){
        combineLayers.push(element);
    });

    //console.log("Total: ");
    //console.log(combineLayers);

    return combineLayers;
}

/* -------------- End GET Layer Data Functions ----------------- */

/* ------ Custom Legend Control ----------- */

var legend = L.control({position: 'bottomright'});

function setUpLegendNone(){
    var noLegend = document.getElementById("noLegend");
    noLegend.checked = true;

    setUpLegend();
}

function setUpLegendWalk(){
    var walkLegend = document.getElementById("walkLegend");
    walkLegend.checked = true;

    setUpLegend();
}

function setUpLegendBoat(){
    var boatLegend = document.getElementById("boatLegend");
    boatLegend.checked = true;

    setUpLegend();
}

function setUpLegendTotal(){
    var totalLegend = document.getElementById("totalLegend");
    totalLegend.checked = true;

    setUpLegend();
}




function removeLegend(){
    mymap.removeControl(legend);
}

function setUpLegend(){

    var noLegend = document.getElementById("noLegend");
    var walkLegend = document.getElementById("walkLegend");
    var boatLegend = document.getElementById("boatLegend");
    var totalLegend = document.getElementById("totalLegend");

    console.log(legend instanceof L.Control) 

    if(noLegend.checked){

        //check to see if lengend exists before removing
        if (legend instanceof L.Control) { 

            //remove legend
            removeLegend();

            //remove accessibility overlay layer
            mymap.removeLayer(islesWalkLayer);
            mymap.removeLayer(islesBoatLayer);
            mymap.removeLayer(islesTotalLayer);
        }
    }
    else if(walkLegend.checked){

        //remove existing layers
        mymap.removeLayer(islesBoatLayer);
        mymap.removeLayer(islesTotalLayer);

        //setup legend
        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
                grades = ['walk','boat'],
                labels = ['Waling Accessible','Walking Not Accessible'];

            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColorWalk(grades[i]) + '"></i> ' +
                    labels[i] + '<br>';
            }

            mymap.legend = this;

            return div;
        };

        if (!legend instanceof L.Control) { 
            removeLegend();
        }

        mymap.addControl(legend);


        // add accessibility overlay layer
        islesWalkLayer.addTo(mymap);
        orderLayers();

    }
    else if(boatLegend.checked){

        //remove existing layers
        mymap.removeLayer(islesWalkLayer);
        mymap.removeLayer(islesTotalLayer);

        //setup legend
        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
                grades = ['boat','walk'],
                labels = ['Boat Accessible','Boat Not Accessible'];

            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColorBoat(grades[i]) + '"></i> ' +
                    labels[i] + '<br>';
            }

            mymap.legend = this;

            return div;
        };

        if (!legend instanceof L.Control) { 
            removeLegend();
        }

        mymap.addControl(legend);


        // add accessibility overlay layer
        islesBoatLayer.addTo(mymap);
        orderLayers();

    }
    else if(totalLegend.checked){

        //remove existing layers
        mymap.removeLayer(islesBoatLayer);
        mymap.removeLayer(islesWalkLayer);

        //setup legend
        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
                grades = ['both','boat', 'walk','none'],
                labels = ['Totally Accessible','Boat Accessible','Walking Accessible', 'Not Accessible'];

            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColorTotal(grades[i]) + '"></i> ' +
                    labels[i] + '<br>';
            }

            mymap.legend = this;

            return div;
        };

        if (!legend instanceof L.Control) { 
            removeLegend();
        }

        mymap.addControl(legend);


        // add accessibility overlay layer
        islesTotalLayer.addTo(mymap);
        orderLayers();

    }
}

/* ------ End Custom Legend Control ----------- */


function addDescription(props){
    var name;
    var district1;
    var district2;
    var ramp;
    var railing;
    var slip;
    var open;
    var tact;
    var priv;

    try {
        var attrs = Object.keys(props);
        var attribute;
        var value;

        for(var i = 0; i<attrs.length; i++){
            attribute = attrs[i];
            value = props[attribute];

            if(i === 0){
                name = value;
            }
            else if(i === 1){
                district1 = value;
            }
            else if(i === 2){
                district2 = value;
            }
            else if(i === 3){
                ramp = value;
            }
            else if(i === 4){
                railing = value;
            }
            else if(i === 5){
                slip = value;
            }
            else if(i === 6){
                open = value;
            }
            else if(i === 7){
                tact = value;
            }
            else if(i === 8){
                priv = value;
            }
        }
    }
    /* --------- Always Goes Here ---------- */
    catch (e) {
        /* -------- Only here to suppress null pointer error ---------- */
    }

    /* --------- determine the images that go into carousel ------------- */
    var carousel = document.getElementById("mapCarousel-inner");

    while (carousel.firstChild) {
        carousel.removeChild(carousel.firstChild);
    }

    if(name === "Ponte Dona"){

        var firstDiv = document.createElement("div");
        firstDiv.classList.add("carousel-item");
        firstDiv.classList.add("active");

        var firstImg = document.createElement("img");
        firstImg.src = "../images/bridges/Ponte_Dona/075.jpg"
        firstImg.width = "100%";
        firstImg.height = "150px";
        firstDiv.appendChild(firstImg);

        var secondDiv = document.createElement("div");
        secondDiv.classList.add("carousel-item");

        var secondImg = document.createElement("img");
        secondImg.src = "../images/bridges/Ponte_Dona/076.jpg"
        secondImg.width = "100%";
        secondImg.height = "150px";
        secondDiv.appendChild(secondImg);

        var thirdDiv = document.createElement("div");
        thirdDiv.classList.add("carousel-item");

        var thirdImg = document.createElement("img");
        thirdImg.src = "../images/bridges/Ponte_Dona/077.jpg"
        thirdImg.width = "100%";
        thirdImg.height = "150px";
        thirdDiv.appendChild(thirdImg);

        carousel.appendChild(firstDiv);
        carousel.appendChild(secondDiv);
        carousel.appendChild(thirdDiv)
    }


    /* --------- if statements determining what info on bridge description -------- */
    var infoDiv = document.getElementById("infoDiv");
    var accomDiv = document.getElementById("accomDiv");
    var cautionDiv = document.getElementById("cautionDiv");

    /* ------ Remove All Children from Div ------ */
    while (infoDiv.firstChild) {
        infoDiv.removeChild(infoDiv.firstChild);
    }
    while (accomDiv.firstChild) {
        accomDiv.removeChild(accomDiv.firstChild);
    }
    while (cautionDiv.firstChild) {
        cautionDiv.removeChild(cautionDiv.firstChild);
    }

    let nameLabel = document.createElement("label");
    nameLabel.textContent = "Name: " + name;
    nameLabel.className = "descBoxItem";
    infoDiv.appendChild(nameLabel);

    let distLabel1 = document.createElement("label");
    distLabel1.textContent = "District: " + district1;
    distLabel1.className = "descBoxItem";
    infoDiv.appendChild(distLabel1);

    if(district2 != "null"){
        let distLabel2 = document.createElement("label");
        distLabel2.textContent = "District: " + district2;
        distLabel2.className = "descBoxItem";
        infoDiv.appendChild(distLabel2);
    }

    if(ramp === "permanent"){
        let rampLabel = document.createElement("label");
        rampLabel.textContent = "Ramp: Permanent";
        rampLabel.className = "descBoxItem";
        accomDiv.appendChild(rampLabel);
    }
    else if(ramp === "temporary"){
        let rampLabel = document.createElement("label");
        rampLabel.textContent = "Ramp: Temporary";
        rampLabel.className = "descBoxItem";
        accomDiv.appendChild(rampLabel);
    }

    if(railing === "one"){
        let railingLabel = document.createElement("label");
        railingLabel.textContent = "Railing: One Side";
        railingLabel.className = "descBoxItem";
        accomDiv.appendChild(railingLabel);
    }
    else if(railing === "both"){
        let railingLabel = document.createElement("label");
        railingLabel.textContent = "Railing: Both Sides";
        railingLabel.className = "descBoxItem";
        accomDiv.appendChild(railingLabel);
    }

    if(slip != "none"){
        let slipLabel = document.createElement("label");
        slipLabel.textContent = "Slip Stair Edging: Installed";
        slipLabel.className = "descBoxItem";
        accomDiv.appendChild(slipLabel);
    }
    else{
        let slipLabelNone = document.createElement("label");
        slipLabelNone.textContent = "Slip Stair Edging: None";
        slipLabelNone.className = "descBoxItem";
        cautionDiv.appendChild(slipLabelNone);
    }

    if(open === "one"){
        let openLabel = document.createElement("label");
        openLabel.textContent = "Canal Opening: One Side";
        openLabel.className = "descBoxItem";
        cautionDiv.appendChild(openLabel);
    }

    else if(open === "both"){
        let openLabel = document.createElement("label");
        openLabel.textContent = "Canal Opening: Both Sides";
        openLabel.className = "descBoxItem";
        cautionDiv.appendChild(openLabel);
    }

    if(open != "none" && tact === "none"){
        let tactopen = document.createElement("label");
        tactopen.textContent = "Tactile Pavement: None";
        tactopen.className = "descBoxItem";
        cautionDiv.appendChild(tactopen);
    }

    if(open != "none" && tact != "none"){
        let tactopen = document.createElement("label");
        tactopen.textContent = "Tactile Pavement: Yes";
        tactopen.className = "descBoxItem";
        accomDiv.appendChild(tactopen);
    }

    if(priv != "no"){
        let privLabel = document.createElement("label");
        privLabel.textContent = "Property: Private";
        privLabel.className = "descBoxItem";
        infoDiv.appendChild(privLabel);
    }
    else{
        let privLabel = document.createElement("label");
        privLabel.textContent = "Property: Public";
        privLabel.className = "descBoxItem";
        infoDiv.appendChild(privLabel);
    }
}



/* ------------------ Filter Display Functions ------------ */

function editContentBridge(){
    var islesFilter = document.getElementById("filterBoxIslands");
    islesFilter.style.height = "0px"; 

}


function editContentIsland(){
    var islesFilter = document.getElementById("filterBoxIslands");
    islesFilter.style.height = "89.6vh"; 
}


/* ------------------- Filter Functions ------------------ */

function filterLayer() {
    mymap.removeLayer(bridgeLayer);

    bridgeLayer = L.geoJson(bridges, {style: style, onEachFeature: onEachFeature,
            filter: function(feature, layer) {

                if(!rampPerFilter || !rampTempFilter || !rampNoneFilter) {
                    if (!rampPerFilter) {
                        if (feature.properties.ramp === "permanent") {
                            return false;
                        }
                    }
                    if (!rampTempFilter) {
                        if (feature.properties.ramp === "temporary") {
                            return false;
                        }
                    }
                    if (!rampNoneFilter) {
                        if (feature.properties.ramp === "none") {
                            return false;
                        }
                    }
                }
                if(!railBothFilter || !railOneFilter || !railNoneFilter) {
                    if (!railBothFilter) {
                        if (feature.properties.railing === "both") {
                            return false;
                        }
                    }
                    if (!railOneFilter) {
                        if (feature.properties.railing === "one") {
                            return false;
                        }
                    }
                    if (!railNoneFilter) {
                        if (feature.properties.railing === "none") {
                            return false;
                        }
                    }
                }
                if(!slipInstallFilter || !slipNoneFilter) {
                    if (!slipInstallFilter) {
                        if (feature.properties.slip_stair === "yes") {
                            return false;
                        }
                    }
                    if (!slipNoneFilter) {
                        if (feature.properties.slip_stair === "none") {
                            return false;
                        }
                    }
                }
                if(!openBothFilter || !openOneFilter || !openNoneFilter) {
                    if (!openBothFilter) {
                        if (feature.properties.opening === "both") {
                            return false;
                        }
                    }
                    if (!openOneFilter) {
                        if (feature.properties.opening === "one") {
                            return false;
                        }
                    }
                    if (!openNoneFilter) {
                        if (feature.properties.opening === "none") {
                            return false;
                        }
                    }
                }
                if(!tactInstallFilter || !tactNoneFilter) {
                    if (!tactInstallFilter) {
                        if (feature.properties.tactile === "yes") {
                            return false;
                        }
                    }
                    if (!tactNoneFilter) {
                        if (feature.properties.tactile === "none") {
                            return false;
                        }
                    }
                }
                if(privFilter || publicFilter) {
                    if (privFilter) {
                        if (feature.properties.private === "yes") {
                            return true;
                        }
                    }
                    if (publicFilter) {
                        if (feature.properties.private === "no") {
                            return true;
                        }
                    }
                }

        }
    });

    bridgeLayer.addTo(mymap);
}

function filterRampPer() {
    if (!rampPerCheck.checked) {
        rampPerCheck.checked = true;

        /* ---- Remove Permanent Ramp Filter ---- */
        rampPerFilter = true;
        filterLayer();
    }
    else {
        rampPerCheck.checked = false;

        /* ---- Permanent Ramp Filter ---- */
        rampPerFilter = false;
        filterLayer();
    }
}

function filterRampTemp() {
    if (!rampTempCheck.checked) {
        rampTempCheck.checked = true;

        /* ---- Remove Temporary Ramp Filter ---- */
        rampTempFilter = true;
        filterLayer();
    }
    else {
        rampTempCheck.checked = false;

        /* ---- Temporary Ramp Filter ---- */
        rampTempFilter = false;
        filterLayer();
    }
}

function filterRampNone() {
    if (!rampNoneCheck.checked) {
        rampNoneCheck.checked = true;

        /* ---- Remove None Ramp Filter ---- */
        rampNoneFilter = true;
        filterLayer();
    }
    else {
        rampNoneCheck.checked = false;

        /* ---- None Ramp Filter ---- */
        rampNoneFilter = false;
        filterLayer();
    }
}

function filterRailBoth() {
    if (!railBothCheck.checked) {
        railBothCheck.checked = true;

        /* ---- Remove Both Rail Filter ---- */
        railBothFilter = true;
        filterLayer();
    }
    else {
        railBothCheck.checked = false;

        /* ---- Both Rail Filter ---- */
        railBothFilter = false;
        filterLayer();
    }
}

function filterRailOne() {
    if (!railOneCheck.checked) {
        railOneCheck.checked = true;

        /* ---- Remove One Rail Filter ---- */
        railOneFilter = true;
        filterLayer();
    }
    else {
        railOneCheck.checked = false;

        /* ---- One Rail Filter ---- */
        railOneFilter = false;
        filterLayer();
    }
}

function filterRailNone() {
    if (!railNoneCheck.checked) {
        railNoneCheck.checked = true;

        /* ---- Remove None Rail Filter ---- */
        railNoneFilter = true;
        filterLayer();
    }
    else {
        railNoneCheck.checked = false;

        /* ---- None Rail Filter ---- */
        railNoneFilter = false;
        filterLayer();
    }
}

function filterSlipInstall() {
    if (!slipInstallCheck.checked) {
        slipInstallCheck.checked = true;

        /* ---- Remove Install Slip Filter ---- */
        slipInstallFilter = true;
        filterLayer();
    }
    else {
        slipInstallCheck.checked = false;

        /* ---- Install Slip Filter ---- */
        slipInstallFilter = false;
        filterLayer();
    }
}

function filterSlipNone() {
    if (!slipNoneCheck.checked) {
        slipNoneCheck.checked = true;

        /* ---- Remove Install Slip Filter ---- */
        slipNoneFilter = true;
        filterLayer();
    }
    else {
        slipNoneCheck.checked = false;

        /* ---- Install Slip Filter ---- */
        slipNoneFilter = false;
        filterLayer();
    }
}

function filterOpenBoth() {
    if (!openBothCheck.checked) {
        openBothCheck.checked = true;

        /* ---- Remove Both Opening Filter ---- */
        openBothFilter = true;
        filterLayer();
    }
    else {
        openBothCheck.checked = false;

        /* ---- Both Opening Filter ---- */
        openBothFilter = false;
        filterLayer();
    }
}

function filterOpenOne() {
    if (!openOneCheck.checked) {
        openOneCheck.checked = true;

        /* ---- Remove One Opening Filter ---- */
        openOneFilter = true;
        filterLayer();
    }
    else {
        openOneCheck.checked = false;

        /* ---- One Opening Filter ---- */
        openOneFilter = false;
        filterLayer();
    }
}

function filterOpenNone() {
    if (!openNoneCheck.checked) {
        openNoneCheck.checked = true;

        /* ---- Remove None Opening Filter ---- */
        openNoneFilter = true;
        filterLayer();
    }
    else {
        openNoneCheck.checked = false;

        /* ---- None Opening Filter ---- */
        openNoneFilter = false;
        filterLayer();
    }
}

function filterTactInstall() {
    if (!tactInstallCheck.checked) {
        tactInstallCheck.checked = true;

        /* ---- Remove Installed Tactile Filter ---- */
        tactInstallFilter = true;
        filterLayer();
    }
    else {
        tactInstallCheck.checked = false;

        /* ---- Installed Tactile Filter ---- */
        tactInstallFilter = false;
        filterLayer();
    }
}

function filterTactNone() {
    if (!tactNoneCheck.checked) {
        tactNoneCheck.checked = true;

        /* ---- Remove None Tactile Filter ---- */
        tactNoneFilter = true;
        filterLayer();
    }
    else {
        tactNoneCheck.checked = false;

        /* ---- None Tactile Filter ---- */
        tactNoneFilter = false;
        filterLayer();
    }
}

function filterPublic() {
    if (!pubCheck.checked) {
        pubCheck.checked = true;

        /* ---- Remove Private Filter ---- */
        publicFilter = true;
        filterLayer();
    }
    else {
        pubCheck.checked = false;

        /*---- Private Filter ---- */
        publicFilter = false;
        filterLayer();
    }
}

function filterPrivate() {
    if (!privCheck.checked) {
        privCheck.checked = true;

        /* ---- Remove Private Filter ---- */
        privFilter = true;
        filterLayer();
    }
    else {
        privCheck.checked = false;

        /*---- Private Filter ---- */
        privFilter = false;
        filterLayer();
    }
}

/* ------------------- End Filter Functions ------------------ */

/* ------------------- Page Traversal Functions -------------- */
function goHome(){
    window.location.href = "/home";
}

/* ------------------- End Page Traversal Functions -------------- */

/* ------------------- Voice Functions -------------- */
function playMapIntro(){

    var welcomeMap = "Welcome to the Map Page! This page consists of an interactive map of Venice. Selecting an element brings up a box providing accessibility information on a selected element on the right had side of the page." +
    "The map is in the center of the page. At the top-center and top-right of the page, there are layer selection tabs. Each layer has their own set of properties that can be used to filter groups of elements." + 
    "Each group can be filtered based on it's properties listed on the left hand side of the page; filtering an element removes it from the map. " + 
    "The menu button at the top-right of the page will take you to the menu page where you can travel to other pages.";
    playSlow(welcomeMap);
}



