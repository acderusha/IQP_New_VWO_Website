console.log("map loaded");

/* --------------- Global Layer Vars ------------ */
var bridgeLayer;
var islesLayer;
var boatLayer;


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
function isleStyle(feature) {
    return {
        fillColor: getColor(feature.properties.Access_Han),
        weight: 1,
        opacity: 2,
        color: 'gray',
        fillOpacity: 0.5
    };
}

function getColor(d) {
    return d > 'yes' ? '#0000ff' :
           d > 'no'  ? '#993333' :
                      '#336699';
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

function onEachFeatureBoat(feature, layer) {
    layer.on({
        mouseover: highlightFeatureBoat,
        mouseout: resetHighlightBoat,
        dblclick: zoomToFeature
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

    /* ------ Custom Legend Control ----------- */

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = ['no','yes'],
            labels = ['Accessible','Not Accessible'];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i]) + '"></i> ' +
                labels[i] + '<br>';
        }

        return div;
    };

    legend.addTo(mymap);

    /* ------ End Custom Legend Control ----------- */
}

/* ------------------------  End Map Element Functions -------------------------- */

/* -------------- GET Layer Data Functions ----------------- */
function getLayers() {
    getIsles();
    getBridges();
    getBoatStops();

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
    islesLayer = L.geoJson(isles, {style: isleStyle, onEachFeature: onEachFeatureIsland});
    islesLayer.addTo(mymap);
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

    /*var filterContainer = document.getElementById("filterContainer");

    var rampFilterBox = document.createElement("div");
    rampFilterBox.classList.add("filterCaptionBox");

    var rampCaption = document.createElement("h3");
    rampCaption.innerHTML = "Ramps";
    rampCaption.classList.add("caption");
    rampFilterBox.appendChild(rampCaption);

    var checkContianer1 = document.createElement("div");
    checkContianer1.classList.add("filterBoxItem");
    checkContianer1.id = "perm"
    rampCaption.appendChild(checkContianer1);

    var check1 = document.createElement("input");
    check1.type = "checkbox";
    check1.classList.add("filterCheck");
    check1.id = "rampPerCheck";
    check1.checked = true;
    checkContianer1.appendChild(check1);

    var checkLabel1 = document.createElement("p");
    checkLabel1.innerHTML = "Permanent";
    checkLabel1.classList.add("filterBoxItem");
    checkContianer1.appendChild(checkLabel1);

    var checkContianer2 = document.createElement("div");
    checkContianer2.classList.add("filterBoxItem");
    checkContianer2.id = "temp"
    rampCaption.appendChild(checkContianer2);

    var check2 = document.createElement("input");
    check2.type = "checkbox";
    check2.classList.add("filterCheck");
    check2.id = "rampTempCheck";
    check2.checked = true;
    checkContianer2.appendChild(check2);

    var checkLabel2 = document.createElement("p");
    checkLabel2.innerHTML = "Temporary";
    checkLabel2.classList.add("filterBoxItem");
    checkContianer2.appendChild(checkLabel2);

    var checkContianer3 = document.createElement("div");
    checkContianer3.classList.add("filterBoxItem");
    checkContianer3.id = "ramp_none"
    rampCaption.appendChild(checkContianer3);

    var check3 = document.createElement("input");
    check3.type = "checkbox";
    check3.classList.add("filterCheck");
    check3.id = "rampNoneCheck";
    check3.checked = true;
    checkContianer3.appendChild(check3);

    var checkLabel3 = document.createElement("p");
    checkLabel3.innerHTML = "None";
    checkLabel3.classList.add("filterBoxItem");
    checkContianer3.appendChild(checkLabel3);

    

    var railFilterBox = document.createElement("div");
    railFilterBox.classList.add("filterCaptionBox");

    var railCaption = document.createElement("h3");
    railCaption.innerHTML = "Railing";
    railCaption.classList.add("caption");
    railFilterBox.appendChild(railCaption);

    var checkContianer4 = document.createElement("div");
    checkContianer4.classList.add("filterBoxItem");
    checkContianer4.id = "both"
    railCaption.appendChild(checkContianer4);

    var check4 = document.createElement("input");
    check4.type = "checkbox";
    check4.classList.add("filterCheck");
    check4.id = "railBothCheck";
    check4.checked = true;
    checkContianer4.appendChild(check4);

    var checkLabel4 = document.createElement("p");
    checkLabel4.innerHTML = "Both Sides";
    checkLabel4.classList.add("filterBoxItem");
    checkContianer4.appendChild(checkLabel4);

    var checkContianer5 = document.createElement("div");
    checkContianer5.classList.add("filterBoxItem");
    checkContianer5.id = "one"
    railCaption.appendChild(checkContianer5);

    var check5 = document.createElement("input");
    check5.type = "checkbox";
    check5.classList.add("filterCheck");
    check5.id = "railOneCheck";
    check5.checked = true;
    checkContianer5.appendChild(check5);

    var checkLabel5 = document.createElement("p");
    checkLabel5.innerHTML = "One Side";
    checkLabel5.classList.add("filterBoxItem");
    checkContianer5.appendChild(checkLabel5);

    var checkContianer6 = document.createElement("div");
    checkContianer6.classList.add("filterBoxItem");
    checkContianer6.id = "rail_none"
    railCaption.appendChild(checkContianer6);

    var check6 = document.createElement("input");
    check6.type = "checkbox";
    check6.classList.add("filterCheck");
    check6.id = "railNoneCheck";
    check6.checked = true;
    checkContianer6.appendChild(check6);

    var checkLabel6 = document.createElement("p");
    checkLabel6.innerHTML = "None";
    checkLabel6.classList.add("filterBoxItem");
    checkContianer6.appendChild(checkLabel6);



    var slipFilterBox = document.createElement("div");
    slipFilterBox.classList.add("filterCaptionBox");

    var slipCaption = document.createElement("h3");
    slipCaption.innerHTML = "Railing";
    slipCaption.classList.add("caption");
    slipFilterBox.appendChild(slipCaption);

    var checkContianer7 = document.createElement("div");
    checkContianer7.classList.add("filterBoxItem");
    checkContianer7.id = "installSlip"
    slipCaption.appendChild(checkContianer7);

    var check7 = document.createElement("input");
    check7.type = "checkbox";
    check7.classList.add("filterCheck");
    check7.id = "slipInstallCheck";
    check7.checked = true;
    checkContianer7.appendChild(check7);

    var checkLabel7 = document.createElement("p");
    checkLabel7.innerHTML = "Edging";
    checkLabel7.classList.add("filterBoxItem");
    checkContianer7.appendChild(checkLabel7);

    var checkContianer8 = document.createElement("div");
    checkContianer8.classList.add("filterBoxItem");
    checkContianer8.id = "noneSlip"
    slipCaption.appendChild(checkContianer8);

    var check8 = document.createElement("input");
    check8.type = "checkbox";
    check8.classList.add("filterCheck");
    check8.id = "slipNoneCheck";
    check8.checked = true;
    checkContianer8.appendChild(check8);

    var checkLabel8 = document.createElement("p");
    checkLabel8.innerHTML = "No Edging";
    checkLabel8.classList.add("filterBoxItem");
    checkContianer8.appendChild(checkLabel8);




    var openFilterBox = document.createElement("div");
    openFilterBox.classList.add("filterCaptionBox");

    var openCaption = document.createElement("h3");
    openCaption.innerHTML = "Canal Opening";
    openCaption.classList.add("caption");
    openFilterBox.appendChild(openCaption);

    var checkContianer9 = document.createElement("div");
    checkContianer9.classList.add("filterBoxItem");
    checkContianer9.id = "openBoth"
    openCaption.appendChild(checkContianer9);

    var check9 = document.createElement("input");
    check9.type = "checkbox";
    check9.classList.add("filterCheck");
    check9.id = "openBothCheck";
    check9.checked = true;
    checkContianer9.appendChild(check9);

    var checkLabel9 = document.createElement("p");
    checkLabel9.innerHTML = "Both Sides";
    checkLabel9.classList.add("filterBoxItem");
    checkContianer9.appendChild(checkLabel9);

    var checkContianer10 = document.createElement("div");
    checkContianer10.classList.add("filterBoxItem");
    checkContianer10.id = "openOne"
    openCaption.appendChild(checkContianer10);

    var check10 = document.createElement("input");
    check10.type = "checkbox";
    check10.classList.add("filterCheck");
    check10.id = "openOneCheck";
    check10.checked = true;
    checkContianer10.appendChild(check10);

    var checkLabel10 = document.createElement("p");
    checkLabel10.innerHTML = "One Side";
    checkLabel10.classList.add("filterBoxItem");
    checkContianer10.appendChild(checkLabel10);

    var checkContianer11 = document.createElement("div");
    checkContianer11.classList.add("filterBoxItem");
    checkContianer11.id = "openNone"
    openCaption.appendChild(checkContianer11);

    var check11 = document.createElement("input");
    check11.type = "checkbox";
    check11.classList.add("filterCheck");
    check11.id = "openNoneCheck";
    check11.checked = true;
    checkContianer11.appendChild(check11);

    var checkLabel11 = document.createElement("p");
    checkLabel11.innerHTML = "None";
    checkLabel11.classList.add("filterBoxItem");
    checkContianer11.appendChild(checkLabel11);



    var tactFilterBox = document.createElement("div");
    tactFilterBox.classList.add("filterCaptionBox");

    var tactCaption = document.createElement("h3");
    tactCaption.innerHTML = "Tactile Pavement";
    tactCaption.classList.add("caption");
    tactFilterBox.appendChild(tactCaption);

    var checkContianer12 = document.createElement("div");
    checkContianer12.classList.add("filterBoxItem");
    checkContianer12.id = "installTact"
    tactCaption.appendChild(checkContianer12);

    var check12 = document.createElement("input");
    check12.type = "checkbox";
    check12.classList.add("filterCheck");
    check12.id = "tactInstallCheck";
    check12.checked = true;
    checkContianer12.appendChild(check12);

    var checkLabel12 = document.createElement("p");
    checkLabel12.innerHTML = "Tactile";
    checkLabel12.classList.add("filterBoxItem");
    checkContianer12.appendChild(checkLabel12);

    var checkContianer13 = document.createElement("div");
    checkContianer13.classList.add("filterBoxItem");
    checkContianer13.id = "noneTact"
    tactCaption.appendChild(checkContianer13);

    var check13 = document.createElement("input");
    check13.type = "checkbox";
    check13.classList.add("filterCheck");
    check13.id = "tactNoneCheck";
    check13.checked = true;
    checkContianer13.appendChild(check13);

    var checkLabel13 = document.createElement("p");
    checkLabel13.innerHTML = "No Tactile";
    checkLabel13.classList.add("filterBoxItem");
    checkContianer13.appendChild(checkLabel13);




    var propFilterBox = document.createElement("div");
    propFilterBox.classList.add("filterCaptionBox");

    var propCaption = document.createElement("h3");
    propCaption.innerHTML = "Property";
    propCaption.classList.add("caption");
    propFilterBox.appendChild(propCaption);

    var checkContianer14 = document.createElement("div");
    checkContianer14.classList.add("filterBoxItem");
    checkContianer14.id = "pub"
    propCaption.appendChild(checkContianer14);

    var check14 = document.createElement("input");
    check14.type = "checkbox";
    check14.classList.add("filterCheck");
    check14.id = "pubCheck";
    check14.checked = true;
    checkContianer14.appendChild(check14);

    var checkLabel14 = document.createElement("p");
    checkLabel14.innerHTML = "Public";
    checkLabel14.classList.add("filterBoxItem");
    checkContianer14.appendChild(checkLabel14);

    var checkContianer15 = document.createElement("div");
    checkContianer15.classList.add("filterBoxItem");
    checkContianer15.id = "priv"
    propCaption.appendChild(checkContianer15);

    var check15 = document.createElement("input");
    check15.type = "checkbox";
    check15.classList.add("filterCheck");
    check15.id = "privCheck";
    check15.checked = true;
    checkContianer15.appendChild(check15);

    var checkLabel15 = document.createElement("p");
    checkLabel15.innerHTML = "Private";
    checkLabel15.classList.add("filterBoxItem");
    checkContianer15.appendChild(checkLabel15);


    filterContainer.appendChild(rampFilterBox);
    filterContainer.appendChild(railFilterBox);
    filterContainer.appendChild(slipFilterBox);
    filterContainer.appendChild(openFilterBox);
    filterContainer.appendChild(tactFilterBox);
    filterContainer.appendChild(propFilterBox);

    var br1 = document.createElement("br");
    var br2 = document.createElement("br");
    var br3 = document.createElement("br");
    var br4 = document.createElement("br");
    var br5 = document.createElement("br");
    var br6 = document.createElement("br");
    filterContainer.appendChild(br1);
    filterContainer.appendChild(br2);
    filterContainer.appendChild(br3);
    filterContainer.appendChild(br4);
    filterContainer.appendChild(br5);
    filterContainer.appendChild(br6);*/
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



