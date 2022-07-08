const imagery = document.querySelector('.imagery');
const datepicker = document.querySelector('.datepick');

// variable declarations;

let imgarr = [];
let apikey = "4dbQbZnGMVLS5g3SEr094513VGLJnqAjuDEMlYx3";

window.onload = function() {
	updateImage("");
	fetchImages();
}

todayDate = getDate();
datepicker.value = todayDate;
datepicker.setAttribute('max', todayDate);

datepicker.addEventListener("change", fetchImages);

function getDate(offset=7) {
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
	imagery.src = "https://epic.gsfc.nasa.gov/archive/enhanced/2022/06/30/png/epic_RGB_20220630011358.png";
}

function fetchImages() {
	todayDate = datepicker.value;
	let endpoint = `https://api.nasa.gov/EPIC/api/natural/date/${todayDate}?api_key=${apikey}`;

	fetch(endpoint)
	.then (response => response.json())
	.then (data => printData(data))
}

function printData(data) {
	console.log(data);
}


// function ImageList