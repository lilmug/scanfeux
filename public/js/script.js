const startStop = document.querySelector('#startStop')
var timeStart, timeStop, duration, location;
var currentFeu;
var feux = []

var myVar
var d = new Date()
var timestamp = d.getTime()

var map = L.map('map').setView([48.858, 2.336], 13)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);




startStop.addEventListener('click', () => {
    if (startStop.getAttribute('etat') == 'vert') {
        startCounter()
    } else if (startStop.getAttribute('etat') == 'rouge') {
        stopCounter()
    }
})

function startCounter() {
    startStop.style.backgroundColor = '#59a86d'
    startStop.innerHTML = 'Feu vert'
    startStop.setAttribute('etat', 'rouge')

    getLocation()


    timeStart = new Date()
    myVar = setInterval(myTimer, 100)

    console.log('timeStart: ' + timeStart)
    console.log('Start counting...')
}

function stopCounter() {
    startStop.style.backgroundColor = 'rgba(200,0,0,0.7)'
    startStop.innerHTML = 'Feu rouge'
    startStop.setAttribute('etat', 'vert')
    myStopFunction()
    timeStop = new Date()
    //duration = (timeStop.getTime() - timeStart.getTime()) / 1000
    console.log('timeStop: ' + timeStop)
    console.log('Duration: ' + duration + 's')

    console.log('Stop counting...')
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(addPosition)
    } else {
        console.log('Geolocation is not supported by this browser.')
    }
}

function addPosition(position) {
    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
    map.flyTo([position.coords.latitude, position.coords.longitude], 15);
    currentFeu = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    }
}

function myTimer() {
    d = new Date()
    duration = (d.getTime() - timeStart.getTime()) / 1000
    startStop.innerHTML = duration.toFixed(1) + 's'
}

function myStopFunction() {
    var d = new Date()
    currentFeu.timestamp = d.toLocaleDateString() + '|' + d.toLocaleTimeString()
    currentFeu.duration = duration
    feux.push(currentFeu)
    console.log(feux)
    clearInterval(myVar)
}