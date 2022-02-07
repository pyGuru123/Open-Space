const astrobox = document.querySelector('.astrobox');

function getAstronautsISS() {
	let endpoint = 'http://api.open-notify.org/astros.json'
	fetch(endpoint)
	.then(response => response.json())
	.then(data => updateResult(data));
}



function myMap() {
	getAstronautsISS();
	
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
	}, 5000);
}

function getISSPosition(marker) {
	let endpoint = 'https://api.wheretheiss.at/v1/satellites/25544'
	fetch(endpoint)
	.then(response => response.json())
	.then(data => updateISSPosition(data, marker));
}

function updateISSPosition(data, marker) {
	lat = data['latitude'];
	lon = data['longitude'];
	position = new google.maps.LatLng(lat,lon);
	marker.setPosition(position);

	updateResult(data)
}

function updateResult(data) {
	astrobox.innerText = '';

	var attributes = ['latitude', 'longitude','altitude', 'velocity',
					'visibility'];


	const astronum = document.createElement('h2');
	astronum.innerText = `International Space Station`
	astrobox.appendChild(astronum);

	peoples = data['people'];
	for (const attribute of attributes) {
		value = data[attribute];
		const p = document.createElement('p');
		p.innerText = `${attribute} : ${value}`;
		astrobox.appendChild(p);
	}
}