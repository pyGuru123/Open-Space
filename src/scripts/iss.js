const astrobox = document.querySelector('.astrobox');

window.onload = function() {
	getAstronautsISS();
}

function getAstronautsISS() {
	let endpoint = 'http://api.open-notify.org/astros.json'
	fetch(endpoint)
	.then(response => response.json())
	.then(data => updateResult(data));
}

function updateResult(data) {
	number = data['number'];
	const astronum = document.createElement('h2');
	astronum.innerText = `There are total of ${number} peoples on ISS`
	astrobox.appendChild(astronum);

	peoples = data['people'];
	for (let i=0; i<peoples.length; i++) {
		name = peoples[i]['name'];
		const p = document.createElement('p');
		p.innerText = `${name}`;
		astrobox.appendChild(p);
	}
}

function myMap() {
	var mapProp = {
	  center:new google.maps.LatLng(25.31, 50.97),
	  zoom:1.5,
	};

	var map = new google.maps.Map(document.getElementById("mapbox"),mapProp);

	var marker = new google.maps.Marker({
		position : {
			lat: 27.7,
			lng: 85.3
		},
		icon: '../assets/iss.png',
		map: map
	});

	getISSPosition(marker);

	setInterval(function() {
		getISSPosition(marker);
		}, 20000);
}

function getISSPosition(marker) {
	let endpoint = 'http://api.open-notify.org/iss-now.json'
	fetch(endpoint)
	.then(response => response.json())
	.then(data => updateISSPosition(data, marker));
}

function updateISSPosition(data, marker) {
	pos = data['iss_position'];
	lat = pos['latitude'];
	lon = pos['longitude'];
	position = new google.maps.LatLng(lat,lon);
	marker.setPosition(position);
}