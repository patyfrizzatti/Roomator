/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function onError(error){
    console.log(error);
}

function geoCallback(position){
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);

    var latitude = position.coords.latitude;
    var long = position.coords.longitude;

//    var textDisplay = "Latitude " + latitude + " Longitude " + long;
//    document.getElementById("pos").innerHTML = textDisplay;
}

// Getting the location from the GPS module
function getLocation(){
    navigator.geolocation.getCurrentPosition(geoCallback, onError);
}

// This is the function in change of doing something
// with the location once we have it
function geoCallback(position){
    console.log(position);

    // Extracting especifically the lat and long
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    // Calling the function in charge of contacting
    // the external API
    openCageApi(lat, long);

    // Calling the function to update the map
    // once we have our current location
    // Passing the coords into the function
    updateMap(lat, long);

    // Printing to front end
//    var textToDisplay = "Latitutd: " + lat + " Longitude: " + long;

}

// Function in charge of contacting the external API
// This function receives two parameters
function openCageApi(lat, long){

    // The variable http is an instance of the class XMLHttpRequest
    // this is a library included in JS that helps with HTTP requests
    var http = new XMLHttpRequest();

    // The end point of the API
    const url = 'https://api.opencagedata.com/geocode/v1/json?q=' +lat+ '+' + long + '&key=22e5695431c543d682e4d4b52ec743ab#';
    // Preparing the request
    http.open("GET", url);
    // Sending the request
    http.send();
    // The we obtain the response, then we can do something with it
    http.onreadystatechange = (e) => {
        // Getting the response in a text format
        var response = http.responseText;
        // converting the response from a text format to a json format
        var responseJSON = JSON.parse(response);

        // printing both results to the console to compare
        console.log(responseJSON);
        console.log(response);

        // extracting one piece of information from the response
        var country = responseJSON.results[0].components.country;
        var city = responseJSON.results[0].components.city;
        var road = responseJSON.results[0].components.road;
        // Putting the piece extracted on the front end
        document.getElementById('pos').innerHTML = country;
        document.getElementById('pos1').innerHTML = city;
        document.getElementById('pos2').innerHTML = road;

    }

}

function login(){
  var http = new XMLHttpRequest();
  const url = 'http://localhost:8080/login';
  http.open("GET", url);
  http.send();
  http.onreadystatechange = (e) => {
      var response = http.responseText;
      var responseJSON = JSON.parse(response);
      console.log(responseJSON);
      console.log(response);
      var login = responseJSON.results[0].components.login;
      var password = responseJSON.results[0].components.password;
}

function register(){
  var http = new XMLHttpRequest();
  const url = 'http://localhost:8080/register';
  http.open("GET", url);
  http.send();
  http.onreadystatechange = (e) => {
      var response = http.responseText;
      var responseJSON = JSON.parse(response);
      console.log(responseJSON);
      console.log(response);
      var login = responseJSON.results[0].components.login;
      var password = responseJSON.results[0].components.password;
}
