const image = document.querySelector('.image');
const date = document.querySelector('.date');
const title = document.querySelector('.imgtitle');
const imginfo = document.querySelector('.imginfo');
const datepicker = document.querySelector('.datepick');

todayDate = getDate();
datepicker.value = todayDate;
datepicker.setAttribute('max', todayDate);
datepicker.addEventListener('change', ()=> {fetchAPOD(datepicker.value)});

window.onload = fetchAPOD(todayDate);

function fetchAPOD(date) {
	let endpoint = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=NMPSyc5jEBTLMU7kBm7zcQisWeeiDryrGQXZxfSt`;
	fetch(endpoint)
	.then (response => response.json())
	.then (data => updateResult(data));
}

function updateResult(data) {
	if (data.hasOwnProperty('code')) {
		fetchAPOD(getDate(1));
	}
	else {
		date.innerText = data['date'];
		title.innerText = data['title'];
		imginfo.innerText = data['explanation'];
		image.src = data['url'];
	}
}

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