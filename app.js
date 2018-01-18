const gBack = document.querySelector('.green-back');
const gBlur = document.querySelector('.green-blur');
const rBack = document.querySelector('.red-back');
const rBlur = document.querySelector('.red-blur');
const yBack = document.querySelector('.yellow-back');
const yBlur = document.querySelector('.yellow-blur');

const bBack = document.querySelector('.blue-back');
const bBlur = document.querySelector('.blue-blur');

const gBtn = document.querySelector('.green');
const rBtn = document.querySelector('.red');
const yBtn = document.querySelector('.yellow');
const bBtn = document.querySelector('.blue');
const btns = document.querySelectorAll('.btn');

const displayText = document.querySelector('.display-text');
displayText.textContent = '00';
gBtn.addEventListener('mousedown', liteG);

function liteG(){
	gBack.style.fill = 'hsl(97, 98%, 65%)';
	gBlur.setAttribute('fill-opacity','1');
}

gBtn.addEventListener('mouseup', deLiteG);

function deLiteG(){
	gBack.style.fill = '';
	gBlur.setAttribute('fill-opacity','0');
}

rBtn.addEventListener('mousedown', liteR);

function liteR(){
	rBack.style.fill = 'hsla(2, 96%, 57%, 0.88)';
	rBlur.setAttribute('fill-opacity','1');
}

rBtn.addEventListener('mouseup', deLiteR);

function deLiteR(){
	rBack.style.fill = '';
	rBlur.setAttribute('fill-opacity','0');
}

yBtn.addEventListener('mousedown', liteY);

function liteY(){
	yBack.style.fill = 'hsl(60, 98%, 60%)';
	yBlur.setAttribute('fill-opacity','1');
}

yBtn.addEventListener('mouseup', deLiteY);

function deLiteY(){
	yBack.style.fill = '';
	yBlur.setAttribute('fill-opacity','0');
}


bBtn.addEventListener('mousedown', liteB);

function liteB(){
	bBack.style.fill = 'hsl(209, 100%, 50%)';
	bBlur.setAttribute('fill-opacity','1');
}

bBtn.addEventListener('mouseup', deLiteB);

function deLiteB(){
	bBack.style.fill = '';
	bBlur.setAttribute('fill-opacity','0');
}


const startBtn = document.querySelector('.start');
startBtn.addEventListener('click', startGame);

function getColor(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
	//The maximum is exclusive and the minimum is inclusive
}

let turn = 0;
let memoryArray = [];
let currentColor;
let index;

function startGame(){
	startBtn.style.transform ='translateX(-1000%)';
	displayText.textContent = `${turn<10?'0'+turn:turn}`;
	currentColor = getColor(1,5);
	memoryArray.push(currentColor);
	for (let i=0; i<memoryArray.length; i++){
		(function(ind){
			setTimeout(function(){
				switch(memoryArray[i]){
				case 1:
					rBtn.style.opacity='0';
					document.getElementById('audio1').load();
					document.getElementById('audio1').play();
					liteR();
					setTimeout(function(){
						deLiteR();
						rBtn.style.opacity='';
					}, 300);
					break;
				case 2:
					document.getElementById('audio2').load();
					document.getElementById('audio2').play();
					gBtn.style.opacity='0';
					liteG();
					setTimeout(function(){
						deLiteG();
						gBtn.style.opacity='';
					}, 300);
					break;
				case 3:
					document.getElementById('audio3').load();
					document.getElementById('audio3').play();
					bBtn.style.opacity='0';
					liteB();
					setTimeout(function(){
						deLiteB();
						bBtn.style.opacity='';
					}, 300);
					break;
				case 4:
					document.getElementById('audio4').load();
					document.getElementById('audio4').play();
					yBtn.style.opacity='0';
					liteY();
					setTimeout(function(){
						deLiteY();
						yBtn.style.opacity='';
					}, 300);
					break;
				}
			}, 400 + (500*ind));
		})(i);

	}

	let currentIndex;

	function setBtns(){
		btns.forEach(button=>{
			button.removeEventListener('click', checkAnswer);
		});
		currentIndex = memoryArray[index];
		if(currentIndex === undefined){
			turn++;
			startGame();
		}else{
			btns.forEach(button=>{
				button.addEventListener('click', checkAnswer);
			});
		}
	}

	// reset index
	index=0;
	setBtns();

	function checkAnswer(){
		if(this.classList.contains(`_${currentIndex}`)){
			document.getElementById(`audio${currentIndex}`).load();
			document.getElementById(`audio${currentIndex}`).play();
			index++;
			setBtns();
		} else{
			let flash = setInterval(function(){
				setTimeout(function(){
					displayText.textContent = '';
				},100);
				displayText.textContent = 'XX';
			},200);

			setTimeout(function(){
				clearInterval(flash);
				setTimeout(function(){
					if(turn===0){
						displayText.textContent ='00';
					}else{
						displayText.textContent = `${turn<10?'0'+turn:turn}`;
					}
				}, 100);
			}, 1000);
		}
	}
}
