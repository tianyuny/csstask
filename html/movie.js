window.onload = getMyLocation;
function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else {
        alert("Oops, no geolocation support");
    }
}
function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var div = document.getElementById("location");
    var km = computeDistance(position.coords, ourCoords);
    var distance = document.getElementById("distance");
    div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;
    distance.innerHTML = "You are " + km + " km from the WickedlySmart HQ";
    //showMap(position.coords);
    var map = new AMap.Map('map', {
        zoom: 10,
        center: [longitude, latitude]
    });
}
function displayError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}
function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);
    var Radius = 6371; // radius of the Earth in km
    return Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
    Math.cos(startLatRads) * Math.cos(destLatRads) *
    Math.cos(startLongRads - destLongRads)) * Radius;
}
function degreesToRadians(degrees) {
    return (degrees * Math.PI)/180;
}
/*function showMap(coords) {
    var googleLatAndLong = new AMap.maps.LatLng(coords.latitude, coords.longitude);
    var mapOptions = {
        zoom: 10,
        center: googleLatAndLong,
        mapTypeId: google.maps.MapTypeId,ROADMAP
    };
    var mapDiv = document.gitElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);
}*/
function getTimeFromString(timeString) {
    var theTime = new Date();
    var time = timeString.match(/(\d+)(?::(\d\d))?\s*(p?)/);
    theTime.setHours( parseInt(time[1]) + (time[3] ? 12 : 0));
    theTime.setMinutes( parseInt(time[1]) || 0);
    return theTime.getTime();
}
function Dog(name, breed, weight) {
    this.name = name;
    this.breed = breed;
    this.weight = weight;
    this.bark = function() {
        if (this.weight > 25) {
            alert(this.name + " says Woof!");
        } else {
            alert(this.name + " says Yip!");
        }
    };
}
function Movie(title, genre, rating, showtimes) {
    this.title = title;
    this.genre = genre;
    this.rating = rating;
    this.showtimes = showtimes;
    this.getNextShowing = function() {
        var now = new Date().getTime();
        for (var i = 0; i < this.showtimes.length; i++) {
            var showtime = getTimeFromString(this.showtimes[i]);
            if ((showtime - now) > 0) {
                return "Next showing of " + this.title + " is " + this.showtimes[i];
            }
        }
    };
}
var ourCoords = {
    latitude: 47.624851,
    longitude: 122.52099
};
//var map = new AMap.Map('map');
/*var movie1 = new Movie("Forbidden Planet", "Classic Sci-fi", 5, ["5:00pm", "22:00"]);
var movie2 = new Movie("Forbidden Planet",
                         "Classic Sci-fi",
    5,
    ["3:00pm", "5:00pm", "22:00"]);
var fido = new Dog("Fido", "Mixed", 38);
var nextShowing = movie1.getNextShowing();
alert(nextShowing);
nextShowing = movie2.getNextShowing();
alert (nextShowing);
fido.bark();
alert(document.URL);
*/