const persevrance = document.querySelector('.perseverance');
const curiosity = document.querySelector('.curiosity');
const oppurtunity = document.querySelector('.oppurtunity');
const spirit = document.querySelector('.spirit');

const imagery = document.querySelector('.imagery');

window.onload = function() {
	persevrance.click();
}

persevrance.addEventListener('click', function(){updateImage('../assets/perseverance.png')});
curiosity.addEventListener('click', function(){updateImage('../assets/curiosity.png')});
oppurtunity.addEventListener('click', function(){updateImage('../assets/oppurtunity.png')});
spirit.addEventListener('click', function(){updateImage('../assets/spirit.png')});


function updateImage(src) {
	console.log('hello world!');
	imagery.src = src;
}