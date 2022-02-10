const persevrance = document.querySelector('.perseverance');
const curiosity = document.querySelector('.curiosity');
const oppurtunity = document.querySelector('.oppurtunity');
const spirit = document.querySelector('.spirit');

const imagery = document.querySelector('.imagery');
const camOptions = document.querySelector('.cam-options');

// Variables

persevarnce_cam = ['Any Camera', 'EDL_RUCAM', 'EDL_RDCAM', 'EDL_DDCAM', 'EDL_PUCAM1', 'EDL_PUCAM2',
						'NAVCAM_LEFT', 'NAVCAM_RIGHT', 'MCZ_RIGHT', 'MCZ_LEFT', 'FRONT_HAZCAM_LEFT_A',
						'FRONT_HAZCAM_RIGHT_A', 'REAR_HAZCAM_LEFT', 'REAR_HAZCAM_RIGHT',
						'SKYCAM', 'SHERLOC_WATSON']
curiosity_cam = ['Any Camera', 'FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM']
oppurtunity_cam = ['Any Camera', 'FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES']
cam_dict = {'Perseverance':persevarnce_cam, 'Curiosity':self.curiosity_cam,
				 'Opportunity':oppurtunity_cam, 'Spirit':oppurtunity_cam}

window.onload = function() {
	persevrance.click();
}

persevrance.addEventListener('click', getPerseverance);
curiosity.addEventListener('click', getCuriosity);
oppurtunity.addEventListener('click', getOppurtunity);
spirit.addEventListener('click', getSpirit);

function getPerseverance() {
	updateImage('../assets/perseverance.png');
	addRadios(persevarnce_cam);
}

function getCuriosity() {
	updateImage('../assets/curiosity.png');
	addRadios(curiosity_cam);
}

function getOppurtunity() {
	updateImage('../assets/oppurtunity.png');
	addRadios(oppurtunity_cam);
}

function getSpirit() {
	updateImage('../assets/spirit.png');
	addRadios(spirit_cam);
}

function updateImage(src) {
	imagery.src = src;
}

function addRadios(options) {
	camOptions.innerHTML = '';
	for (let option of options) {
		var label = document.createElement('label');
		var radio = document.createElement('input');
		radio.setAttribute('type', 'radio');
		radio.setAttribute('name', 'cam');
		radio.setAttribute('value', option);
		label.appendChild(radio);
		label.appendChild(document.createTextNode(option));
		camOptions.appendChild(label);
	}
}