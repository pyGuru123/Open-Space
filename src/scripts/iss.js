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

function getPositionISS() {
	let endpoint = 'http://api.open-notify.org/iss-now.json'
	fetch(endpoint)
	.then(response => response.json())
	.then(data => updateMap(data))
}

function updateMap(data) {
	latitude = data['iss_position']['latitude'];
	longitude = data['iss_position']['longitude'];
	console.log(latitude,longitude, map);
}

function myMap() {
	var mapProp = {
	  center:new google.maps.LatLng(51.508742,-0.120850),
	  zoom:2.5,
	};

	var marker = new google.maps.Marker({
		position : {
			lat: 27.7,
			lng: 85.3
		}
	});
	var map = new google.maps.Map(document.getElementById("mapbox"),mapProp);
	// var latlng
}