const persevrance = document.querySelector('.perseverance');
const curiosity = document.querySelector('.curiosity');
const oppurtunity = document.querySelector('.oppurtunity');
const spirit = document.querySelector('.spirit');

const imagery = document.querySelector('.imagery');
const camOptions = document.querySelector('.cam-options');
const datepicker = document.querySelector('.datepick');
const submit = document.querySelector('.submit');
const imgButtons = document.querySelector('.imgButtons');

// Variables

persevarnce_cam = ['Any Camera', 'EDL_RUCAM', 'EDL_RDCAM', 'EDL_DDCAM', 'EDL_PUCAM1', 'EDL_PUCAM2',
						'NAVCAM_LEFT', 'NAVCAM_RIGHT', 'MCZ_RIGHT', 'MCZ_LEFT', 'FRONT_HAZCAM_LEFT_A',
						'FRONT_HAZCAM_RIGHT_A', 'REAR_HAZCAM_LEFT', 'REAR_HAZCAM_RIGHT',
						'SKYCAM', 'SHERLOC_WATSON']
curiosity_cam = ['Any Camera', 'FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM']
oppurtunity_cam = ['Any Camera', 'FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES']
cam_dict = {'Perseverance':persevarnce_cam, 'Curiosity':self.curiosity_cam,
				 'Opportunity':oppurtunity_cam, 'Spirit':oppurtunity_cam}

const api_key = "4dbQbZnGMVLS5g3SEr094513VGLJnqAjuDEMlYx3";

let rover = "persevrance";
let arr = [];

// Date

todayDate = getDate();
datepicker.value = todayDate;
datepicker.setAttribute('max', todayDate);

window.onload = function() {
	persevrance.click();
}

persevrance.addEventListener('click', getPerseverance);
curiosity.addEventListener('click', getCuriosity);
oppurtunity.addEventListener('click', getOppurtunity);
spirit.addEventListener('click', getSpirit);
submit.addEventListener('click', generateURL);

function getPerseverance() {
	updateImage('../assets/perseverance.png');
	addRadios(persevarnce_cam);
	rover = "perseverance";
}

function getCuriosity() {
	updateImage('../assets/curiosity.png');
	addRadios(curiosity_cam);
	rover = "curiosity";
}

function getOppurtunity() {
	updateImage('../assets/oppurtunity.png');
	addRadios(oppurtunity_cam);
	rover = "oppurtunity";
}

function getSpirit() {
	updateImage('../assets/spirit.png');
	addRadios(spirit_cam);
	rover = "spirit";
}

function updateImage(src) {
	imagery.src = src;
}

function addRadios(options) {
	camOptions.innerHTML = '';
	for (let option of options) {
		var label = document.createElement('label');
		var radio = document.createElement('input');
		var div = document.createElement('div');
		radio.setAttribute('type', 'radio');
		radio.setAttribute('name', 'cam');
		radio.setAttribute('class', 'cam');
		radio.setAttribute('value', option);
		if (option == 'Any Camera') {
			radio.checked = true;
		}
		label.appendChild(radio);
		label.appendChild(document.createTextNode(option));
		div.appendChild(label);
		camOptions.appendChild(div);
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

function generateURL() {
	var cameras = document.querySelectorAll('.cam');
	var camera = "";
	for (var i=0; i<cameras.length; i++) {
		if (cameras[i].checked) {
			if (cameras[i].value != "Any Camera") {
				camera = cameras[i].value;
			}
		}
	}

	var date = datepicker.value;
	console.log(date);
	if (camera) {
		url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&camera=${camera}&api_key=${api_key}`;
	}
	else {
			url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&api_key=${api_key}`
	}
	
	fetchRoversImages(url);
}

function fetchRoversImages(endpoint) {
	fetch(endpoint)
	.then (response => response.json())
	.then (data => updateResult(data));
}

function updateResult(data){
	var arr = data['photos'];
	imgButtons.innerHTML = "";
	if (arr.length > 0) {
		var img_src = arr[0]['img_src'];
		updateImage(img_src);

		imgButtons.innerHTML = "";
		for (let i=0; i<arr.length; i++) {
			var btn = document.createElement('button');
			btn.innerHTML = `${i+1}`;
			btn.className = 'imgindex';
			btn.addEventListener('click', function() {
				var img_src = arr[i]['img_src'];
				updateImage(img_src); 
			}, false);
			imgButtons.appendChild(btn);
		}
	}
	else {
		var p = document.createElement("p");
		p.innerText = "No data found for this date";
		p.style.fontSize = "medium";
		imgButtons.appendChild(p);
	}
}