const imagery = document.querySelector('.imagery');
const datepicker = document.querySelector('.datepick');
const imgname = document.querySelector('.imgname');
const sundistp = document.querySelector('.sundist');
const lunardistp = document.querySelector('.lunardist');
const epicdistp = document.querySelector('.epicdist');

// variable declarations;

let imgarr = [];
let index = 0;
let apikey = "4dbQbZnGMVLS5g3SEr094513VGLJnqAjuDEMlYx3";

window.onload = function() {
	fetchImageData();
}

todayDate = getDate();
datepicker.value = todayDate;
datepicker.setAttribute('max', todayDate);

datepicker.addEventListener("change", fetchImageData);

function getDate(offset=10) {
	var today = new Date();
	if (offset) {
		newdate = new Date();
		today.setDate(newdate.getDate()-offset);
	}
	var date = String(today.getDate()).padStart(2, '0');
	var month = String(today.getMonth() + 1).padStart(2, '0');
	var year = today.getFullYear();
	return year + '-' + month + '-' + date;
}

function updateImage(src) {
	imagery.src = src;
}

function fetchImageData() {
	todayDate = datepicker.value;
	let endpoint = `https://api.nasa.gov/EPIC/api/enhanced/date/${todayDate}?api_key=${apikey}`;
	console.log(endpoint);

	fetch(endpoint)
	.then (response => response.json())
	.then (data => fetchImages(data, todayDate))
}

function fetchImages(data, date) {
	console.log(data);
	if (data) {
		index = 0
		imgarr = data;
		var imgname = imgarr[index]['image'];
		var dates = date.split("-")
		imgsrc = `https://epic.gsfc.nasa.gov/archive/enhanced/${dates[0]}/${dates[1]}/${dates[2]}/png/${imgname}.png`;
		updateImageName(imgname);
		updateImage(imgsrc);
		updateDistance(imgarr[index])
		
		setInterval(slideshow, 8000);
	}
	else {
		console.log("will do it later.")
	}
}

function updateImageName(name) {
	imgname.innerText = name;
	console.log(name);
}

function updateDistance(coords) {
	var sun_coords = coords['coords']['sun_j2000_position'];
	var sun_x = sun_coords['x'];
	var sun_y = sun_coords['y'];
	var sun_z = sun_coords['z'];
	var sun_dist =  Math.sqrt(Math.pow(sun_x, 2) + Math.pow(sun_y, 2) + Math.pow(sun_z, 2));
	var sun_dist = Math.round(sun_dist);

	var lunar_coords = coords['coords']['lunar_j2000_position'];
	var lunar_x = lunar_coords['x'];
	var lunar_y = lunar_coords['y'];
	var lunar_z = lunar_coords['z'];
	var lunar_dist =  Math.sqrt(Math.pow(lunar_x, 2) + Math.pow(lunar_y, 2) + Math.pow(lunar_z, 2));
	var lunar_dist = Math.round(lunar_dist);

	var epic_coords = coords['coords']['dscovr_j2000_position'];
	var epic_x = epic_coords['x'];
	var epic_y = epic_coords['y'];
	var epic_z = epic_coords['z'];
	var epic_dist =  Math.sqrt(Math.pow(epic_x, 2) + Math.pow(epic_y, 2) + Math.pow(epic_z, 2));
	var epic_dist = Math.round(epic_dist);

	sundistp.innerText = `Earth to Sun distance : ${sun_dist} km`
	lunardistp.innerText = `Earth to Moon distance : ${lunar_dist} km`
	epicdistp.innerText = `Earth to EPIC distance : ${epic_dist} km`
}

function slideshow() {
	index += 1;
	console.log(index);
	if (index >= imgarr.length) {
		index = 0
	}

	var imgname = imgarr[index]['image'];
	var dates = datepicker.value.split("-");
	imgsrc = `https://epic.gsfc.nasa.gov/archive/enhanced/${dates[0]}/${dates[1]}/${dates[2]}/png/${imgname}.png`;
	updateImage(imgsrc);
}


// function ImageList