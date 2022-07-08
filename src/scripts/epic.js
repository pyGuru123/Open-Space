const imagery = document.querySelector('.imagery');
const datepicker = document.querySelector('.datepick');

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

function getDate(offset=8) {
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
		updateImage(imgsrc);

		setInterval(slideshow, 8000);
	}
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