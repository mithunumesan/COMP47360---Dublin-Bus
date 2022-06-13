let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () => {
    loginForm.classList.toggle('active');
    navbar.classList.remove('active');
}

window.onscroll = () => {
        loginForm.classList.remove('active');
        navbar.classList.remove('active');
    }
    // document.getElementById("journeyPlanningBox").default = true;
    // document.getElementById("weatherBox").default = false;
    // document.getElementById("leapCardBox").default = false;
    // let journeyPlanningBox = document.querySelector('.journeyPlanningBox');
    // journeyPlanningBox.classList.toggle('active');
    // section.classlist.remove('active');

$('[class^="journeyPlanning"]').on('click', function(e) {
    e.preventDefault();
    $('#journeyPlanningBox').show();
    $('#weatherBox').hide();
    $('#leapCardBox').hide();
});

$('[class^="leapCard"]').on('click', function(e) {
    e.preventDefault();
    $('#journeyPlanningBox').hide();
    $('#weatherBox').hide();
    $('#leapCardBox').show();
});

$('[class^="weather"]').on('click', function(e) {
    e.preventDefault();
    $('#journeyPlanningBox').hide();
    $('#weatherBox').show();
    $('#leapCardBox').hide();
});