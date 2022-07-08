const imagery = document.querySelector('.imagery');
const datepicker = document.querySelector('.datepick');

function updateImage(src) {
	imagery.src = "https://epic.gsfc.nasa.gov/archive/enhanced/2022/06/30/png/epic_RGB_20220630011358.png";
}

window.onload = function() {
	updateImage("");
}

todayDate = getDate();
datepicker.value = todayDate;
datepicker.setAttribute('max', todayDate);

function getDate(offset=0) {
	var today = new Date();
	if (offset) {
		newdate = new Date();
		today.setDate(newdate.getDate()-1);
	}
	var date = String(today.getDate()).padStart(2, '0');
	var month = String(today.getMonth() + 1).padStart(2, '0');
	var year = today.getFullYear();
	return year + '-' + month + '-' + date;
}