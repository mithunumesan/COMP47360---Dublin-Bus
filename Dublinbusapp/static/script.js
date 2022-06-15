let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () => {
    loginForm.classList.toggle('active');
    navbar.classList.remove('active');
}
let navbar = document.querySelector('.navbar');
window.onscroll = () => {
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

// A $( document ).ready() block.
$(document).ready(function() {
    $('#weatherBox').hide();
    $('#leapCardBox').hide();
    $('#journeyPlanningBox').show();
});

$('[class^="journeyPlanning"]').on('click', function(e) {
    e.preventDefault();
    $('#weatherBox').hide();
    $('#leapCardBox').hide();
    $('#journeyPlanningBox').show();
});

$('[class^="leapCard"]').on('click', function(e) {
    e.preventDefault();
    $('#weatherBox').hide();
    $('#leapCardBox').show();
    $('#journeyPlanningBox').hide();
});

$('[class^="weather"]').on('click', function(e) {
    e.preventDefault();
    $('#journeyPlanningBox').hide();
    $('#weatherBox').show();
    $('#leapCardBox').hide();
});

var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 53.3463,
            lng: -6.2631
        },
        zoom: 13,
        styles: [{
            featureType: "poi",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }],
        mapTypeControl: false
    });
}

function run() {
    var option = document.getElementById("option").value;
    if (option != "now") {
        document.getElementById("time").innerHTML = '<input type="date" name="" class="date">' + '<input type="time" name="" class="time">';
    } else {
        document.getElementById("time").innerHTML = "";
    }
}